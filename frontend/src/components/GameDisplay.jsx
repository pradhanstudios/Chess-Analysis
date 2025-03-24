import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

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

    const goToPreviousMove = () => {
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

    const goToNextMove = () => {
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