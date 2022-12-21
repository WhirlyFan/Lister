from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import List

# def list_exists(form, field):
#     # Checking if list exists
#     title = field.data
#     list = List.query.filter(List.title == title).first()
#     if not list:
#         raise ValidationError('List provided not found.')


class CreateList(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    private = BooleanField('private')


class UpdateList(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    private = BooleanField('private')
