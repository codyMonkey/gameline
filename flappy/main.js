const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Bird
let bird = {
  x: 50,
  y: 150,
  width: 30,
  height: 30,
  gravity: 0.3,    // reduced gravity
  lift: -6,        // smaller jump
  velocity: 0
};

// Pipes
let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;
let gameStarted = false;

function drawBird() {
  ctx.fillStyle = "#ff0";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
  ctx.fillStyle = "#0f0";
  pipes.forEach(pipe => {
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
    ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
  });
}

function updatePipes() {
  if (frame % 90 === 0) {
    const gap = 160; // bigger gap
    const top = Math.random() * (canvas.height - gap - 60) + 30;
    pipes.push({
      x: canvas.width,
      width: 50,
      top: top,
      bottom: canvas.height - top - gap
    });
  }

  pipes.forEach(pipe => pipe.x -= 2);
  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
}

function checkCollision() {
  pipes.forEach(pipe => {
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
    ) {
      gameOver = true;
    }
  });

  if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
    gameOver = true;
  }
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function drawInstructions() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Press SPACE to start and jump", 40, canvas.height / 2 - 20);
  ctx.fillText("Press R to restart after Game Over", 20, canvas.height / 2 + 20);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameStarted) {
    drawInstructions();
    requestAnimationFrame(gameLoop);
    return;
  }

  if (!gameOver) {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    updatePipes();
    drawPipes();
    drawBird();
    checkCollision();

    if (frame % 90 === 0) score++;

    drawScore();
    frame++;
    requestAnimationFrame(gameLoop);
  } else {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 70, 240);
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 120, 270);
    ctx.fillText("Press R to restart", 90, 300);
  }
}

window.addEventListener("keydown", e => {
  if (e.code === "Space") {
    if (!gameStarted) gameStarted = true; // start game on first space
    bird.velocity = bird.lift;
  } else if (e.code === "KeyR") {
    // Reset the game but wait until space is pressed again
    pipes = [];
    frame = 0;
    score = 0;
    gameOver = false;
    gameStarted = false;
    bird.y = 150;
    bird.velocity = 0;
    requestAnimationFrame(gameLoop);
  }
});

gameLoop();
