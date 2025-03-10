from constants import *
from evaluate import evaluate

def analyze(pgn: dict) -> dict:
    for i, move in enumerate(pgn[MOVES]):
        pgn[MOVES][i] += f" {evaluate(move)}"

    return pgn