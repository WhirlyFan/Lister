from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Message, Channel
from .auth_routes import validation_errors_to_error_messages, authorized
# from app.forms import CreateReview, UpdateReview


channel_routes = Blueprint('channels', __name__)

@channel_routes.route("/<int:id>", methods=["GET"])
def channel(id):
    """
    Queries for a channel by id and returns that channel in this form "{'channel': [channel.to_dict()]}"
    """
    channel = Channel.query.get(id)
    if not channel:
        return {"errors": ["Channel not found"]}, 404
    return {'channel': [channel.to_dict()]}


@channel_routes.route("/user/<int:id>", methods=["GET"])
def user_channels(id):
    """
    Queries for a channel by user id and returns those channels in a list nested in a dictionary of "channels"
    """
    user = User.query.get(id)
    if not user:
        return {"errors": ["User not found"]}, 404
    channels = user.channels
    return {"channels": [channel.to_dict() for channel in channels]}
    # channels = Channel.query.filter(Channel.id == user.id)
    # return {"channels": [channel.to_dict() for channel in channels]}


@channel_routes.route("/<int:id>/user/<int:user_id>", methods=["POST"])
def user_in_channel(id, user_id):
    """
    Adds/Removes a user to/from a channel
    """
    user = User.query.get(user_id)
    if not user:
        return {"errors": ["User not found"]}, 404
    channel = Channel.query.get(id)
    if not channel:
        return {"errors": ["Channel not found"]}, 404
    if channel in user.channels:
        user.channels.remove(channel)
        db.session.commit()
        return {"message": f"Removed {user.username} from channel {channel.id}"}
    user.channels.append(channel)
    db.session.commit()
    return {"message": f"Added {user.username} to channel {channel.id}"}

# @channel_routes.route("", methods=["POST"])
# def create_channel():
#     """
#     Creates a channel for the current user.
#     """
