from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .user import User
from .anime import Anime


anime_list = db.Table(
    'anime_list',
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column('anime_id', db.Integer, db.ForeignKey(
        'animes.id'), primary_key=True),
    db.Column('list_id', db.Integer, db.ForeignKey(
        'lists.id'), primary_key=True)
)

if environment == "production":
    __table_args__ = {'schema': SCHEMA}


class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    private = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    animes = db.relationship(
        "Anime", secondary=anime_list, cascade="delete-orphan", back_populates="lists"
    )

    users = db.relationship("User", back_populates="lists")

    @property
    def _title(self):
        return self.title

    @_title.setter
    def _title(self, title):
        self.title = title

    @property
    def _type(self):
        return self.type

    @_type.setter
    def _type(self, type):
        self.type = type

    def to_dict_base(self):
        return {
            'id': self.id,
            'ownder_id': self.owner_id,
            'title': self.title,
            'type': self.type,
            'private': self.private,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }

    def to_dict(self):
        return {
            'id': self.id,
            'ownder_id': self.owner_id,
            'title': self.title,
            'type': self.type,
            'private': self.private,
            'anime': [anime.to_dict() for anime in self.animes],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
