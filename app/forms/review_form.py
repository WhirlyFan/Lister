from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired
from app.models import Review


class CreateReview(FlaskForm):
    review = StringField('review', validators=[DataRequired()])
    rating = StringField('rating', validators=[DataRequired()])
    submit = SubmitField('Create Review')


class UpdateReview(FlaskForm):
    review = StringField('review', validators=[DataRequired()])
    rating = StringField('rating', validators=[DataRequired()])
    submit = SubmitField('Update Review')
