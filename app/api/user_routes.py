from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, List

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    user = user.to_dict()
    if current_user.is_anonymous or id != current_user.id:
        user.pop('email')
        user.pop('created_at')
        user.pop('updated_at')
    return user
