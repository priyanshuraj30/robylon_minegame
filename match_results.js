const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mines_game.db');

// Function to fetch and display match results from the database
function displayMatchResults() {
    db.all("SELECT * FROM matches", (err, rows) => {
        if (err) {
            console.error("Error fetching match results:", err);
            return;
        }
        console.log("Match Results:");
        console.log("--------------");
        console.log("Game No | Total Moves | Game State | Result/Winner");
        console.log("--------------------------------------------");
        rows.forEach(row => {
            console.log(`${row.id} | ${row.player_moves + 1} | ${row.game_state} | ${row.result}`);
        });
    });
}

// Export function
module.exports = {
    displayMatchResults
};
