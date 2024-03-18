
# Mines Game

Mines Game is a turn-based game where two players compete to reveal tiles on a grid, avoiding mines while trying to reveal gems. The game ends when one player reveals a mine or when all gems are revealed.


## Running the Game

- **Install Node.js** : Ensure you have Node.js installed on your system. You can download it from [nodejs.org](nodejs.org).

- **Clone the Repository** : Clone the Mines Game repository to your local machine.

    ```bash
    git clone https://github.com/priyanshuraj30/robylon_minegame.git
    ```

- **Install Dependencies** : Navigate to the project directory and install the dependencies using npm.

    ```bash
    npm install sqlite3
    npm install sqlite3 ws
    ```

- **Start the Server** : Run the server using Node.js.

    ```bash
    node index.js
    ```

- **Connect Players** : Open the provided HTML files *(player1.html & player2.html)* in two separate web browsers or devices. Alternatively, you can share the URL with another player. The players will be prompted to enter their moves on the grid.

- **Play the Game** : Each player takes turns entering the row and column numbers to reveal a tile on the grid. The game will display the updated grid after each move. The game ends when one player reveals a mine or when all gems are revealed.
## How to Play

- Each player takes turns entering the row and column numbers (between 1 and 5) to reveal a tile on the grid.
- If a player reveals a mine, they lose, and the other player wins automatically.
- The game can also end in a draw if both players reveal 12 tiles each without hitting a mine.
- Results are displayed on the console of the web page, indicating the winner or if it's a draw.
## Viewing Match Results

- After the game ends, the match results are displayed on the console of each player's web page.
- The match results include the total number of moves, the game state, and the winner (or if it's a draw).
- The match history will be displayed on the terminal of the server side everytime the game starts.
## Usage/Examples

- Running the Game, it shows the previous matches' history and waits for two players to join the game

  ![App Screenshot](https://github.com/priyanshuraj30/robylon_minegame/blob/main/screenshots/Screenshot%20(133).png)

- Initial View for Player 1. All the updates will be reflected in the Console Section

  ![App Screenshot](https://github.com/priyanshuraj30/robylon_minegame/blob/main/screenshots/Screenshot%20(125).png)
- Initial View for Player 2

  ![App Screenshot](https://github.com/priyanshuraj30/robylon_minegame/blob/main/screenshots/Screenshot%20(126).png)
- When Player 1 enters a valid value for row and col, the console displays whose turn is the next. If any invalid value is entered, it will be displayed on the player's console to re-enter a valid value.
  
  ![App Screenshot](https://github.com/priyanshuraj30/robylon_minegame/blob/main/screenshots/Screenshot%20(127).png)
- Player 1 enters the row and col of the tile which contains a mine, so the game will be over and the winner will be displayed on both the players' console.

  ![App Screenshot](https://github.com/priyanshuraj30/robylon_minegame/blob/main/screenshots/Screenshot%20(130).png)
  ![App Screenshot](https://github.com/priyanshuraj30/robylon_minegame/blob/main/screenshots/Screenshot%20(131).png)
  ![App Screenshot](https://github.com/priyanshuraj30/robylon_minegame/blob/main/screenshots/Screenshot%20(132).png)

- Match History is updated according to the last game played.

  ![App Screenshot](https://github.com/priyanshuraj30/robylon_minegame/blob/main/screenshots/Screenshot%20(134).png)

