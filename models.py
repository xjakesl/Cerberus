from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Media(db.Model):
    __tablename__ = 'media'

    id = db.Column(db.Integer, primary_key=True)
    expiration = db.Column(db.DateTime, nullable=False)
    title = db.Column(db.String, nullable=False)
    file_name = db.Column(db.String, nullable=False)
    thumbnail_url = db.Column(db.String, nullable=False)
    channel = db.Column(db.String, nullable=False)
    downloaded = db.Column(db.Boolean, nullable=False, default=False)
    size = db.Column(db.Integer, nullable=False)
    length = db.Column(db.Integer, nullable=False)
    yt_id = db.Column(db.String, nullable=False)

    clients = db.relationship('MediaClientAssosciation', cascade='all, delete', backref=db.backref('media'), lazy='dynamic')


class MediaClientAssosciation(db.Model):
    __tablename__ = 'media_client'
    __mapper_args__ = {
        'confirm_deleted_rows': False
    }

    media_id = db.Column(db.Integer, db.ForeignKey('media.id'), primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), primary_key=True)
    request_time = db.Column(db.DateTime, nullable=False)

    def __init__(self, media, request_time):
        self.media = media
        self.request_time = request_time


class Client(db.Model):
    __tablename__ = 'client'

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String, nullable=False)
    time_joined = db.Column(db.DateTime, nullable=False)

    medias = db.relationship('MediaClientAssosciation', cascade='all, delete', backref=db.backref('client'), lazy='dynamic')

