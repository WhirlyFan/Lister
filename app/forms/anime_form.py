from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Anime


def validate_title(self, title):
    anime = Anime.query.filter(Anime.title == title).first()
    if anime:
        raise ValidationError('Anime already exists')


class CreateAnime(FlaskForm):
    mal_id = IntegerField('mal_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    image = StringField('image', validators=[DataRequired()])
    submit = SubmitField('Create Anime')
