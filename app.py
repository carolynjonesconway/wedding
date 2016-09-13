import os

from flask import Flask
from uuid import uuid1

from helpers import url_for

def build_app(name):
    static_folder = "./static"
    app = Flask(name, static_folder=static_folder, static_url_path="/static")
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.jinja_env.globals['url_for'] = url_for
    os.environ.get('SECRET_KEY', str(uuid1()))
    return app