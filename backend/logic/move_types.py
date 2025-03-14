from .constants import *

def is_blunder(evaluation: int, optimal_evaluation: int, turn: int) -> bool:
    return (optimal_evaluation - evaluation) >= 200 if turn == WHITE else (evaluation - optimal_evaluation) >= 200

def is_mistake(evaluation: int, optimal_evaluation: int, turn: int) -> bool:
    return (optimal_evaluation - evaluation) >= 100 if turn == WHITE else (evaluation - optimal_evaluation) >= 100
    
def is_good(evaluation: int, optimal_evaluation: int, turn: int) -> bool:
    return (optimal_evaluation - evaluation) >= 50 if turn == WHITE else (evaluation - optimal_evaluation) >= 50

def is_excellent(evaluation: int, optimal_evaluation: int, turn: int) -> bool:
    return (optimal_evaluation - evaluation) > -100000 if turn == WHITE else (evaluation - optimal_evaluation) > -100000

def get_move_type(move: str, best_move: str, evaluation: int, optimal_evaluation: int, turn: int) -> str:
    if move == best_move:
        return PERFECT

    # it is now mate-in-x against you, which was not necessary
    if evaluation == None and optimal_evaluation != None:
        return BLUNDER
    
    # You missed a mate-in-x oppurtinity 
    if evaluation != None and optimal_evaluation == None:
        return BLUNDER
    
    if evaluation == None and optimal_evaluation == None:
        return PERFECT
        
    if is_blunder(evaluation, optimal_evaluation, turn):
        return BLUNDER
        
    if is_mistake(evaluation, optimal_evaluation, turn):
        return MISTAKE
        
    if is_good(evaluation, optimal_evaluation, turn):
        return GOOD
        
    if is_excellent(evaluation, optimal_evaluation, turn):
        return EXCELLENT
    
    return "ERR"
        
    