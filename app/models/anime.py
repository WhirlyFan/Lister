from .db import db, environment, SCHEMA, add_prefix_for_prod


class Anime(db.Model):
    __tablename__ = 'animes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, unique=True)
    mal_id = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)

    lists = db.relationship(
        "List", secondary="anime_list", back_populates="animes"
    )

    reviews = db.relationship(
        "Review", cascade="all, delete-orphan", back_populates="animes")

    @property
    def _title(self):
        return self.title

    @_title.setter
    def _title(self, title):
        self.title = title

    @property
    def _image(self):
        return self.image

    @_image.setter
    def _image(self, image):
        self.image = image

    def to_dict(self):
        return {
            'id': self.id,
            'mal_id': self.mal_id,
            'title': self.title,
            'image': self.image
        }
