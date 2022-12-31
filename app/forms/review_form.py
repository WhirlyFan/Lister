from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Review


def rating_validator(form, field):
    if not (1 <= int(field.data) <= 5):
        raise ValidationError('Rating must be between 1 and 5')


class CreateReview(FlaskForm):
    review = StringField('review', validators=[DataRequired(), Length(
        min=3, max=255, message='Review must be between 3 and 255 characters long')])
    rating = StringField('rating', validators=[
                         DataRequired(), rating_validator])
    submit = SubmitField('Create Review')


class UpdateReview(FlaskForm):
    review = StringField('review', validators=[DataRequired(), Length(
        min=3, max=255, message='Review must be between 3 and 255 characters long')])
    rating = StringField('rating', validators=[
                         DataRequired(), rating_validator])
    submit = SubmitField('Update Review')
