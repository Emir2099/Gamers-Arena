const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
var eatSound = document.getElementById('eat-sound');
var gameOverSound = document.getElementById('gameOver-sound');
var snake = new Snake(5, 5, 25);
// var apple = new Apple(7, 7, 25)
var apple;

var gameLoopID;

window.onload = () => {
  apple = new Apple(7, 7, 25);
  tick();
  gameLoop();
};

function gameLoop() {
  gameLoopID = setInterval(tick, 1000 / 15);
}

function tick() {
  update();
  draw();
}

var score = 0; // Add this line to create a score variable

function update() {
  if (snake.move(apple, gameOver)) { // Check if the snake has eaten an apple
    score++; // Increment the score
    eatSound.play(); // Play the sound
  }
}

// function gameOver() {
//   clearInterval(gameLoopID);
// }

function draw() {
  createRect(0, 0, canvas.width, canvas.height, "limegreen");
  apple.draw();
  snake.draw();
}

function createRect(x, y, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, width, height);
}



// function updateScore(score) {
//   document.getElementById('score').innerText = "Score: " + score;
// }

function showGameOver() {
  document.getElementById('game-over').style.display = 'block';
}

// // Update the score when the snake eats an apple
// if (this.head.x == apple.pos.x && this.head.y == apple.pos.y) {
//   this.willGrow = true;
//   apple.changePosition(this.head, this.body);
//   updateScore(this.body.length); // Update the score
// }

// Show the game over message when the game is over
// Add a boolean variable to track the game state
var isGameOver = false;

var gameOverElement = document.getElementById('game-over'); // replace 'game-over' with the id of your game over element in your HTML

function gameOver() {
  clearInterval(gameLoopID);
  showGameOver();
  canvas.style.display = 'none';
  gameOverElement.style.display = 'flex';
  restartButton.style.display = 'flex';
  // Show the home button when the game is over
  document.getElementById('home-button').style.display = 'flex';
  document.querySelector('.ingame_home').style.display = 'none';
  document.querySelector('#how-to-play-card').style.display = 'none';
  document.getElementById('final-score').innerText = score;
  document.getElementById('game-over').style.display = 'flex';
  // Set isGameOver to true when the game is over
  isGameOver = true;
  gameOverSound.play();
}

var restartButton = document.getElementById('restart-button'); // replace 'restart-button' with the id of your restart button in your HTML

restartButton.addEventListener('click', function() {
  // Restart the game
  isGameOver = false;
  snake = new Snake(5, 5, 25); // Add parameters
  apple = new Apple(7, 7, 25); // Add parameters
  // Show the canvas and hide the game over message, restart button, and home button
  canvas.style.display = 'block';
  gameOverElement.style.display = 'none';
  restartButton.style.display = 'none';
  document.getElementById('home-button').style.display = 'none';
  document.querySelector('#how-to-play-card').style.display = 'block';
  score = 0;
  gameLoop(); // Restart the game loop
});



window.addEventListener("keydown", (event) => {
  setTimeout(() => {
    switch (event.code) {
      case "Down":
      case "ArrowDown":
        if (!snake.inDirection(0, -1)) snake.setDirection(0, 1);
        break;
      case "Up":
      case "ArrowUp":
        if (!snake.inDirection(0, 1)) snake.setDirection(0, -1);
        break;
      case "Left":
      case "ArrowLeft":
        if (!snake.inDirection(1, 0)) snake.setDirection(-1, 0);
        break;
      case "Right":
      case "ArrowRight":
        if (!snake.inDirection(-1, 0)) snake.setDirection(1, 0);
        break;
      // case "Space":                  <- Debug Purpose
      //   snake.willGrow = true;
      //   break;
      default:
        return;
    }
  }, 1);
});
