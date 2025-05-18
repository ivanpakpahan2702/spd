import sqlite3
import os

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
            db.execute('''
            CREATE TABLE activities (
                    id INTEGER PRIMARY KEY,
                    activity_name TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    user_id INTEGER REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
                    );
                ''')
            db.commit()
