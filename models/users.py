from flask_login import UserMixin

class User(UserMixin):
    def __init__(self,user_dict):
        self.id = user_dict['id']
        self.username = user_dict['username']
        self.password_hash = user_dict['password_hash']
        self.name = user_dict['name']
        self.phone_number = user_dict['phone_number']
        self.email = user_dict['email']
        self.biography = user_dict['biography']
        self.role = user_dict['role']
        self.profile_pict = user_dict['profile_pict']
        self.reset_token = user_dict['reset_token']
        self.reset_token_time = user_dict['reset_token_time']
        self.updated_at = user_dict['updated_at']