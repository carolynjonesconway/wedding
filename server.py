import json

from flask import Flask, render_template
from models import db, connect_to_db, Invite
from os import environ as env

app = Flask(__name__)
DEBUG = 'DEBUG' in env
PORT = env.get('PORT', 5000)


@app.route("/")
def home():
    return render_template("home.html")

@app.route("/invite-code/<code>", methods=["GET", "POST"])  # FIXME
def invite_code(code):

    matching_invite = Invite.validate(code)

    if matching_invite:
        resp = {"ok": True}
    else:
        resp = {"error": "Invalid Code"}

    return json.dumps(resp)

if __name__ == "__main__":
    connect_to_db(app)
    app.run(debug=DEBUG, host='0.0.0.0', port=PORT)