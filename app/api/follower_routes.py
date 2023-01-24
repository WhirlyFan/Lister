from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User
from .auth_routes import validation_errors_to_error_messages, authorized

follower_routes = Blueprint("followers", __name__)


@follower_routes.route("/<int:id>")
def followers(id):
    """
    Queries for a user and return who they follow and their followers.
    """
    user = User.query.get(id)
    if not user:
        return {'error': ['User Not Found']}, 404
    return {
        "Follows": [user.to_dict() for user in user.followed_users()],
        "Followers": [user.to_dict() for user in user.follower_users()]
    }


@follower_routes.route("/follow/<int:id>", methods=["POST"])
@login_required
def follow(id):
    """
    Uses the currently logged in user and follows/unfollows a user queried by id.
    """

    user = User.query.get(current_user.get_id())
    other_user = User.query.get(id)
    if user == other_user:
        return {'error': ['You cannot follow yourself!']}, 404
    if not other_user:
        return {'error': ['User Not Found']}, 404

    if not user.is_following(other_user):
        user.follow(other_user)
    else:
        user.unfollow(other_user)
    db.session.commit()
    status = 'followed' if user.is_following(other_user) else 'unfollowed'
    return {'message': f'{user.username} {status} {other_user.username}'}
