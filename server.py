import os
from flask import render_template
from app import build_app


app = build_app(__name__)
DEBUG = 'PROD' not in os.environ
PORT = os.environ.get('PORT', 5000)


@app.route("/")
def home():
    return render_template("main.html")

if __name__ == "__main__":
    app.run(debug=DEBUG, host='0.0.0.0', port=PORT)
