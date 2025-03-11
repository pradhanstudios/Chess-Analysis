import chess
import chess.engine
from constants import *
from move_types import get_move_type


def analyse(pgn: dict) -> dict:
    board = chess.Board()
    # have stockfish the same directory
    engine = chess.engine.SimpleEngine.popen_uci("Stockfish/src/stockfish")
    analysis_limit = chess.engine.Limit(time=TIME_TO_ANALYSE_PER_MOVE / 3, depth=MAX_DEPTH_PER_MOVE)
    turn = WHITE
    for i, move in enumerate(pgn[MOVES]):
        best_move = engine.analyse(board, analysis_limit).get("pv")[0]
        board.push(best_move)
        optimal_evaluation = engine.analyse(board, analysis_limit).get("score").white().score()
        board.pop()
        move = board.push_san(move).uci()
        evaluation = engine.analyse(board, chess.engine.Limit(time=TIME_TO_ANALYSE_PER_MOVE)).get("score").white().score() if best_move != move else optimal_evaluation
        pgn[MOVES][i] = f"{move} {evaluation} {best_move} {optimal_evaluation} {get_move_type(evaluation, optimal_evaluation, turn)} {turn}"
        turn *= -1

    engine.close()
    return pgn