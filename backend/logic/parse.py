from .constants import *

def _remove_non_letters(string: str) -> str:
    output = ""
    for letter in string:
        if letter not in ("\"", "\'", "[", "]"):
            output += letter
    
    return output

def parse_pgn(pgn: str) -> dict:
    pgn = pgn.split()
    parsed_pgn = dict()
    # print(pgn)
    in_header = False
    in_moves = False
    header_title = ""
    header_info = ""
    for info in pgn:
        if info.startswith("["):
            in_header = True
            header_title = _remove_non_letters(info)

        elif in_header:
            if info.endswith("]"):
                parsed_pgn[header_title] = header_info + _remove_non_letters(info)
                header_title = ""
                header_info = ""
                in_header = False

            else: 
                header_info += _remove_non_letters(info) + " "

        if (not in_moves) and (info == "1."):
            in_moves = True
            parsed_pgn[MOVES] = []

        if in_moves and ("." not in info):
            parsed_pgn[MOVES].append(info)
            
    parsed_pgn["Result"] = parsed_pgn[MOVES].pop()

    return parsed_pgn