from flask import Blueprint,render_template,request, session,flash,url_for,redirect,current_app
from flask_login import login_required, current_user
from controllers.helpers.database import *
from controllers.helpers.password import *
from flask_uploads import UploadSet, IMAGES, ALL
import os
import uuid

avatars = UploadSet('avatars', IMAGES)

settings_profile_blueprint = Blueprint('settings_profile', __name__)

def get_random_filename(original_filename):
    # Extract the file extension
    _, ext = os.path.splitext(original_filename)
    # Generate a UUID string
    random_name = f"{uuid.uuid4().hex}{ext}"
    return random_name

@settings_profile_blueprint.route('/update_public_info', methods=['GET', 'POST'])
@login_required
def update_public_info():
    update_fields = []
    params = []
    if request.method == 'POST':
        if request.form.get('csrf_token') != session.get('csrf_token'):
            flash('Invalid Token!', 'error')
            return redirect(url_for('views.settings'))
        
        username = request.form.get('username')
        biography = request.form.get('biography')
        profile_pict = request.files.get('avatar')
            
        fields = {
            'username': username,
            'biography': biography
        }
        
        for field, value in fields.items():
            update_fields.append(f"{field} = ?")
            params.append(value)
        
        if profile_pict:
            profile_pict.seek(0, 2)
            size = profile_pict.tell()
            profile_pict.seek(0)
            if size > 5 * 1024 * 1024:
                flash('Max file size is 5MB', 'error')
                return redirect(url_for('views.settings'))
            try:
                filename = avatars.save(profile_pict)
                update_fields.append('profile_pict = ?')
                params.append(filename)
                if current_user.profile_pict:
                    old_avatar = 'static/uploads/avatars/'+current_user.profile_pict
                    os.remove(old_avatar)
            except Exception as e:
                flash('failed to upload profile pict', 'error')
                return redirect(url_for('views.settings'))
        
        if update_fields:
            user_id = current_user.id
            sql = f"UPDATE users SET {', '.join(update_fields)} WHERE id = ?"
            params.append(user_id)
            try:
                with get_db() as db:
                    db.execute(sql,params)
                db.commit()
                flash('Successfully updated your public info.', 'success')
            except Exception as e:
                flash('Failed to update your public info.'+str(e), 'error')
                return redirect(url_for('views.settings'))
        else:
            flash('No changes to update.', 'info')
    return redirect(url_for('views.settings'))

@settings_profile_blueprint.route('/update_private_info', methods=['GET', 'POST'])
@login_required
def update_private_info():
    update_fields = []
    params = []
    if request.method == 'POST':
        if request.form.get('csrf_token') != session.get('csrf_token'):
            flash('Invalid Token!', 'error')
            return redirect(url_for('views.settings'))
        
        name = request.form.get('name')
        phone_number = request.form.get('phone_number')
         
        fields = {
            'name': name,
            'phone_number': phone_number
        }
        
        for field, value in fields.items():
            update_fields.append(f"{field} = ?")
            params.append(value)
        
        if update_fields:
            user_id = current_user.id
            sql = f"UPDATE users SET {', '.join(update_fields)} WHERE id = ?"
            params.append(user_id)
            try:
                with get_db() as db:
                    db.execute(sql,params)
                db.commit()
                flash('Successfully updated your private info.', 'success')
            except Exception as e:
                flash('Failed to update your private info.'+str(e), 'error')
                return redirect(url_for('views.settings'))
        else:
            flash('No changes to update.', 'info')
    return redirect(url_for('views.settings'))