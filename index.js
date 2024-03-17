const WebSocket = require('ws');
const { playGame } = require('./game_logic');
const db = require('./database');
const { displayMatchResults } = require('./match_results');

// Initialize the database
db.initializeDatabase();

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Store connected players
let players = [];

// Handle WebSocket connections
wss.on('connection', function connection(ws) {
    console.log('Player connected');

    // Add player to the list
    players.push(ws);

    // Start game if two players are connected
    if (players.length === 2) {
        console.log('Two players connected. Starting game.');
        playGame(players);
        players = []; // Reset players array for next game
    }
});

// Display the main menu to the player
console.log("Waiting for players to connect...");

// Show match history after game ends
displayMatchResults();
