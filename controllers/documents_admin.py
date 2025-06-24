from flask import (
    Blueprint, render_template, request, session, flash, url_for, redirect,
    current_app, abort, jsonify
)
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

documents_admin_blueprint = Blueprint('documents_admin', __name__)


@documents_admin_blueprint.route('/documents_admin', methods=['GET', 'POST'])
@login_required
def document_admins():
    if current_user.role != "admin":
        return abort(404)
    if request.method == 'GET':
        session['csrf_token'] = secrets.token_hex(16)
    return render_template(
        'documents_admin.html',
        current_user=current_user,
        csrf_token=session['csrf_token'],
        page_title='Features'
    )


@documents_admin_blueprint.route('/get_scheduled_task', methods=['GET', 'POST'])
@login_required
def get_scheduled_task():
    if current_user.role != "admin":
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
            'token': row[5]
        }
        for row in schedule_task
    ]

    return jsonify({'data': data})


@documents_admin_blueprint.route('/create_scheduled_task', methods=['GET', 'POST'])
@login_required
def create_scheduled_task():
    json_data = request.get_json()
    validate_ajax_csrf()

    name = json_data['name']
    description = json_data['description']
    created_at = json_data['created_at']
    due_date = json_data['due_date']
    send_schedule_notif = json_data['notif_variable']

    token = str(uuid.uuid4()).replace('-', '')[:7]

    sql = (
        "INSERT INTO schedule_task (name, description, created_at, due_date, token) "
        f"VALUES ('{name}', '{description}', '{created_at}', '{due_date}', '{token}')"
    )
    print(sql)
    try:
        with get_db() as db:
            db.execute(sql)
            db.commit()
        new_activity("created new task")
    except Exception as e:
        print(e)

    if send_schedule_notif:
        get_all_user_email_sql = "SELECT email FROM users WHERE role='pegawai'"
        try:
            with get_db() as db:
                users_email = db.execute(get_all_user_email_sql).fetchall()
                db.commit()
        except Exception as e:
            print(e)
            users_email = []

        email_list = [i[0] for i in users_email]
        print(email_list)

        task_link = url_for('documents_pegawai.upload_document', token=token, _external=True)
        msg = Message('New Task', sender='ivan.spd.com@gmail.com', recipients=email_list)
        msg.html = render_template('email_new_task_template.html', task_link=task_link, name=name)
        mail.send(msg)

    return jsonify({'status': 'success'})


@documents_admin_blueprint.route('/get_task/<token>', methods=['GET'])
@login_required
def get_task(token):
    try:
        with get_db() as db:
            cursor = db.execute(
                "SELECT * FROM schedule_task WHERE token = ?",
                (token,)
            )
            row = cursor.fetchone()
            new_activity("updated task")
        if row:
            return jsonify({
                "status": "success",
                "task": {
                    "name": row[1],
                    "description": row[2],
                    "created_at": row[3],
                    "due_date": row[4],
                    "token": row[5]
                }
            })
        else:
            return jsonify({"status": "error", "message": "Task not found"})
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "message": str(e)})


@documents_admin_blueprint.route('/edit_scheduled_task/<token>', methods=['GET', 'POST'])
@login_required
def edit_scheduled_task(token):
    json_data = request.get_json()
    validate_ajax_csrf()

    name = json_data['name']
    description = json_data['description']
    created_at = json_data['created_at']
    due_date = json_data['due_date']
    send_schedule_notif = json_data['notif_variable']

    sql = (
        "UPDATE schedule_task SET "
        f"name='{name}', description='{description}', "
        f"created_at='{created_at}', due_date='{due_date}' "
        f"WHERE token='{token}'"
    )
    print(sql)
    try:
        with get_db() as db:
            db.execute(sql)
            db.commit()
        new_activity("deleted task")
    except Exception as e:
        print(e)

    if send_schedule_notif:
        get_all_user_email_sql = "SELECT email FROM users WHERE role='pegawai'"
        try:
            with get_db() as db:
                users_email = db.execute(get_all_user_email_sql).fetchall()
                db.commit()
        except Exception as e:
            print(e)
            users_email = []

        email_list = [i[0] for i in users_email]
        print(email_list)

        task_link = url_for('documents_pegawai.upload_document', token=token, _external=True)
        msg = Message('New Task', sender='ivan.spd.com@gmail.com', recipients=email_list)
        msg.html = render_template('email_new_task_template.html', task_link=task_link, name=name)
        mail.send(msg)

    return jsonify({"status": "success"})


