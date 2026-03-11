// Game constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const GRAVITY = 0.5;
const FRICTION = 0.8;
const PLAYER_SPEED = 5;
const JUMP_FORCE = -12;
const BULLET_SPEED = 8;

// Game state
let gameState = 'menu'; // menu, playing, gameOver, levelComplete
let currentLevel = 1;
let score = 0;
let health = 100;

// Canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Input handling
const keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

// Game objects
let player;
let bullets = [];
let enemies = [];
let platforms = [];
let destructibles = [];
let particles = [];

// Player class
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.velocityX = 0;
        this.velocityY = 0;
        this.onGround = false;
        this.facingRight = true;
        this.shootCooldown = 0;
    }

    update() {
        // Horizontal movement
        if (keys['ArrowLeft'] || keys['KeyA']) {
            this.velocityX = -PLAYER_SPEED;
            this.facingRight = false;
        } else if (keys['ArrowRight'] || keys['KeyD']) {
            this.velocityX = PLAYER_SPEED;
            this.facingRight = true;
        } else {
            this.velocityX *= FRICTION;
        }

        // Jumping
        if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && this.onGround) {
            this.velocityY = JUMP_FORCE;
            this.onGround = false;
        }

        // Shooting
        if (keys['KeyZ'] && this.shootCooldown <= 0) {
            this.shoot();
            this.shootCooldown = 10;
        }

        // Apply gravity
        this.velocityY += GRAVITY;

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Boundary checks
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;

        // Ground collision
        if (this.y + this.height >= CANVAS_HEIGHT) {
            this.y = CANVAS_HEIGHT - this.height;
            this.velocityY = 0;
            this.onGround = true;
        }

        // Platform collisions
        this.onGround = false;
        platforms.forEach(platform => {
            if (this.collidesWith(platform)) {
                if (this.velocityY > 0 && this.y < platform.y) {
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.onGround = true;
                }
            }
        });

        // Cooldown management
        if (this.shootCooldown > 0) this.shootCooldown--;
    }

    shoot() {
        const bulletX = this.facingRight ? this.x + this.width : this.x;
        const bulletY = this.y + this.height / 2;
        const bullet = new Bullet(bulletX, bulletY, this.facingRight ? BULLET_SPEED : -BULLET_SPEED, 0);
        bullets.push(bullet);
    }

    collidesWith(obj) {
        return this.x < obj.x + obj.width &&
               this.x + this.width > obj.x &&
               this.y < obj.y + obj.height &&
               this.y + this.height > obj.y;
    }

    render() {
        // Glowing ball effect
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 15;

        // Main ball
        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/4, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
    }
}

// Bullet class
class Bullet {
    constructor(x, y, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.width = 6;
        this.height = 6;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.lifetime = 120; // frames
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.lifetime--;

        // Remove if out of bounds or lifetime expired
        if (this.x < 0 || this.x > CANVAS_WIDTH || this.lifetime <= 0) {
            return false;
        }
        return true;
    }

    render() {
        ctx.shadowColor = '#ffff00';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
}

// Enemy class
class Enemy {
    constructor(x, y, type = 'basic') {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;
        this.velocityX = type === 'moving' ? (Math.random() > 0.5 ? 1 : -1) : 0;
        this.velocityY = 0;
        this.type = type;
        this.health = type === 'boss' ? 3 : 1;
        this.originalX = x;
        this.moveRange = 50;
    }

    update() {
        if (this.type === 'moving') {
            this.x += this.velocityX;

            // Reverse direction at boundaries
            if (this.x <= this.originalX - this.moveRange || this.x >= this.originalX + this.moveRange) {
                this.velocityX *= -1;
            }
        }

        // Apply gravity
        this.velocityY += GRAVITY;
        this.y += this.velocityY;

        // Ground collision
        if (this.y + this.height >= CANVAS_HEIGHT) {
            this.y = CANVAS_HEIGHT - this.height;
            this.velocityY = 0;
        }
    }

    takeDamage() {
        this.health--;
        if (this.health <= 0) {
            score += this.type === 'boss' ? 50 : 10;
            createParticles(this.x + this.width/2, this.y + this.height/2, '#ff6b6b');
            return true; // dead
        }
        return false;
    }

    render() {
        let color = '#ff6b6b';
        if (this.type === 'boss') color = '#8b0000';

        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
}

// Platform class
class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render() {
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Add some texture
        ctx.fillStyle = '#654321';
        for (let i = 0; i < this.width; i += 4) {
            ctx.fillRect(this.x + i, this.y, 2, this.height);
        }
    }
}

// Destructible object class
class Destructible {
    constructor(x, y, type = 'box') {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 24;
        this.type = type;
        this.health = 2;
    }

    takeDamage() {
        this.health--;
        if (this.health <= 0) {
            score += 5;
            createParticles(this.x + this.width/2, this.y + this.height/2, '#4ecdc4');
            return true; // destroyed
        }
        return false;
    }

    render() {
        ctx.fillStyle = '#4ecdc4';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Add border
        ctx.strokeStyle = '#2c7873';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

// Particle system
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.velocityX = (Math.random() - 0.5) * 8;
        this.velocityY = (Math.random() - 0.5) * 8;
        this.life = 30;
        this.color = color;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.velocityX *= 0.98;
        this.velocityY *= 0.98;
        this.life--;
        return this.life > 0;
    }

    render() {
        ctx.globalAlpha = this.life / 30;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 2, 2);
        ctx.globalAlpha = 1;
    }
}

