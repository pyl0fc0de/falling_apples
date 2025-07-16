const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Load Images
const appleImg = new Image();
appleImg.src = "apple-removebg-preview.png";

const basketImg = new Image();
basketImg.src = "basket-removebg-preview.png";

let score = 0;

// Basket and Apple Objects
let basket = {
  x: 160,
  y: 450,
  width: 80,
  height: 60,
  speed: 10
};

let apple = {
  x: Math.random() * (canvas.width - 40),
  y: 0,
  width: 40,
  height: 40,
  speed: 2
};

// Start Drawing When Images Are Loaded
appleImg.onload = () => {
  basketImg.onload = () => {
    draw();
  };
};

function drawBasket() {
  ctx.drawImage(basketImg, basket.x, basket.y, basket.width, basket.height);
}

function drawApple() {
  ctx.drawImage(appleImg, apple.x, apple.y, apple.width, apple.height);
}

function moveApple() {
  apple.y += apple.speed;
  if (apple.y > canvas.height) {
    resetApple(); // Optional: If you want to end game on miss, do that here
  }
}

function resetApple() {
  apple.x = Math.random() * (canvas.width - apple.width);
  apple.y = 0;
}

function checkCollision() {
  if (
    apple.y + apple.height >= basket.y &&
    apple.y + apple.height <= basket.y + 10 &&
    apple.x + apple.width >= basket.x &&
    apple.x <= basket.x + basket.width
  ) {
    score++;
    document.getElementById("scoredisplay").textContent = "Score: " + score;
    resetApple();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBasket();
  drawApple();
  moveApple();
  checkCollision();
  requestAnimationFrame(draw);
}

// Move Basket with Arrow Keys
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" && basket.x > 0) {
    basket.x -= basket.speed;
  } else if (e.key === "ArrowRight" && basket.x + basket.width < canvas.width) {
    basket.x += basket.speed;
  }
});
