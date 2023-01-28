from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Channel


def rating_validator(form, field):
    if not (1 <= int(field.data) <= 10):
        raise ValidationError('Rating must be between 1 and 10.')


# class CreateChannel(FlaskForm):
#     review = StringField('review', validators=[DataRequired(), Length(
#         min=3, max=255, message='Review must be between 3 and 255 characters long.')])
#     rating = StringField('rating', validators=[
#                          DataRequired(), rating_validator])
#     anime_id = IntegerField('anime_id', validators=[DataRequired()])
#     submit = SubmitField('Create Review')


class UpdateChannel(FlaskForm):
    name = StringField('review', validators=[DataRequired(), Length(
        min=3, max=20, message='Review must be between 3 and 20 characters long.')])
    rating = StringField('rating', validators=[
                         DataRequired(), rating_validator])
    submit = SubmitField('Update Review')
