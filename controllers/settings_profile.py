from flask import Blueprint,render_template,request, session,flash,url_for,redirect,current_app
from flask_login import login_required, current_user
from controllers.helpers.database import *
from controllers.helpers.password import *
from flask_uploads import UploadSet, IMAGES, ALL
import os
import uuid
from controllers.log_activity import new_activity

avatars = UploadSet('avatars', IMAGES)

settings_profile_blueprint = Blueprint('settings_profile', __name__)

def get_random_filename(filename):
    ext = os.path.splitext(filename)[1]
    return f"{uuid.uuid4().hex}{ext}"

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
        
        if(username != current_user.username):
            new_activity("updated username")
        if(biography != current_user.biography):
            new_activity("updated biography")
        
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
                filename = get_random_filename(profile_pict.filename)
                filename = avatars.save(profile_pict, name=filename)
                new_activity("updated avatar")
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
         
        if(name != current_user.name):
            new_activity("updated name")
        if(phone_number != current_user.phone_number):
            new_activity("updated phone number")     
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

@settings_profile_blueprint.route('/update_password', methods=['GET', 'POST'])
@login_required
def update_password():
    if request.method == 'POST':
        if request.form.get('csrf_token') != session.get('csrf_token'):
            flash('Invalid Token!', 'error')
            return redirect(url_for('views.settings'))
        
        current_password = request.form['current_password']
        new_password = request.form['new_password']
        verify_field_password = request.form['verify_password']
        
        if current_password and new_password and verify_field_password:
            if not (verify_password(current_user.password_hash, current_password)):
                flash('Current password is incorrect.', 'error')
                return redirect(url_for('views.settings'))
            
            if new_password != verify_field_password:
                flash('New passwords do not match.', 'error')
                return redirect(url_for('views.settings'))
        
            new_password = hash_password(new_password)
            sql = "UPDATE users SET password_hash = '"+str(new_password)+"' WHERE id = "+str(current_user.id)
            try:
                with get_db() as db:
                    db.execute(sql)
                db.commit()
                flash('Successfully updated your password.', 'success')
            except Exception as e:
                flash('Failed to update your password.'+str(e), 'error')
                return redirect(url_for('views.settings'))
        else:
            flash('All field must be filled.', 'error')
    return redirect(url_for('views.settings'))