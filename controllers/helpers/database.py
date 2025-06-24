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
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','ivanpakpahanchrst@gmail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','ivanime027@gmail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd2@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd3@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd4@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd5@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd6@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd7@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd8@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd9@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd10@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd11@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd12@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd13@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd14@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd15@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd16@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd17@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd18@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd19@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd20@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd21@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd22@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd23@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd24@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd25@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd26@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd27@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd28@mail.com','{hash_password('123')}','pegawai')")
            db.commit()
        with get_db() as db:
            db.execute(f"INSERT INTO users (name,email,password_hash,role) VALUES ('Pegawai','admin_spd29@mail.com','{hash_password('123')}','pegawai')")
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
