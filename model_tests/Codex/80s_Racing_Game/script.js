const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const road = {
  horizon: canvas.height * 0.2,
  topWidth: canvas.width * 0.1,
  bottomWidth: canvas.width * 0.9
};

let roadOffset = 0;
let playerPos = 0; // -1 to 1
let keys = { left: false, right: false };
let cars = [];
let frame = 0;

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
});

document.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
});


function lerp(a, b, t) {
  return a + (b - a) * t;
}

function roadWidthAt(t) {
  return lerp(road.topWidth, road.bottomWidth, t);
}

function spawnCar() {
  const offsets = [-0.6, 0, 0.6];
  cars.push({ z: 1, offset: offsets[Math.floor(Math.random() * offsets.length)] });
}

function getPlayerRect() {
  const roadW = roadWidthAt(1);
  const carW = roadW * 0.15;
  const carH = carW * 1.6;
  const maxOffset = roadW / 2 - carW / 2;
  const x = centerX - carW / 2 + playerPos * maxOffset;
  const y = canvas.height - carH - 20;
  return { x, y, w: carW, h: carH };
}

function projectCar(car) {
  const p = 1 - car.z;
  const roadW = roadWidthAt(p);
  const carW = roadW * 0.15;
  const carH = carW * 1.6;
  const maxOffset = roadW / 2 - carW / 2;
  const x = centerX - carW / 2 + car.offset * maxOffset;
  const y = lerp(road.horizon, canvas.height - carH - 20, p);
  return { x, y, w: carW, h: carH };
}

function drawCar(rect, color) {
  const { x, y, w, h } = rect;
  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(w * 0.1, 0);
  ctx.lineTo(w * 0.9, 0);
  ctx.lineTo(w, h * 0.6);
  ctx.lineTo(0, h * 0.6);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ccc';
  ctx.fillRect(w * 0.2, h * 0.1, w * 0.6, h * 0.3);

  ctx.fillStyle = '#222';
  ctx.fillRect(-w * 0.05, h * 0.6, w * 0.2, h * 0.4);
  ctx.fillRect(w * 0.85, h * 0.6, w * 0.2, h * 0.4);

  ctx.restore();
}

function drawBackground() {
  const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
  sky.addColorStop(0, '#4ec0ff');
  sky.addColorStop(1, '#105');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRoad() {
  ctx.fillStyle = '#070';
  ctx.fillRect(0, road.horizon, canvas.width, canvas.height - road.horizon);

  ctx.fillStyle = '#555';
  ctx.beginPath();
  ctx.moveTo(centerX - road.topWidth / 2, road.horizon);
  ctx.lineTo(centerX + road.topWidth / 2, road.horizon);
  ctx.lineTo(centerX + road.bottomWidth / 2, canvas.height);
  ctx.lineTo(centerX - road.bottomWidth / 2, canvas.height);
  ctx.closePath();
  ctx.fill();

  const segments = 30;
  for (let i = 0; i < segments; i++) {
    const p = (i / segments + roadOffset) % 1;
    const y = lerp(road.horizon, canvas.height, p);
    const w = roadWidthAt(p) * 0.05;
    const h = lerp(2, 20, p);
    ctx.fillStyle = '#fff';
    ctx.fillRect(centerX - w / 2, y, w, h);
  }
}

function draw(playerRect) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawRoad();
  drawCar(playerRect, '#0f0');
  cars.forEach(car => drawCar(car.screen, '#f00'));
}

function update() {
  frame++;
  roadOffset = (roadOffset + 0.02) % 1;

  if (keys.left) playerPos = Math.max(-1, playerPos - 0.05);
  if (keys.right) playerPos = Math.min(1, playerPos + 0.05);

  if (frame % 120 === 0) spawnCar();

  const playerRect = getPlayerRect();

  cars.forEach(car => {
    car.z -= 0.02;
    if (car.z < 0) car.remove = true;
    car.screen = projectCar(car);
    const r = car.screen;
    if (
      r.x < playerRect.x + playerRect.w &&
      r.x + r.w > playerRect.x &&
      r.y < playerRect.y + playerRect.h &&
      r.y + r.h > playerRect.y
    ) {
      alert('Game Over!');
      document.location.reload();
    }
  });

  cars = cars.filter(c => !c.remove);

  draw(playerRect);
  requestAnimationFrame(update);
}

update();
