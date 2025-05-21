from flask import Blueprint,render_template,request, session,flash,url_for,redirect,current_app,abort,jsonify
from flask_login import login_required, current_user
from controllers.helpers.database import *
from controllers.helpers.password import *
from controllers.helpers.validate_csrf import validate_ajax_csrf
from flask_uploads import UploadSet, IMAGES, ALL
import uuid
from controllers.log_activity import new_activity
import secrets
from datetime import datetime
from flask_mail import Mail, Message
from extension import mail
from controllers.log_activity import new_activity

files = UploadSet('files', ALL)

documents_pegawai_blueprint = Blueprint('documents_pegawai', __name__)

now = datetime.now()
now = now.strftime("%Y-%m-%d %H:%M")

def get_random_filename(filename):
    ext = os.path.splitext(filename)[1]
    return f"{uuid.uuid4().hex}{ext}"

@documents_pegawai_blueprint.route('/upload_document/<token>', methods=['GET', 'POST'])
@login_required
def upload_document(token):
    row = None
    if request.method == 'GET':
        if current_user.role != 'pegawai':
            return abort(404)
        session['csrf_token'] = secrets.token_hex(16)
        sql = f"SELECT * FROM schedule_task WHERE token ='{token}'"
        print(sql)
        with get_db() as db:
            try:
                row = db.execute(sql).fetchone()
                db.commit()
            except Exception as e:
                print(e)
        try:
            row['token']
            if datetime.strptime(row['due_date'], "%Y-%m-%d %H:%M") < datetime.strptime(now, "%Y-%m-%d %H:%M"):
                return abort(404)
        except Exception as e:
            print(e)
            return abort(404)
    if request.method == 'POST':
        if request.form.get('csrf_token') != session.get('csrf_token'):
            flash('Invalid Token!', 'error')
            return redirect(url_for('views.dashboard'))
        
        files_name = request.files.get('files')
        token = request.form.get('token')
        
        try:
            filename = get_random_filename(files_name.filename)
            filename = files.save(files_name, name=filename)
            sql = f"INSERT INTO task (schedule_task_token, user_id, filename, status) VALUES ('{token}', '{current_user.id}', '{filename}', 'not verified')"
            print(sql)
            with get_db() as db:
                try:
                    new_data = db.execute(sql).fetchone()
                    db.commit()
                except Exception as e:
                    print(e)
        except Exception as e:
            print(e)
        flash('succes to upload','success')
        return redirect(url_for('documents_pegawai.upload_document',  token=token, _external=True))
    return render_template('documents_pegawai.html', data=row, current_user=current_user, page_title='Features', csrf_token = session['csrf_token'])
