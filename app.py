from flask import Blueprint, Flask, render_template, redirect, url_for
from flask_login import LoginManager, current_user
from controllers.helpers.database import get_db, init_db
from models.users import User
from extension import mail
from controllers.views import views_blueprint
from controllers.auth import auth_blueprint
from controllers.settings_profile import settings_profile_blueprint, avatars
from controllers.documents_admin import documents_admin_blueprint
from controllers.documents_pegawai import documents_pegawai_blueprint, files
from config import Config
from flask_uploads import configure_uploads

# Flask App Initialization
app = Flask(__name__, template_folder='templates', static_folder='static')
app.config.from_object(Config)

@app.template_filter('format_datetime')
def format_datetime(value, format='%Y-%m-%d %H:%M'):
    return value.strftime(format)

# Register the filter
app.jinja_env.filters['format_datetime'] = format_datetime


# Register Blueprints
app.register_blueprint(auth_blueprint)
app.register_blueprint(views_blueprint)
app.register_blueprint(settings_profile_blueprint)
app.register_blueprint(documents_admin_blueprint)
app.register_blueprint(documents_pegawai_blueprint)

# Configure Uploads & Mail
configure_uploads(app, [avatars, files])
mail.init_app(app)

# Database Initialization
init_db()

# Flask-Login Setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth.login'

# User Loader Callback
@login_manager.user_loader
def load_user(user_id):
    with get_db() as db:
        user = db.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
        return User({key: user[key] for key in user.keys()}) if user else None

# Custom Template Filters
@app.template_filter('truncate_word')
def truncate_word(s, length=10):
    return s[:length] + '...' if len(s) > length else s

# Main Routes
@app.route('/')
def index():
    return redirect(url_for('views.dashboard'))

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# Run Flask App
if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)