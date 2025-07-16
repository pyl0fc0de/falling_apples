const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

canvas.width = Math.min(window.innerWidth * 0.9, 1000);
canvas.height = Math.min(window.innerHeight * 0.8, 600);

// Load images
const appleImg = new Image();
appleImg.src = "apple-removebg-preview.png";

const basketImg = new Image();
basketImg.src = "basket-removebg-preview.png";

let score = 0;

const basket = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 70, // moved up a bit so it's fully visible
  width: 80,
  height: 40,
  speed: 10
};

const apple = {
  x: Math.random() * (canvas.width - 30),
  y: 0,
  speed: 2
};

let leftPressed = false;
let rightPressed = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") leftPressed = true;
  if (e.key === "ArrowRight") rightPressed = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") leftPressed = false;
  if (e.key === "ArrowRight") rightPressed = false;
});

function drawBasket() {
  ctx.drawImage(basketImg, basket.x, basket.y, basket.width, basket.height);
}

function drawApple() {
  ctx.drawImage(appleImg, apple.x, apple.y, 30, 30);
}

function update() {
  if (leftPressed && basket.x > 0) basket.x -= basket.speed;
  if (rightPressed && basket.x + basket.width < canvas.width) basket.x += basket.speed;

  apple.y += apple.speed;

  // Collision
  if (
    apple.y + 30 >= basket.y &&
    apple.x + 15 > basket.x &&
    apple.x < basket.x + basket.width
  ) {
    score++;
    document.getElementById("scoredisplay").innerText = "Score : " + score;
    resetApple();
  }

  // Missed
  if (apple.y > canvas.height) {
    showGameOver();
  }
}

function resetApple() {
  apple.x = Math.random() * (canvas.width - 30);
  apple.y = 0;
}

function showGameOver() {
  cancelAnimationFrame(animationId);
  const gameOverBox = document.getElementById("gameOverMessage");
  gameOverBox.innerText = "Game Over! Final Score: " + score;
  gameOverBox.style.display = "block";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawApple();
  drawBasket();
  update();
  animationId = requestAnimationFrame(draw);
}

let animationId = requestAnimationFrame(draw);
