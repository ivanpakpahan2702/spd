from flask import (
    Blueprint, render_template, request, session, flash, url_for, redirect,
    current_app, abort, jsonify
)
from flask_login import login_required, current_user
from controllers.helpers.database import *
from controllers.helpers.password import *
from controllers.helpers.validate_csrf import validate_ajax_csrf
from flask_uploads import UploadSet, ALL
import uuid
from controllers.log_activity import new_activity
import secrets
from datetime import datetime
from extension import mail

files = UploadSet('files', ALL)
now = datetime.now().strftime("%Y-%m-%d %H:%M")

def get_random_filename(filename):
    ext = os.path.splitext(filename)[1]
    return f"{uuid.uuid4().hex}{ext}"

# Blueprint untuk halaman pegawai
documents_pegawai_blueprint = Blueprint('documents_pegawai', __name__)


@documents_pegawai_blueprint.route('/view_task_history', methods=['GET', 'POST'])
@login_required
def view_task_history():
    if current_user.role != "pegawai":
        return abort(404)
    if request.method == 'GET':
        session['csrf_token'] = secrets.token_hex(16)
    return render_template(
        'documents_pegawai.html',
        current_user=current_user,
        csrf_token=session['csrf_token'],
        page_title='Features'
    )


@documents_pegawai_blueprint.route('/get_all_history_task', methods=['GET', 'POST'])
@login_required
def get_all_history_task():
    if current_user.role != "pegawai":
        return abort(404)
    validate_ajax_csrf()

    sql = f"SELECT schedule_task_token, filename FROM task WHERE user_id = {current_user.id} ORDER BY created_at DESC;"
    try:
        with get_db() as db:
            schedule_task = db.execute(sql).fetchall()
            db.commit()
    except Exception as e:
        print(e)
        schedule_task = []

    data = [
        {
            'token': row[0],
            'filename': row[1],
        }
        for row in schedule_task
    ]

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

        # Validasi deadline task
        try:
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
        token_form = request.form.get('token')

        if not files_name or files_name.filename == '':
            flash('Must input the files!', 'error')
            return redirect(url_for('documents_pegawai.upload_document', token=token_form, _external=True))

        # Periksa status tugas
        sql = f"SELECT status, filename FROM task WHERE schedule_task_token = '{token_form}' AND user_id = {current_user.id}"
        with get_db() as db:
            try:
                new_data = db.execute(sql).fetchone()
                db.commit()
            except Exception as e:
                print(e)
                new_data = None

        try:
            if new_data and new_data['status'] == "waiting" and new_data['filename'] is not None:
                flash('You already upload documents, wait for verifying', 'error')
                return redirect(url_for('documents_pegawai.upload_document', token=token_form, _external=True))
            elif new_data and new_data['status'] == "rejected" and (new_data['filename'] is None or new_data['filename'] is not None):
                filename = get_random_filename(files_name.filename)
                filename = files.save(files_name, name=filename)
                sql_update = f"UPDATE task SET filename = '{filename}' WHERE schedule_task_token = '{token_form}' AND user_id = {current_user.id}"
                with get_db() as db:
                    try:
                        db.execute(sql_update)
                        db.commit()
                    except Exception as e:
                        print(e)
                flash('Successfully updated file', 'success')
                return redirect(url_for('documents_pegawai.upload_document', token=token_form, _external=True))
            elif new_data and new_data['status'] == "waiting" and new_data['filename'] is None:
                filename = get_random_filename(files_name.filename)
                filename = files.save(files_name, name=filename)
                sql_update = f"UPDATE task SET filename = '{filename}' WHERE schedule_task_token = '{token_form}' AND user_id = {current_user.id}"
                with get_db() as db:
                    try:
                        db.execute(sql_update)
                        db.commit()
                    except Exception as e:
                        print(e)
                flash('Successfully updated file', 'success')
                return redirect(url_for('documents_pegawai.upload_document', token=token_form, _external=True))
            elif new_data and new_data['status'] == "verified" and (new_data['filename'] is None or new_data['filename'] is not None):
                flash('Your file already got verified', 'success')
                return redirect(url_for('documents_pegawai.upload_document', token=token_form, _external=True))
        except Exception as e:
            print(e)

        # Jika belum ada data, insert baru
        try:
            filename = get_random_filename(files_name.filename)
            filename = files.save(files_name, name=filename)
            sql_insert = f"INSERT INTO task (schedule_task_token, user_id, filename, status) VALUES ('{token}', '{current_user.id}', '{filename}', 'waiting')"
            with get_db() as db:
                try:
                    db.execute(sql_insert)
                    db.commit()
                except Exception as e:
                    print(e)
        except Exception as e:
            print(e)

        # Validasi deadline task
        sql = f"SELECT * FROM schedule_task WHERE token ='{token}'"
        with get_db() as db:
            try:
                row = db.execute(sql).fetchone()
                db.commit()
            except Exception as e:
                print(e)

        try:
            if datetime.strptime(row['due_date'], "%Y-%m-%d %H:%M") < datetime.strptime(now, "%Y-%m-%d %H:%M"):
                flash('Task expired!', 'error')
                return redirect(url_for('views.dashboard'))
        except Exception as e:
            print(e)
            return abort(404)

        flash('Successfully uploaded', 'success')
        return redirect(url_for('documents_pegawai.upload_document', token=token, _external=True))

    return render_template(
        'form_upload_documents.html',
        data=row,
        current_user=current_user,
        page_title='Features',
        csrf_token=session['csrf_token']
    )


@documents_pegawai_blueprint.route('/get_one_task/<token>', methods=['GET'])
@login_required
def get_one_task(token):
    try:
        sql = f"SELECT status, filename FROM task WHERE schedule_task_token='{token}' AND user_id = {current_user.id}"
        with get_db() as db:
            cursor = db.execute(sql)
            row = cursor.fetchone()
            db.commit()
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

    sql = "SELECT * FROM schedule_task ORDER BY created_at DESC;"
    try:
        with get_db() as db:
            schedule_task = db.execute(sql).fetchall()
            db.commit()
    except Exception as e:
        print(e)
        schedule_task = []

    data = [
        {
            'name': row[1],
            'description': row[2],
            'created_at': row[3],
            'due_date': row[4],
            'token': row[5],
        }
        for row in schedule_task
    ]

    return jsonify({'data': data})