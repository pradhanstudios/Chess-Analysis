from flask import Flask, jsonify, render_template, request, url_for, redirect
from flask_cors import CORS
from logic.parse import parse_pgn
from logic.analyse import analyse

app = Flask(__name__)
cors = CORS(app, origins="*")


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/api/form", methods=["POST"])
def form():
    # if request.method == "POST":
    #     data = request.get_json()
    #     print(data)
    #     return redirect(url_for("form_data", data=data))

    if request.method == "POST":
        form_data = request.get_json()
        # print(request.get_json())
        # Process or store form_data here
        pgn = parse_pgn(form_data["pgn"]["data"])
        if not pgn:
            return jsonify({"message": "Invalid PGN", "data": "Invalid PGN"}), 400
        
        print(analyse(pgn))

        # # {'pgn': {'data': 'test'}}
        # output = form_data["pgn"]["data"]
        # print(output)

        return jsonify({"message": "Data received", "data": pgn})

    return jsonify({"message": "No data received"}), 400


@app.route("/api/upload", methods=["POST"])
def upload():
    if request.method == "POST":
        form_data = request.get_data().decode()
        filename = form_data.split()[4][10:-1]
        if not filename.endswith(".pgn"):
            return jsonify({"message": "Not a PGN file"}), 400

        pgn = "\n".join(form_data.split("\n")[4:-2])
        # print(pgn)
        pgn = parse_pgn(pgn)
        pgn = analyse(pgn)
        print(pgn)

        return jsonify({"message": "Data received", "data": pgn})

    return jsonify({"message": "No data received"}), 400


if __name__ == "__main__":
    app.run(debug=True, port=8000)
