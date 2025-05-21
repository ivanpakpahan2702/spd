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

@documents_pegawai_blueprint.route('/view_task_history', methods=['GET', 'POST'])
@login_required
def view_task_history():
    if current_user.role != "pegawai":
        return abort(404)
    if request.method == 'GET':
        session['csrf_token'] = secrets.token_hex(16)
    return render_template('documents_pegawai.html', current_user=current_user, csrf_token=session['csrf_token'], page_title='Features')
    

@documents_pegawai_blueprint.route('/get_all_history_task', methods=['GET', 'POST'])
@login_required
def get_all_history_task():
    if current_user.role != "pegawai":
        return abort(404)
    validate_ajax_csrf()
    
    # sql = f"SELECT * FROM schedule_task ORDER BY created_at DESC;"
    sql = f"SELECT schedule_task_token,filename FROM task WHERE user_id = {current_user.id} ORDER BY created_at DESC;"
    try:
        with get_db() as db:
            schedule_task = db.execute(sql).fetchall()
        db.commit()
    except Exception as e:
        print(e)
    data = []
    for row in schedule_task:
        data.append({
            'token': row[0],
            'filename': row[1],
        })
    return jsonify({'data': data})

@documents_pegawai_blueprint.route('/upload_document/<token>', methods=['GET', 'POST'])
@login_required
def upload_document(token):
    row = None
    if request.method == 'GET':
        if current_user.role != 'pegawai':
            return abort(404)
        session['csrf_token'] = secrets.token_hex(16)
        sql = f"SELECT * FROM schedule_task WHERE token ='{token}'"
        
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
        if files_name.filename == '':
            flash('Must input the files!', 'error')
            return redirect(url_for('documents_pegawai.upload_document',  token=token, _external=True))
        sql = f"SELECT status,filename FROM task WHERE schedule_task_token = '{token}'"
        with get_db() as db:
            try:
                new_data = db.execute(sql).fetchone()
                db.commit()
            except Exception as e:
                print(e)
            try:
                if new_data['status'] == "waiting" and new_data['filename'] != '' :
                    flash('You already upload documents, wait for verifying','error')
                    return redirect(url_for('documents_pegawai.upload_document',  token=token, _external=True))
                elif new_data['status'] == "rejected" and new_data['filename'] != '' :
                    filename = get_random_filename(files_name.filename)
                    filename = files.save(files_name, name=filename)
                    sql = f"UPDATE task set filename = {filename} WHERE schedule_task_token = {token} AND user_id = {current_user.id}"
                    with get_db() as db:
                        try:
                            new_data = db.execute(sql).fetchone()
                            db.commit()
                        except Exception as e:
                            print(e)
                    flash('succes to update file','success')
                    return redirect(url_for('documents_pegawai.upload_document',  token=token, _external=True))
            except Exception as e:
                print(e)   
        try:
            filename = get_random_filename(files_name.filename)
            filename = files.save(files_name, name=filename)
            sql = f"INSERT INTO task (schedule_task_token, user_id, filename, status) VALUES ('{token}', '{current_user.id}', '{filename}', 'waiting')"
            with get_db() as db:
                try:
                    new_data = db.execute(sql).fetchone()
                    db.commit()
                except Exception as e:
                    print(e)
        except Exception as e:
            print(e)
            
        sql = f"SELECT * FROM schedule_task WHERE token ='{token}'"
        
        with get_db() as db:
            try:
                row = db.execute(sql).fetchone()
                db.commit()
            except Exception as e:
                print(e)
        try:
            row['token']
            if datetime.strptime(row['due_date'], "%Y-%m-%d %H:%M") < datetime.strptime(now, "%Y-%m-%d %H:%M"):
                flash('Task expired!','error')
                return redirect(url_for('views.dashboard'))
        except Exception as e:
            print(e)
            return abort(404)
        flash('succes to upload','success')
        return redirect(url_for('documents_pegawai.upload_document',  token=token, _external=True))
    return render_template('form_upload_documents.html', data=row, current_user=current_user, page_title='Features', csrf_token = session['csrf_token'])

@documents_pegawai_blueprint.route('/get_one_task/<token>', methods=['GET'])
@login_required
def get_one_task(token):
    try:
        sql = f"SELECT status, filename from task WHERE schedule_task_token='{token}' AND user_id = '{current_user.id}'"
        with get_db() as db:
            cursor = db.execute(sql)
            db.commit()
            row = cursor.fetchone()
            if row:
                return jsonify({
                    "status": "success",
                    "task": {
                        "status": row[0],
                        "filename": row[1]
                    }
                })
            else:
                return jsonify({"status": "error", "message": "Task not found"})
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "message": str(e)})

@documents_pegawai_blueprint.route('/get_all_task', methods=['GET', 'POST'])
@login_required
def get_all_task():
    if current_user.role != "pegawai":
        return abort(404)
    validate_ajax_csrf()
    
    sql = f"SELECT * FROM schedule_task ORDER BY created_at DESC;"
    try:
        with get_db() as db:
            schedule_task = db.execute(sql).fetchall()
        db.commit()
    except Exception as e:
        print(e)
    data = []
    for row in schedule_task:
        data.append({
            'name': row[1],
            'description': row[2],
            'created_at': row[3],
            'due_date': row[4],
            'token': row[5],
        })
    return jsonify({'data': data})


