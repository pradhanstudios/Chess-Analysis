from constants import *

def is_blunder(evaluation: int, optimal_evaluation: int, turn: int) -> bool:
    return (optimal_evaluation - evaluation*turn) >= 200

def is_mistake(evaluation: int, optimal_evaluation: int, turn: int) -> bool:
    return (optimal_evaluation - evaluation*turn) >= 100
    
def is_good(evaluation: int, optimal_evaluation: int, turn: int) -> bool:
    return (optimal_evaluation - evaluation*turn) >= 50

def is_excellent(evaluation: int, optimal_evaluation: int, turn: int) -> bool:
    return (optimal_evaluation - evaluation*turn) > 0 
    
def is_perfect(evaluation: int, optimal_evaluation: int, turn: int) -> bool:
    return evaluation >= (optimal_evaluation*turn)

def get_move_type(evaluation: int, optimal_evaluation: int, turn: int) -> str:
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
        
    if is_perfect(evaluation, optimal_evaluation, turn):
        return PERFECT
    
    return "ERR"
        
    