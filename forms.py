from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, URL
from wtforms.validators import ValidationError
from urllib.parse import urlsplit
from validators import domain


def is_youtube_url(form, field):
    """
    Validator that takes in url and check if its valid youtube url.

    :param form:
    :param field:
    :raise ValidationError:
    """
    url = urlsplit(field.data)
    if domain(url.netloc) and url.netloc == "www.youtube.com" or url.netloc == "youtube.com" or url.netloc == "youtu.be":
        pass
    else:
        raise ValidationError('Invalid Youtube URL')


class Video(FlaskForm):
    """Video form for the form parameter on index()"""
    url = StringField('url', validators=[DataRequired(), URL(), is_youtube_url], render_kw={"placeholder": 'Youtube URL'})
    query = SubmitField('Search')
