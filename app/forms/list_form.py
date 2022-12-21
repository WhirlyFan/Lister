from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import List

class CreateList(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    private = BooleanField('private')


class UpdateList(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    private = BooleanField('private')
