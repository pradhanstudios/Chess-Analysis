import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const analyzed_pgn = `[Event \"State Ch.\"]
[Site \"New York, USA\"]
[Date \"1910.??.??\"]
[Round \"?\"]
[White \"Capablanca\"]
[Black \"Jaffe\"]
[Result \"1-0\"]
[ECO \"D46\"]
[Opening \"Queen's Gambit Dec.\"]
[Annotator \"Reinfeld, Fred\"]
[WhiteTitle \"GM\"]
[WhiteCountry \"Cuba\"]
[BlackCountry \"United States\"]

1. d4 d5 2. Nf3 Nf6 3. e3 c6! 4. c4!! e6! 5. Nc3!! Nbd7!! 6. Bd3! Bd6
7. O-O! O-O! 8. e4!! dxe4! 9. Nxe4!! Nxe4!! 10. Bxe4!! Nf6! 11. Bc2!! h6!
12. b3 b6! 13. Bb2! Bb7 14. Qd3!! g6? 15. Rae1!! Nh5! 16. Bc1 Kg7??
17. Rxe6!! Nf6! 18. Ne5!! c5? 19. Bxh6+ Kxh6? 20. Nxf7+!! 1-0`;

function GameDisplay({ pgn }) {
    const [game, setGame] = useState(null);
    const [fen, setFen] = useState('start');
    const [currentMove, setCurrentMove] = useState(0);
    const [future, setFuture] = useState([]);

    const addToFuture = (item) => {
        const replacement = [...future, item];
        setFuture(replacement);
    }

    const popFromFuture = () => {
        const out = future[future.length - 1];
        setFuture(future => future.slice(0, -1));
        return out;
    }

    useEffect(() => {
        if (pgn) {
            const newGame = new Chess();
            newGame.loadPgn(pgn);
            setGame(newGame);
            setFen(newGame.fen());
            setCurrentMove(newGame.history().length)
        }
    }, [pgn]);

    const handleMove = (move) => {
        if (game) {
            try {
                game.move(move);
                setFen(game.fen());
                setCurrentMove(currentMove + 1);
            } catch (e) {
                console.error("Invalid move:", move);
            }
        }
    };

    const goToPreviousMove = (e) => {
        e.preventDefault();

        if (game && currentMove > 0) {
            var moves = game.history();
            var tmp = new Chess();
            var prev = currentMove - 1;

            for (var i = 0; i < prev; i++) {
                tmp.move(moves[i]);
            }

            var prev_fen = tmp.fen();
            tmp.move(moves[prev]);
            addToFuture(tmp.fen());

            setFen(prev_fen);
            setCurrentMove(currentMove - 1);
        }
    };

    const goToNextMove = (e) => {
        e.preventDefault();

        if (game && currentMove < game.history().length) {
            setFen(popFromFuture());
            setCurrentMove(currentMove + 1);
        }
    };

    return (
        <div>
            {game ? (
                <div>
                    <Chessboard id="BasicBoard" position={fen} boardWidth={600} />
                    <p>Move: {currentMove} / {game.history().length}</p>
                    <button onClick={goToPreviousMove} disabled={currentMove === 0}>Previous Move</button>
                    <button onClick={goToNextMove} disabled={currentMove === game.history().length}>Next Move</button>
                </div>
            ) : (
                <p>Loading game...</p>
            )}
        </div>
    );
}

export default GameDisplay;
