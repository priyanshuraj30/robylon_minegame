const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mines_game.db');

// Function to initialize the database
function initializeDatabase() {
    db.run("CREATE TABLE IF NOT EXISTS matches (id INTEGER PRIMARY KEY, player_moves INTEGER, game_state TEXT, result TEXT)");
}

// Function to insert match results into the database
function insertMatchResult(playerMoves, gameState, result) {
    const stmt = db.prepare("INSERT INTO matches (player_moves, game_state, result) VALUES (?, ?, ?)");
    stmt.run(playerMoves, gameState, result);
    stmt.finalize();
}

// Export functions
module.exports = {
    initializeDatabase,
    insertMatchResult
};
