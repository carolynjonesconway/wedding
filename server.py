import os
from flask import render_template
from app import build_app


DEBUG = 'PROD' not in os.environ
PORT = os.environ.get('PORT', 5000)

app = build_app(__name__)

@app.route("/")
def home():
	return render_template("main.html")

@app.route("/error/<int:code>")
def error(code):
	if code == 500:
		return render_template('500.html'), 500
	return render_template('404.html'), 404

@app.route("/es")
def home_es():
    return render_template("es/main.html")

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

@app.errorhandler(404)
def internal_server_error(e):
    return render_template('404.html'), 404

if __name__ == "__main__":
	app.run(debug=DEBUG, host='0.0.0.0', port=PORT)

