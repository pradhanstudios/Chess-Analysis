from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/api/users", methods=["GET"])
def users():
    return jsonify(
        {
            "users": [
                "george",
                "bill",
                "billy",
            ]
        }
    )


@app.route("/api/form", methods=["GET", "POST"])
def form():
    data = request.get_json()
    # Process the data (e.g., save to a database)
    response_data = {"message": "Data received successfully", "received_data": data}
    return jsonify(response_data)


if __name__ == "__main__":
    app.run(debug=True, port=8000)
