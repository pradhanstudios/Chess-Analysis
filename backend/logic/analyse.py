import chess
import chess.engine
import chess.polyglot
from .constants import *
from .move_types import get_move_type


def analyse(pgn: dict) -> dict:
    board = chess.Board()
    opening_book = chess.polyglot.open_reader("logic/baron30.bin")
    # have stockfish the same directory
    engine = chess.engine.SimpleEngine.popen_uci("logic/Stockfish/src/stockfish")
    analysis_limit = chess.engine.Limit(time=TIME_TO_ANALYSE_PER_MOVE / 3, depth=MAX_DEPTH_PER_MOVE)
    turn = WHITE
    book_moves = True

    for i, move in enumerate(pgn[MOVES]):
        best_move = engine.analyse(board, analysis_limit).get("pv")[0]
        board.push(best_move)
        optimal_evaluation = engine.analyse(board, analysis_limit).get("score").white().score(mate_score=10000)
        board.pop()
        move = board.push_san(move).uci()
        evaluation = engine.analyse(board, chess.engine.Limit(time=TIME_TO_ANALYSE_PER_MOVE)).get("score").white().score(mate_score=10000) if best_move != move else optimal_evaluation
        
        if book_moves and bool(opening_book.get(board)):
            move_type = BOOK
        else:
            book_moves = False
            move_type = get_move_type(move, str(best_move), evaluation, optimal_evaluation, turn)
            
        pgn[MOVES][i] = f"{move} {evaluation} {best_move} {optimal_evaluation} {move_type}"
        turn *= -1

    engine.close()
    opening_book.close()
    return pgn