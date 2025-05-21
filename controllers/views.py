from flask import Blueprint,render_template,request, session,flash,url_for,redirect,current_app
from flask_login import login_required, current_user
from controllers.helpers.database import *
from controllers.helpers.password import *
from controllers.log_activity import *
import secrets


views_blueprint = Blueprint('views', __name__)

@views_blueprint.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    if request.method == 'GET':
        session['csrf_token'] = secrets.token_hex(16)
    return render_template('index.html', current_user=current_user, page_title='Dashboard', csrf_token = session['csrf_token'])

@views_blueprint.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    if request.method == 'GET':
        session['csrf_token'] = secrets.token_hex(16)
    activities_log = get_activity()
    return render_template('profile.html', current_user=current_user, activities_log=activities_log)

@views_blueprint.route('/settings', methods=['GET', 'POST'])
@login_required
def settings():
    if request.method == 'GET':
        session['csrf_token'] = secrets.token_hex(16)
    return render_template('profile_settings.html', current_user=current_user, csrf_token=session['csrf_token'])