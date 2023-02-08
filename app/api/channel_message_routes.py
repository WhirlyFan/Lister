from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Channel, Message
from .auth_routes import validation_errors_to_error_messages, authorized
from app.forms import CreateChannel, UpdateChannel, CreateMessage, UpdateMessage


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
    return channel.to_dict_messages()


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
    Adds/Removes a user to/from a channel if current_user owns channel
    """
    current = User.query.get(current_user.id)
    user = User.query.get(user_id)
    if not user:
        return {"errors": ["User not found"]}, 404
    channel = Channel.query.get(id)
    if not channel:
        return {"errors": ["Channel not found"]}, 404
    if current != channel.users[0]:
        return {"errors": ["Unauthorized"]}, 401
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
    if not user:
        return {"errors": ["User not found"]}, 404
    form = CreateChannel()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel(
            name = form.data['name'],
            owner_id = user.id
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


@channel_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_channel(id):
    """
    Delete a channel by id
    """
    user = User.query.get(current_user.id)
    channel = Channel.query.get(id)
    if not channel:
        return {"errors": ["Channel not found"]}, 404
    if len(channel.users) <= 2 and user in channel.users:
        db.session.delete(channel)
        db.session.commit()
        return {"message": "Successfully deleted channel"}
    if user.id != channel.owner_id:
        return {"errors": ["Unauthorized"]}, 401
    db.session.delete(channel)
    db.session.commit()
    return {"message": "Successfully deleted channel"}

# @channel_routes.route("/<int:id>/owner/<int:user_id>", methods=["PUT"])
# @login_required
# def transfer_ownership(id, user_id):
#     """
#     Transfers channel ownership to user_id passed into function
#     """
#     user = User.query.get(current_user.id)
#     new_owner = User.query.get(user_id)
#     if not new_owner:
#         return {"errors":  ["User not found"]}, 404
#     channel = Channel.query.get(id)
#     if not channel:
#         return {"errors":  ["Channel not found"]}, 404
#     if user.id != channel.owner_id or user not in channel.users:
#         return {"errors": ["Unauthorized"]}, 401
#     channel.owner_id = new_owner.id
#     db.session.add(channel)
#     db.session.commit()
#     return {"message": f"Successfully transferred ownership of channel {channel.id} to {new_owner.username}"}

@channel_routes.route("/<int:id>/messages", methods=["POST"])
@login_required
def create_message(id):
    """
    Create a new message at a channel id
    """
    user = User.query.get(current_user.id)
    if not user:
        return {"errors": ["User not found"]}, 404
    channel = Channel.query.get(id)
    if not channel:
        return {"errors": ["Channel not found"]}, 404
    if user not in channel.users:
        return {"errors": ["Unauthorized"]}, 401
    form = CreateMessage()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Message(
            user_id = current_user.id,
            channel_id = id,
            message = form.data["message"]
        )
        db.session.add(message)
        db.session.commit()

        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@channel_routes.route("/<int:id>/messages/<int:message_id>", methods=["PUT"])
@login_required
def edit_message(id, message_id):
    """
    Updates a message
    """
    message = Message.query.get(message_id)
    if not message:
        return {"message": ["Message not found"]}, 404
    channel = Channel.query.get(id)
    if not channel:
        return {"errors": ["Channel not found"]}, 404
    user = User.query.get(current_user.id)
    if not user:
        return {"errors": ["User not found"]}, 404
    if user not in channel.users:
        return {"errors": ["Unauthorized"]}, 401
    if message not in channel.messages:
        return {"errors": ["Message not in channel"]}, 401
    form = UpdateMessage()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message.message = form.data['message']
        db.session.add(message)
        db.session.commit()
        return message.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@channel_routes.route("/messages/<int:id>", methods=["DELETE"])
@login_required
def delete_message(id):
    """
    Delete a message by id
    """
    user = User.query.get(current_user.id)
    message = Message.query.get(id)
    if not message:
        return {"errors": ["Message not found"]}, 404
    if user.id != message.user_id:
        return {"errors": ["Unauthorized"]}, 401
    db.session.delete(message)
    db.session.commit()
    return {"message": "Successfully deleted message"}
