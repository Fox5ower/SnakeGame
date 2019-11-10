const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "/img/ground.png";

const foodImg = new Image();
foodImg.src = "/img/food.png";

const box = 32;

let score = 0;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
  if (event.keyCode == 37 && dir != "right") {
    dir = "left";
  } else if (event.keyCode == 38 && dir != "down") {
    dir = "up";
  } else if (event.keyCode == 39 && dir != "left") {
    dir = "right";
  } else if (event.keyCode == 40 && dir != "up") {
    dir = "down";
  }
}

function eatTail(head, snakeArr) {
  for (let i = 0; i < snakeArr.length; i++) {
    if (head.x == snakeArr[i].x && head.y == snakeArr[i].y) {
      ctx.fillStyle = "white";
      ctx.font = "60px Impact";
      ctx.fillText("GAME OVER", box * 5.5, box * 11);
      clearInterval(game);
    }
  }
}

function draw() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "rgb(29, 141, 57)" : "rgb(240, 105, 42)";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "white";
  ctx.font = "30px Impact";
  ctx.fillText(score, box * 2.4, box * 1.6);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };
  } else snake.pop();

  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < box * 3 ||
    snakeY > box * 17
  ) {
    ctx.fillStyle = "white";
    ctx.font = "60px Impact";
    ctx.fillText("GAME OVER", box * 5.5, box * 11);
    clearInterval(game);
  }
  if (dir == "left") {
    snakeX -= box;
  } else if (dir == "right") {
    snakeX += box;
  } else if (dir == "up") {
    snakeY -= box;
  } else if (dir == "down") {
    snakeY += box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

let game = setInterval(draw, 100);
