from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length


class CreateMessage(FlaskForm):
    # user_id = IntegerField('user_id', validators=[DataRequired()])
    # channel_id = IntegerField('channel_id', validators=[DataRequired()])
    message = StringField('message', validators=[DataRequired(), Length(
        max=255, message='Message must be less than 255 characters long.')])
    submit = SubmitField('Create Message')


class UpdateMessage(FlaskForm):
    message = StringField('message', validators=[DataRequired(), Length(
        max=255, message='Message must be less than 255 characters long.')])
    submit = SubmitField('Update Message')
