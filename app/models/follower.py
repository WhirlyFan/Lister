from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User


class Follower(db.Model):
    __tablename__ = 'followers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    follower_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)

    users = db.relationship("User", back_populates="followers")
    followers = db.relationship("User", back_populates="users")


def to_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'follower_id': self.follower_id
    }
