

var CELL = 20;
var COLS = 20;
var ROWS = 20;

canvas.width = CELL * COLS;
canvas.height = CELL * ROWS;

var snake;
var food;
var dir;
var nextDir;
var score;
var best = Number(localStorage.getItem('snake-best') || 0);
var phase = 'idle';

function reset() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];

  dir = { x: 1, y: 0 };
  nextDir = { x: 1, y: 0 };
  score = 0;

  spawnFood();
}

function spawnFood() {
  while (true) {
    var x = Math.floor(Math.random() * COLS);
    var y = Math.floor(Math.random() * ROWS);

    var hit = snake.some(function(s) {
      return s.x === x && s.y === y;
    });

    if (!hit) {
      food = { x: x, y: y };
      return;
    }
  }
}function start() {
  reset();
  phase = 'running';
  loop();
}

function loop() {
  if (phase !== 'running') {
    draw();
    return;
  }

  dir = nextDir;

  var head = {
    x: snake[0].x + dir.x,
    y: snake[0].y + dir.y
  };

  // الحائط
  if (
    head.x < 0 || head.x >= COLS ||
    head.y < 0 || head.y >= ROWS
  ) {
    gameOver();
    return;
  }

  // جسم الثعبان
  for (var i = 0; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      gameOver();
      return;
    }
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;

    if (score > best) {
      best = score;
      localStorage.setItem('snake-best', best);
    }

    spawnFood();
  } else {
    snake.pop();
  }

  draw();
  setTimeout(loop, 120);
}function gameOver() {
  phase = 'dead';
  draw();
}

reset();
draw();