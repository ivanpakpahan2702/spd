from flask import abort,request,session

def validate_ajax_csrf():
    token_in_header = request.headers.get('X-CSRF-Token')
    token_in_session = session.get('csrf_token')
    if not token_in_header or token_in_header != token_in_session:
        abort(403)