from flask_login import UserMixin, login_required, login_user, logout_user, current_user
from flask_mail import Mail, Message
from datetime import timedelta, datetime
from functools import wraps
from controllers.helpers.database import *
from controllers.helpers.password import *
from flask import render_template, url_for, redirect, request, flash, Blueprint, session
from extension import mail
import secrets
from models.users import User

auth_blueprint = Blueprint('auth', __name__)

def anonymous_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if current_user.is_authenticated:
            return redirect(url_for('views.dashboard'))
        return f(*args, **kwargs)
    return decorated_function

@auth_blueprint.route('/register', methods=['GET', 'POST'])
@anonymous_required
def register():
    if request.method == 'GET':
        session['csrf_token'] = secrets.token_hex(16)
    if request.method == 'POST':
        if request.form.get('csrf_token') != session.get('csrf_token'):
            flash('Invalid Token!', 'error')
            return redirect(url_for('auth.register'))
        name = request.form['name'].strip()
        password = request.form['password']
        email = request.form['email'].strip()
        if not email or not password:
            flash('email and password required.', 'error')
            return redirect(url_for('auth.register'))
        password_hash = hash_password(password)
        try:
            with get_db() as db:
                db.execute('INSERT INTO users (name, password_hash, email, role) VALUES (?, ?, ?, ?)',
                           (name, password_hash, email, "pegawai"))
                db.commit()
            flash('Hello '+name+', Registration successful. please log in', 'success')
            return redirect(url_for('auth.login'))
        except sqlite3.IntegrityError:
            flash('email already exists.', 'error')
            return redirect(url_for('auth.register'))
    return render_template('register.html', csrf_token=session['csrf_token'])

@auth_blueprint.route('/login', methods=['GET', 'POST'])
@anonymous_required
def login():
    if request.method == 'GET':
        session['csrf_token'] = secrets.token_hex(16)
    if request.method == 'POST':
        if request.form.get('csrf_token') != session.get('csrf_token'):
            flash('Invalid Token!', 'error')
            return redirect(url_for('auth.login'))
        email = request.form['email'].strip()
        password = request.form['password']
        remember = 'remember-me' in request.form
        with get_db() as db:
            user = db.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
            if user and verify_password(user['password_hash'], password):
                row_as_dict = {key: user[key] for key in user.keys()}
                user_obj = User(row_as_dict)
                login_user(user_obj, remember=remember)
                flash('Log in Succesfully', 'success')
                return redirect(url_for('views.dashboard'))
            else:
                flash('Invalid email or password.', 'error')
    return render_template('login.html', csrf_token=session['csrf_token'])

@auth_blueprint.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out.', 'info')
    return redirect(url_for('auth.login'))

@auth_blueprint.route('/forgot', methods=['GET', 'POST'])
@anonymous_required
def forgot_password():
    if request.method == 'POST':
        email = request.form['email'].strip()
        with get_db() as db:
            user = db.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
            if user:
                token = hashlib.sha256((str(user['id']) + 'secret').encode()).hexdigest()
                now = datetime.now()
                db.execute('UPDATE users SET reset_token = ?, reset_token_time = ? WHERE id = ?', (token, now, user['id']))
                db.commit()
                reset_link = url_for('auth.reset_password', user_id=user['id'], token=token, _external=True)
                try:
                    msg = Message('Reset Password', sender='ivan.spd.com@gmail.com', recipients=[email])
                    msg.html = render_template('email_template.html',reset_link=reset_link,current_user=current_user)
                    mail.send(msg)
                    flash('Password reset link has been sent to the email address', 'success')
                except Exception as e:
                    flash('Failed to send an email', 'danger')
            else:
                flash('Email not found.', 'error')
    return render_template('forgot.html')

@auth_blueprint.route('/reset/<int:user_id>/<token>', methods=['GET', 'POST'])
@anonymous_required
def reset_password(user_id, token):            
    with get_db() as db:
        user = db.execute('SELECT * FROM users WHERE id = ? AND reset_token = ?', (user_id, token)).fetchone()
        if not user:
            flash('Invalid token.', 'error')
            return redirect(url_for('auth.forgot_password'))
        
        token_time = datetime.strptime(user['reset_token_time'], '%Y-%m-%d %H:%M:%S.%f')
        now = datetime.now()
        diff = now - token_time
        if diff > timedelta(seconds=3600):
            flash('Expired token.', 'error')
            return redirect(url_for('auth.forgot_password'))
        
        if request.method == 'POST':
            new_password = request.form['password']
            new_hash = hash_password(new_password)
            db.execute('UPDATE users SET password_hash = ?, reset_token = NULL WHERE id = ?', (new_hash, user_id))
            db.commit()
            flash('Password reset successful. Please login.')
            return redirect(url_for('auth.login'))

    return render_template('reset.html', user_id=user_id, token=token)