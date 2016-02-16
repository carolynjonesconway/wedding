from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from hashids import Hashids
from os import environ as env


db = SQLAlchemy()
DATABASE_URL = env.get("DATABASE_URL", "postgresql://carolynlee@localhost/wedding")
hashids = Hashids(min_length=6, alphabet="123456789ABCDEFGHIJKLMNPQRSTUVWXYZ")


class Guest(db.Model):

    __tablename__ = 'guests'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    invite_id = db.Column(db.Integer, db.ForeignKey('invites.id'))
    name = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.utcnow)

    invite = db.relationship('Invite', backref=db.backref('guests'))

    def __repr__(self):
        return '[GUEST - Invite: {} - Name: {}]'.format(self.invite_id, self.name)

class Invite(db.Model):

    __tablename__ = 'invites'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    head_count = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return '[INVITE - Code: {}]'.format(self.code) if self.id else '[INVITE (unsaved)]'

    @property
    def code(self):
        if self.id is None:
            raise ValueError("Missing Invite ID. Cannot generate code.")
        return hashids.encode(self.id)

    @classmethod
    def validate(cls, code):
        try:
            invite_id = hashids.decode(code)[0]
        except IndexError:
            return None

        matching_invite = cls.query.get(invite_id)
        return matching_invite or None

def connect_to_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)

def main(creat_all=False):
    from server import app
    connect_to_db(app)
    print("Connected to DB.")

    if create_all:
        db.create_all()
        print("Created all tables.")

if __name__ == '__main__':
    from sys import argv
    create_all = ("create" in argv)
    main(create_all)
