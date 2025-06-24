from flask import Blueprint,render_template,request, session,flash,url_for,redirect,current_app
from flask_login import login_required, current_user
from controllers.helpers.database import *
from controllers.helpers.password import *
from datetime import datetime

def new_activity(activity_name):
    now = datetime.now()
    now = now.strftime("%d-%m-%Y %H:%M:%S")
    sql = f"INSERT INTO activities (activity_name, user_id, created_at) VALUES ('{activity_name}', {current_user.id}, '{now}')"
    print(sql)
    try:
        with get_db() as db:
            db.execute(sql)
        db.commit()
    except Exception as e:
        print(e)
    pass

def get_activity():
    processed_row = []
    sql = f"SELECT * FROM activities WHERE user_id = {current_user.id} ORDER BY created_at DESC;"
    try:
        with get_db() as db:
            activity = db.execute(sql).fetchall()
        db.commit()
    except Exception as e:
        print(e)  
    for i in activity:
        dt = datetime.strptime(i[2], "%d-%m-%Y %H:%M:%S")
        new_row = i[0],i[1],dt.strftime("%d-%m-%Y %H:%M:%S"),i[3]
        processed_row.append(new_row)
    return processed_row