from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Message, Channel
from .auth_routes import validation_errors_to_error_messages, authorized
# from app.forms import CreateReview, UpdateReview


channel_routes = Blueprint('channels', __name__)

@channel_routes.route("/<int:id>", methods=["GET"])
def channel(id):
    channel = Channel.query.get(id)
    if not channel:
        return {"errors": ["Channel not found"]}, 404
    return {'channel': [channel.to_dict()]}
