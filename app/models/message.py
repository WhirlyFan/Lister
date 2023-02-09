from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Message(db.Model):
    __tablename__ = "messages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    channels = db.relationship("Channel", back_populates="messages")
    users = db.relationship("User", back_populates="messages")

    def to_dict(self):
        return {
            'id': self.id,
            'user': self.users.to_dict_base(),
            'channel_id': self.channel_id,
            'message': self.message,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            }
