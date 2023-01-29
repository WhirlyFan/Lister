from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Message, Channel
from .auth_routes import validation_errors_to_error_messages, authorized
from app.forms import CreateChannel, UpdateChannel


channel_routes = Blueprint('channels', __name__)

@channel_routes.route("/<int:id>", methods=["GET"])
@login_required
def channel(id):
    """
    Queries for a channel by id and returns that channel in this form "{'channel': [channel.to_dict()]}"
    """
    channel = Channel.query.get(id)
    if not channel:
        return {"errors": ["Channel not found"]}, 404
    return {'channel': [channel.to_dict()]}


@channel_routes.route("/user/<int:id>", methods=["GET"])
@login_required
def user_channels(id):
    """
    Queries for a channel by user id and returns those channels in a list nested in a dictionary of "channels"
    """
    # this could get refactored to not return the messages so as to optimize queries when there is a lot of data
    # messages are a key/value pair on the to_dict() method
    user = User.query.get(id)
    if not user:
        return {"errors": ["User not found"]}, 404
    channels = user.channels
    return {"channels": [channel.to_dict() for channel in channels]}
    # channels = Channel.query.filter(Channel.id == user.id)
    # return {"channels": [channel.to_dict() for channel in channels]}


@channel_routes.route("/<int:id>/user/<int:user_id>", methods=["POST"])
@login_required
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


@channel_routes.route("", methods=["POST"])
@login_required
def create_channel():
    """
    Creates a channel for the current user.
    """
    user = User.query.get(current_user.id)
    form = CreateChannel()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel(
            name = form.data['name']
        )
        db.session.add(channel)
        db.session.commit()
        user.channels.append(channel)
        db.session.commit()

        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@channel_routes.route("/<int:id>", methods=["PUT"])
@login_required
def edit_channel(id):
    """
    Creates a channel for the current user.
    """
    channel = Channel.query.get(id)
    if not channel:
        return {"errors": ["Channel not found"]}, 404
    user = User.query.get(current_user.id)
    if not user:
        return {"errors": ["User not found"]}, 404
    if user not in channel.users:
        return {"errors": ["Unauthorized"]}, 401
    form = UpdateChannel()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel.name = form.data['name']
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
