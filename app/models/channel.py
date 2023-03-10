from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


channel_members = db.Table(
    'channel_members',
    db.Model.metadata,
    db.Column('channel_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('channels.id')), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True)
)

if environment == "production":
    channel_members.schema = SCHEMA


class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')
    ), nullable=False)
    name = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship("User", secondary="channel_members", back_populates="channels")
    messages = db.relationship("Message", cascade="all, delete-orphan", back_populates="channels")

    def to_dict_messages(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'users': [user.to_dict_base() for user in self.users],
            'messages': [messages.to_dict() for messages in self.messages],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'users': [user.to_dict_base() for user in self.users],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
