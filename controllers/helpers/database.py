import sqlite3
import os
from controllers.helpers.password import *

DATABASE = './database/spd.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    if not os.path.exists(DATABASE):
        with get_db() as db:
            db.execute('''
                CREATE TABLE users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT,
                    password_hash TEXT NOT NULL,
                    name TEXT,
                    phone_number TEXT,
                    email TEXT UNIQUE NOT NULL,
                    biography TEXT,
                    role TEXT NOT NULL,
                    profile_pict TEXT,
                    reset_token TEXT,
                    reset_token_time TIMESTAMP,
                    remember TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP       
                );
                ''')
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Admin','admin_spd@mail.com','{hash_password('123')}','admin')")
            db.commit()
        with get_db() as db:
            db.execute('''
                CREATE TABLE activities (
                    id INTEGER PRIMARY KEY,
                    activity_name TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    user_id INTEGER REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
                    );
                ''')
        with get_db() as db:
            db.execute('''
                CREATE TABLE schedule_task (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name TEXT, 
                    description TEXT, 
                    created_at TIMESTAMP, 
                    due_date TIMESTAMP,
                    token TEXT UNIQUE
                    );
                    ''')
        with get_db() as db:
            db.execute('''
                CREATE TABLE task (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    schedule_task_token TEXT REFERENCES schedule_task (token) ON DELETE NO ACTION ON UPDATE NO ACTION, 
                    user_id INTEGER REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION, 
                    filename TEXT, 
                    status TEXT, 
                    created_at TIMESTAMP);
                    ''')
            db.commit()