@documents_admin_blueprint.route('/delete_schedule_task/<token>', methods=['POST'])
@login_required
def delete_schedule_task(token):
    validate_ajax_csrf()
    try:
        sql = f"DELETE FROM schedule_task WHERE token = '{token}'"
        print(sql)
        with get_db() as db:
            db.execute(sql)
            db.commit()
        return jsonify({"status": "success"})
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "message": str(e)})


@documents_admin_blueprint.route('/details_schedule_task/<token>', methods=['GET', 'POST'])
@login_required
def details_schedule_task(token):
    if request.method == 'GET':
        session['csrf_token'] = secrets.token_hex(16)
    return render_template(
        'detail_schedule_task.html',
        page_title='Features',
        current_user=current_user,
        csrf_token=session['csrf_token'],
        token=token
    )


@documents_admin_blueprint.route('/get_task_users/<token>', methods=['GET'])
@login_required
def get_task_users(token):
    sql = ("SELECT users.id, users.email, COALESCE(NULLIF(task.filename, ''), 'no file') AS filename, COALESCE(NULLIF(task.status, ''), 'Belum Mengunggah') AS status FROM users LEFT JOIN task ON users.id = task.user_id AND task.schedule_task_token = ? WHERE users.role = 'pegawai';")

    with get_db() as db:
        cursor = db.execute(sql, (token,))
        users = cursor.fetchall()
        db.commit()

    print(users)
    users_list = [dict(user) for user in users]
    return jsonify(users_list)


@documents_admin_blueprint.route('/api/task/<token>/<int:user_id>', methods=['PUT'])
@login_required
def update_task_user(token, user_id):
    data = request.json
    status = data.get('status')
    notif_variable_ = data.get('notif_variable_')

    with get_db() as db:
        is_exists_ = db.execute(
            "SELECT * FROM task WHERE schedule_task_token = ? AND user_id = ?", (token, user_id)
        ).fetchone()

        if is_exists_ is None:
            sql_insert = (
                "INSERT INTO task (schedule_task_token, user_id, status) "
                "VALUES (?, ?, ?);"
            )
            cursor = db.execute(sql_insert, (token, user_id, status))
            db.commit()
            if cursor.rowcount == 0:
                return jsonify({'status': 'error', 'message': 'User not found'}), 404
        else:
            sql_update = (
                "UPDATE task SET status = ? WHERE schedule_task_token = ? AND user_id = ?"
            )
            cursor = db.execute(sql_update, (status, token, user_id))
            db.commit()

    if notif_variable_ == 1:
        get_all_user_email_sql = "SELECT email FROM users WHERE role='pegawai' AND id = ?"
        try:
            with get_db() as db:
                users_email = db.execute(get_all_user_email_sql, (user_id,)).fetchall()
                db.commit()
        except Exception as e:
            print(e)
            users_email = []

        email_list = [i[0] for i in users_email]
        print(email_list)

        task_link = url_for('views.dashboard', _external=True)
        msg = Message('Update Status', sender='ivan.spd.com@gmail.com', recipients=email_list)
        msg.html = render_template('email_update_task_template.html', task_link=task_link)
        mail.send(msg)

    if cursor.rowcount == 0:
        return jsonify({'status': 'error', 'message': 'User not found'}), 404

    return jsonify({'status': 'success'})


@documents_admin_blueprint.route('/master_admin', methods=['GET', 'POST'])
@login_required
def master_admin():
    if request.method == 'GET':
        session['csrf_token'] = secrets.token_hex(16)
    return render_template(
        'master_admin.html',
        current_user=current_user,
        csrf_token=session['csrf_token'],
        page_title='Master Admin'
    )


@documents_admin_blueprint.route('/get_users', methods=['GET'])
@login_required
def get_users():
    with get_db() as db:
        cursor = db.execute('SELECT id, name, email, role FROM users')
        users = cursor.fetchall()
        db.commit()

    print(users)
    users_list = [dict(user) for user in users]
    return jsonify(users_list)


@documents_admin_blueprint.route('/api/users/<int:user_id>', methods=['PUT'])
@login_required
def update_user(user_id):
    data = request.json
    name = data.get('name')
    email = data.get('email')
    role = data.get('role')

    with get_db() as db:
        cursor = db.cursor()
        cursor.execute(
            'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
            (name, email, role, user_id)
        )
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({'status': 'error', 'message': 'User not found'}), 404

    return jsonify({'status': 'success'})


@documents_admin_blueprint.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    with get_db() as db:
        cursor = db.cursor()
        cursor.execute('DELETE FROM users WHERE id = ?', (user_id,))
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({'status': 'error', 'message': 'User not found'}), 404

    return jsonify({'status': 'success'})