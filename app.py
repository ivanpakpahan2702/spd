from flask import Blueprint, Flask, render_template, redirect, url_for, request, flash, session
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from controllers.helpers.database import *
from controllers.helpers.password import *
from models.users import User
from extension import mail
from controllers.views import views_blueprint
from controllers.auth import auth_blueprint
from controllers.settings_profile import settings_profile_blueprint
from flask_uploads import UploadSet, configure_uploads, IMAGES, ALL
from controllers.settings_profile import avatars
from config import Config

app = Flask(__name__, template_folder='templates', static_folder='static')

app.register_blueprint(auth_blueprint)
app.register_blueprint(views_blueprint)
app.register_blueprint(settings_profile_blueprint)

app.config.from_object(Config)
configure_uploads(app, [avatars])

mail.init_app(app)
init_db()

# Setup Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth.login'

# User loader callback
@login_manager.user_loader
def load_user(user_id):
    with get_db() as db:
        user = db.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
        if user:
            user_dict = {key: user[key] for key in user.keys()}
            return User(user_dict)
    return None

# Main Routes
@app.route('/')
def index():
    return redirect(url_for('views.dashboard'))

if __name__ == '__main__':
    init_db()
    app.run(port=5000, debug=True)