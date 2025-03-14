from flask import Flask, jsonify, render_template, request, url_for, redirect
from flask_cors import CORS
from logic.parse import parse_pgn
from logic.analyse import analyse

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
    # if request.method == "POST":
    #     data = request.get_json()
    #     print(data)
    #     return redirect(url_for("form_data", data=data))

    if request.method == "POST":
        form_data = request.get_json()
        print(request.get_json())
        # Process or store form_data here
        pgn = parse_pgn(form_data["pgn"]["data"])
        print(analyse(pgn))

        # {'pgn': {'data': 'test'}}
        output = form_data["pgn"]["data"]
        print(output)

        return jsonify({"message": "Data received", "data": pgn})

    return jsonify({"message": "No data received"}), 400


if __name__ == "__main__":
    app.run(debug=True, port=8000)
