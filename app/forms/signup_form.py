from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def password_match(form, field):
    # Checking if passwords match
    password = form.password.data
    repeat_password = field.data
    if password != repeat_password:
        raise ValidationError('Passwords do not match.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(
            min=3, max=20, message='Username must be between 3 and 20 characters long.'
        )])
    email = StringField('email', validators=[DataRequired(), user_exists, Length(
        min=3, max=30, message='Username must be between 3 and 30 characters long.'
    )])
    password = StringField('password', validators=[DataRequired(), Length(
        min=3, max=30, message='Password must be between 3 and 30 characters long.'
    )])
    repeat_password = StringField(
        'repeat_password', validators=[DataRequired(), password_match, Length(
            min=3, max=30, message='Repeat Password must be between 3 and 30 characters long.'
        )])
