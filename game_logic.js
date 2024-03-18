const readline = require('readline');
const WebSocket = require('ws');
const db = require('./database');
const { insertMatchResult } = require('./database');


// Function to create the game grid
function createGrid(size) {
    const grid = [];
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            row.push('G');
        }
        grid.push(row);
    }
    return grid;
}

// Function to randomly place the mine and gems on the grid
function placeMineAndGems(grid) {
    const size = grid.length;
    const totalTiles = size * size;
    const mineIndex = Math.floor(Math.random() * totalTiles);
    let minesPlaced = 0;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (minesPlaced < 1 && (i * size + j) === mineIndex) {
                grid[i][j] = 'M';
                minesPlaced++;
            }
        }
    }
}

// Function to check if the given coordinates are within the grid bounds
function isValidMove(grid, row, col) {
    const size = grid.length;
    return row >= 1 && row <= size && col >= 1 && col <= size;
}

// Function to reveal a tile at the given coordinates
function revealTile(grid, row, col, currentPlayer) {
    const rowIndex = row - 1;
    const colIndex = col - 1;

    if (grid[rowIndex][colIndex] === 'M') {
        console.log(`Player ${currentPlayer} hit a mine! Player ${3 - currentPlayer} wins!`);
        return true;
    }

    console.log(`Player ${currentPlayer} opened tile at (${row}, ${col})`);
    grid[rowIndex][colIndex] = `${currentPlayer}`;
    return false;
}

// Function to check if the game is over
function checkGameOver(grid) {
    for (let row of grid) {
        if (row.includes('G')) {
            return false; // Gem found, game not over
        }
    }
    return true; // All gems revealed, game over
}

// Function to play the game
function playGame(players) {
    // Game setup
    const gridSize = 5;
    const grid = createGrid(gridSize);
    placeMineAndGems(grid);
    console.log(grid);

    // Broadcast initial grid to players
    // broadcastGameState(players, grid);

    let currentPlayer = 1;
    let moves = 0;
    let gameOver = false;

    for (const player of players) {
        player.send(JSON.stringify('Player ' + currentPlayer + ' chance now!'));
    }

    // Handle player moves
    for (const player of players) {
        player.on('message', function incoming(message) {
            if (gameOver) {
                console.log(`Game already over!`);
                return;
            }

            const move = JSON.parse(message); // Parse the incoming message as JSON
            const row = parseInt(move.row);
            const col = parseInt(move.col);

            if (!isValidMove(grid, row, col) || grid[row - 1][col - 1] == 1 || grid[row - 1][col - 1] == 2) {
                player.send(JSON.stringify(("Invalid move! Enter again")));
                return; // Don't increase moves counter for invalid input
            }

            if (currentPlayer !== players.indexOf(player) + 1) {
                player.send(JSON.stringify("It's not your turn!"));
                return;
            }

            if (revealTile(grid, row, col, currentPlayer)) {
                const winner = currentPlayer === 1 ? 'Player 2' : 'Player 1';
                const loser = currentPlayer === 1 ? 'Player 1' : 'Player 2';
                db.insertMatchResult(moves, JSON.stringify(grid), loser === 'Draw' ? 'Draw' : winner);
                broadcastGameOver(players, currentPlayer);
                broadcastGameState(players, grid);
                gameOver = true;
                return;
            }

            // broadcastGameState(players, grid);
            for (const player of players) {
                player.send(JSON.stringify('Player ' + currentPlayer + ' entered ' + row + ' ' + col));
            }
            moves++;
            currentPlayer = currentPlayer === 1 ? 2 : 1;

            if (moves >= 24 || checkGameOver(grid)) {
                if (!gameOver) {
                    console.log(`It's a draw!`);
                    db.insertMatchResult(moves, JSON.stringify(grid), 'Draw');
                    broadcastGameOver(players);
                    broadcastGameState(players, grid);
                }
                gameOver = true;
            }

            if (!gameOver) {
                for (const player of players) {
                    player.send(JSON.stringify('Player ' + currentPlayer + ' chance now!'));
                }
            }
        });
    }
}

// Function to broadcast game state to players
function broadcastGameState(players, grid) {
    let gameState = "Game State:";
    for (const player of players) {
        player.send(JSON.stringify(gameState));
    }
    for (let row of grid) {
        gameState = "";
        gameState += row.join(' | ') + '\n';
        for (const player of players) {
            player.send(JSON.stringify(gameState));
        }
    }
}

// Function to broadcast game over message to players
function broadcastGameOver(players, winner = 0) {
    for (const player of players) {
        player.send(JSON.stringify('Game Over!'));
        player.send(JSON.stringify(winner === 0 ? 'Draw' : 'Winner is Player ' + (3 - winner)));
    }
}

module.exports = {
    playGame
};
