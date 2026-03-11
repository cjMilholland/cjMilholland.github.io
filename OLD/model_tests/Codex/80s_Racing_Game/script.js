const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const road = { left: 50, width: 300 };
const player = { x: canvas.width / 2 - 20, y: canvas.height - 100, width: 40, height: 80, speed: 5 };
let keys = { left: false, right: false };
let lines = [];
let cars = [];
let frame = 0;

function createLine(y) {
  return { x: canvas.width / 2 - 5, y, width: 10, height: 40 };
}

for (let i = 0; i < 20; i++) {
  lines.push(createLine(i * 60));
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
});

document.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
});

function update() {
  frame++;

  // Move lane lines
  lines.forEach(line => {
    line.y += 10;
    if (line.y > canvas.height) {
      line.y = -line.height;
    }
  });

  // Spawn enemy cars
  if (frame % 60 === 0) {
    const lane = Math.floor(Math.random() * 3);
    cars.push({
      x: road.left + 20 + lane * 90,
      y: -100,
      width: 40,
      height: 80,
      speed: 6
    });
  }

  cars.forEach(car => {
    car.y += car.speed;
  });

  cars = cars.filter(car => car.y < canvas.height + 100);

  // Player movement
  if (keys.left) player.x -= player.speed;
  if (keys.right) player.x += player.speed;
  player.x = Math.max(road.left, Math.min(player.x, road.left + road.width - player.width));

  // Collision detection
  for (const car of cars) {
    if (
      player.x < car.x + car.width &&
      player.x + player.width > car.x &&
      player.y < car.y + car.height &&
      player.y + player.height > car.y
    ) {
      alert('Game Over!');
      document.location.reload();
      return;
    }
  }

  draw();
  requestAnimationFrame(update);
}

function draw() {
  ctx.fillStyle = '#444';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Road
  ctx.fillStyle = '#111';
  ctx.fillRect(road.left, 0, road.width, canvas.height);

  // Lane lines
  ctx.fillStyle = '#fff';
  lines.forEach(line => ctx.fillRect(line.x, line.y, line.width, line.height));

  // Player
  ctx.fillStyle = '#0f0';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Enemy cars
  ctx.fillStyle = '#f00';
  cars.forEach(car => ctx.fillRect(car.x, car.y, car.width, car.height));
}

update();