function createParticles(x, y, color) {
    for (let i = 0; i < 8; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// Level design
function loadLevel(level) {
    platforms = [];
    enemies = [];
    destructibles = [];
    bullets = [];
    particles = [];

    switch(level) {
        case 1:
            // Basic level - just movement and jumping
            platforms.push(new Platform(0, 500, 200, 20));
            platforms.push(new Platform(300, 450, 200, 20));
            platforms.push(new Platform(600, 400, 200, 20));
            enemies.push(new Enemy(400, 430));
            destructibles.push(new Destructible(350, 430));
            break;

        case 2:
            // Add moving enemies and more complex platforms
            platforms.push(new Platform(0, 500, 150, 20));
            platforms.push(new Platform(200, 450, 150, 20));
            platforms.push(new Platform(400, 400, 150, 20));
            platforms.push(new Platform(600, 350, 150, 20));
            enemies.push(new Enemy(250, 430, 'moving'));
            enemies.push(new Enemy(450, 380, 'moving'));
            destructibles.push(new Destructible(300, 430));
            destructibles.push(new Destructible(500, 380));
            break;

        case 3:
            // Boss level with complex layout
            platforms.push(new Platform(0, 550, 100, 20));
            platforms.push(new Platform(150, 500, 100, 20));
            platforms.push(new Platform(300, 450, 100, 20));
            platforms.push(new Platform(450, 400, 100, 20));
            platforms.push(new Platform(600, 350, 100, 20));
            platforms.push(new Platform(700, 300, 100, 20));
            enemies.push(new Enemy(200, 480, 'moving'));
            enemies.push(new Enemy(400, 380, 'moving'));
            enemies.push(new Enemy(650, 280, 'boss'));
            destructibles.push(new Destructible(250, 480));
            destructibles.push(new Destructible(450, 380));
            destructibles.push(new Destructible(550, 330));
            break;
    }

    // Reset player position
    player = new Player(50, 450);
}

// Collision detection
function checkCollisions() {
    // Bullets vs Enemies
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                if (enemy.takeDamage()) {
                    enemies.splice(enemyIndex, 1);
                }
                bullets.splice(bulletIndex, 1);
            }
        });
    });

    // Bullets vs Destructibles
    bullets.forEach((bullet, bulletIndex) => {
        destructibles.forEach((destructible, destructibleIndex) => {
            if (bullet.x < destructible.x + destructible.width &&
                bullet.x + bullet.width > destructible.x &&
                bullet.y < destructible.y + destructible.height &&
                bullet.y + bullet.height > destructible.y) {
                if (destructible.takeDamage()) {
                    destructibles.splice(destructibleIndex, 1);
                }
                bullets.splice(bulletIndex, 1);
            }
        });
    });

    // Player vs Enemies
    enemies.forEach((enemy, enemyIndex) => {
        if (player.collidesWith(enemy)) {
            health -= 20;
            if (health <= 0) {
                gameState = 'gameOver';
            }
            // Push player away from enemy
            if (player.x < enemy.x) {
                player.x -= 20;
            } else {
                player.x += 20;
            }
        }
    });
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (gameState === 'playing') {
        // Update game objects
        player.update();

        // Update bullets
        bullets = bullets.filter(bullet => bullet.update());

        // Update enemies
        enemies.forEach(enemy => enemy.update());

        // Update particles
        particles = particles.filter(particle => particle.update());

        // Check collisions
        checkCollisions();

        // Check level completion
        if (enemies.length === 0 && destructibles.length === 0) {
            if (currentLevel < 3) {
                gameState = 'levelComplete';
            } else {
                // Game completed
                score += 100;
                gameState = 'gameOver'; // Could add victory screen
            }
        }

        // Render game objects
        platforms.forEach(platform => platform.render());
        destructibles.forEach(destructible => destructible.render());
        enemies.forEach(enemy => enemy.render());
        bullets.forEach(bullet => bullet.render());
        particles.forEach(particle => particle.render());
        player.render();

    } else if (gameState === 'menu') {
        // Render menu
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Glowing Ball Platformer', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 50);

        ctx.font = '24px Arial';
        ctx.fillText('Click to Start', CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 20);
    }

    // Update UI
    document.getElementById('health-value').textContent = health;
    document.getElementById('level-value').textContent = currentLevel;
    document.getElementById('score-value').textContent = score;

    requestAnimationFrame(gameLoop);
}

// Event listeners
canvas.addEventListener('click', () => {
    if (gameState === 'menu') {
        gameState = 'playing';
        loadLevel(currentLevel);
        document.getElementById('instructions').style.display = 'none';
    }
});

document.getElementById('restart-btn').addEventListener('click', () => {
    currentLevel = 1;
    score = 0;
    health = 100;
    gameState = 'menu';
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('instructions').style.display = 'block';
});

document.getElementById('next-level-btn').addEventListener('click', () => {
    currentLevel++;
    health = Math.min(health + 20, 100); // Heal a bit for next level
    gameState = 'playing';
    loadLevel(currentLevel);
    document.getElementById('level-complete').style.display = 'none';
});

// Show/hide UI elements based on game state
function updateUI() {
    const gameOver = document.getElementById('game-over');
    const levelComplete = document.getElementById('level-complete');

    if (gameState === 'gameOver') {
        gameOver.style.display = 'block';
        document.getElementById('final-score').textContent = score;
    } else {
        gameOver.style.display = 'none';
    }

    if (gameState === 'levelComplete') {
        levelComplete.style.display = 'block';
        document.getElementById('level-score').textContent = score;
    } else {
        levelComplete.style.display = 'none';
    }
}

// Update UI every frame
setInterval(updateUI, 16);

// Start the game
gameLoop();
