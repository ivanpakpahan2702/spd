# config.py

import os
from datetime import timedelta

class Config:
    SECRET_KEY = '27022000'
    REMEMBER_COOKIE_DURATION = timedelta(days=7)

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'ivan.spd.com@gmail.com'
    MAIL_PASSWORD = 'gujyyyiqpflzfiuc'

    UPLOADED_AVATARS_DEST = 'static/uploads/avatars'
   