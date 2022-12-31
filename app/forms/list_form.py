from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import List


class CreateList(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(
        min=3, max=50, message='List name must be between 3 and 50 characters long')])
    private = BooleanField('private')
    submit = SubmitField('Create List')


class UpdateList(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(
        min=3, max=50, message='List name must be between 3 and 50 characters long')])
    private = BooleanField('private')
    submit = SubmitField('Update List')
