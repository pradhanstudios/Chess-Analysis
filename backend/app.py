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
        pgn = form_data["pgn"]["data"]
        parsed_pgn = parse_pgn(pgn)
        if not parsed_pgn:
            return jsonify({"message": "Invalid PGN", "data": "Invalid PGN"}), 400

        try:
            analyse(parsed_pgn)
        except:
            return jsonify({"message": "Invalid PGN"}), 400

        print("ORIGINAL: " + str(pgn))
        print("ANALYZED: " + str(parsed_pgn))

        return jsonify(
            {"message": "Data received", "data": parsed_pgn, "original": pgn}
        )

    return jsonify({"message": "No data received"}), 400


@app.route("/api/upload", methods=["POST"])
def upload():
    if request.method == "POST":
        form_data = request.get_data().decode()
        filename = form_data.split()[4][10:-1]
        if not filename:
            return jsonify({"message": "Please input a file"}), 400

        if not filename.endswith(".pgn"):
            return jsonify({"message": "Not a PGN file"}), 400

        pgn = "\n".join(form_data.split("\n")[4:-2])
        print("Starting analysis")
        parsed_pgn = parse_pgn(pgn)
        # print(pgn)
        try:
            analyse(parsed_pgn)
        except:
            return jsonify({"message": "Invalid PGN"}), 400

        return jsonify(
            {"message": "Data received", "data": parsed_pgn, "original": pgn}
        )

    return jsonify({"message": "No data received"}), 400


if __name__ == "__main__":
    app.run(debug=True, port=8000)
