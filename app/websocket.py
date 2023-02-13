from flask_socketio import SocketIO, emit, send, join_room, leave_room
from app.models import db, Message, Channel
import os


# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://lister.whirlyfan.com',
        'https://lister.whirlyfan.com',
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on('join')
def on_join(data):
    username = data['user']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)


@socketio.on('leave')
def on_leave(data):
    username = data['user']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)

# handle chat messages


@socketio.on("chat")
def handle_chat(data):
    message = Message(
        user_id=data['id'],
        channel_id=data["channelId"],
        message=data['message']
    )
    db.session.add(message)
    db.session.commit()

    if data['room']:
        room = data['room']
        emit("chat", data, broadcast=True, to=room)


@socketio.on("edit-message")
def handle_edit_message(data):
    message = Message.query.get(data['id'])
    message.message = data['message']
    db.session.add(message)
    db.session.commit()

    if data['room']:
        room = data['room']
        emit("chat", data, broadcast=True, to=room)


@socketio.on("delete-message")
def handle_delete_message(data):
    message = Message.query.get(data['id'])
    db.session.delete(message)
    db.session.commit()

    if data['room']:
        room = data['room']
        emit("chat", data, broadcast=True, to=room)


@socketio.on("delete-channel")
def handle_delete_channel(data):
    channel = Channel.query.get(data['id'])
    db.session.delete(channel)
    db.session.commit()
    if data['room']:
        room = data['room']
        emit("delete-channel", data, broadcast=True, to=room)


@socketio.on("edit-channel")
def handle_edit_channel(data):
    channel = Channel.query.get(data['id'])
    channel.name = data['name']
    db.session.add(channel)
    db.session.commit()
    if data['room']:
        room = data['room']
        emit("edit-channel", data, broadcast=True, to=room)
