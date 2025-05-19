from flask import Blueprint,render_template,request, session,flash,url_for,redirect,current_app,abort,jsonify
from flask_login import login_required, current_user
from controllers.helpers.database import *
from controllers.helpers.password import *
from flask_uploads import UploadSet, IMAGES, ALL
import os
import uuid
from controllers.log_activity import new_activity

documents_admin_blueprint = Blueprint('documents_admin', __name__)

@documents_admin_blueprint.route('/documents_admin', methods=['GET', 'POST'])
@login_required
def document_admins():
    if current_user.role != "admin":
        return abort(404)
    return render_template('documents_admin.html', current_user=current_user, csrf_token=session['csrf_token'], page_title='Features')

@documents_admin_blueprint.route('/get_scheduled_task', methods=['GET', 'POST'])
@login_required
def get_scheduled_task():
    if current_user.role != "admin":
        return abort(404)
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
            'token': row[5]
        })
    return jsonify({'data': data})
