import json

from flask import Flask, render_template, request, make_response
from models import db, connect_to_db, Invite
from os import environ as env


app = Flask(__name__)
DEBUG = 'DEBUG' in env
PORT = env.get('PORT', 5000)


@app.route("/")
def home():
    invite_code = request.cookies.get("conWedInvCode", "")
    return render_template("home.html", invite_code=invite_code)

@app.route("/invite-code/", methods=["POST"])
def invite_code():
    code = request.form["code"]
    matching_invite = Invite.validate(code)

    if matching_invite:
        resp = {"ok": True}
    else:
        resp = {"error": "Invalid Code"}

    return json.dumps(resp)

@app.route("/rsvp/", methods=["POST"])
def rsvp():
    code = request.form["inviteCode"]
    attending = request.form["attending"]
    return 

if __name__ == "__main__":
    connect_to_db(app)
    app.run(debug=DEBUG, host='0.0.0.0', port=PORT)