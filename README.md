<a name="top"></a>

# Chess-Analysis

Chess Analysis Webapp using React+Vite and Flask

~ this project was bootstrapped with `npm create vite`

## About

This project is a web application intended to be used to analyze chess games that are given in PGN format. Users have the option of uploading a `.pgn` file or pasting the PGN of a game directly into the application. The analysis of the moves, and a chessboard to visualize them, are displayed onto the web page.

## Prerequisites

- Install the Baron 30 Opening book binary (NOTE: include download link) (`baron30.bin`)

## Languages and Technologies used

1. HTML5/CSS3
2. JavaScript
    a. React + Vite
    b. Material UI
    c. `react-chessboard`
    d. `chess.js`
3. Python
    a. Flask
    b. `python-chess`
    c. Stockfish
    b. Baron 30 Opening Book


## Available Scripts

##### `frontend` directory

- `npm install` – install the packages necessary to run the frontend of the webapp

- `npm run dev` – start the frontend

##### `backend` directory

- `pip install requirements.txt` – install the python packages necessary to run the backend of the webapp

- `py app.py` – start the backend


## File Structure

1.  **`backend/`** - Contains the backend code for the application
    *   `app.py` - The main application file for the server
    *   `requirements.txt` - Packages required by the backend
    *   **`logic/`** - Contains server-side logic
        *   `analyse.py` -
        *   `constants.py` -
        *   `main.py` -
        *   `move_types.py` -
        *   `parse.py` -
2.  **`frontend/`** - Contains the frontend code for the application
    *   `index.html` - 
    *   `package-lock.json` -
    *   `package.json` -
    *   `.env` -
    *   `vite.config.js` -
    *   `eslint.config.js` -
    *   **`public/`** -
        *   `chess-board.svg` - Icon for webapp
    *   **`src/`** -
        *   `App.jsx` -
        *   `main.jsx` -
        *   `App.css` -
        *   `index.css` -
        *   `components/` -
            *   `MUI-ColorTabs.jsx` -
            *   `MUI-FileUploadButton.jsx` -
            *   `MUI-MultilineText.jsx` -
3.  **`./`** - 
    *   `README.md` - This file
    *   `.gitignore` - 
    *   `LICENSE` - 

## License

## Contact

[Back to top](#top)