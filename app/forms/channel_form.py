from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
# from app.models import Channel


class CreateChannel(FlaskForm):
    name = StringField('review', validators=[Length(
        max=20, message='Name cannnot be longer than 20 characters')])
    submit = SubmitField('Update Review')


class UpdateChannel(FlaskForm):
    name = StringField('review', validators=[Length(
        max=20, message='Name cannnot be longer than 20 characters')])
    submit = SubmitField('Update Review')
