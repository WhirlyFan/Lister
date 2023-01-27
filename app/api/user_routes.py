from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, List, Anime

user_routes = Blueprint('users', __name__)


@user_routes.route('')
def users():
    """
    Query for users based on search parameters and returns them in a list of user dictionaries or returns all users if no search parameters are provided
    """
    search_term = request.args.get('q')
    limit = request.args.get('limit')
    if search_term is None:
        query = User.query.with_entities(User.id, User.username, User.about_me)
    else:
        query = User.query.filter(User.username.contains(search_term)).with_entities(
            User.id, User.username, User.about_me)
    if limit is not None:
        query = query.limit(int(limit))
    users = query.all()
    return {'users': [{'id': user.id, 'username': user.username, 'about_me': user.about_me} for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    user = user.to_dict()
    if current_user.is_anonymous or id != current_user.id:
        user.pop('email')
        # user.pop('created_at')
        # user.pop('updated_at')
    return user
