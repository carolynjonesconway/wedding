from flask import url_for as flask_url_for
from flask import current_app

PRODUCTION_STATIC_URL = 'https://s3.amazonaws.com/cocoandej'


def url_for(endpoint, **values):
    url = flask_url_for(endpoint, **values)

    if not current_app.debug and url.startswith('static'):
        url = url.replace('static', '', 1)
        return PRODUCTION_STATIC_URL + url

    return url
