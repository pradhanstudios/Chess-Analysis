import chess
import chess.engine
from constants import *


def analyse(pgn: dict) -> dict:
    board = chess.Board()
    # have stockfish the same directory
    engine = chess.engine.SimpleEngine.popen_uci("Stockfish/src/stockfish")
    for i, move in enumerate(pgn[MOVES]):
        board.push_san(move)
        analysis = engine.analyse(board, chess.engine.Limit(time=TIME_TO_ANALYZE_PER_MOVE))
        pgn[MOVES][i] += f" {analysis.get('score').white()}"

    engine.close()
    return pgn