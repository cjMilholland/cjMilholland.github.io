class BoxMazeGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');

        // Game constants
        this.cellSize = 20;
        this.cols = Math.floor(this.canvas.width / this.cellSize);
        this.rows = Math.floor(this.canvas.height / this.cellSize);

        // Game state
        this.maze = [];
        this.player = { x: 1, y: 1 };
        this.exit = { x: 0, y: 0 };
        this.score = 0;
        this.level = 1;
        this.gameWon = false;

        // Input handling
        this.keys = {};
        this.setupEventListeners();

        // Audio context for sound effects
        this.audioContext = null;
        this.initAudio();

        // Start the game
        this.generateMaze();
        this.gameLoop();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    playExitSound() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    generateMaze() {
        // Initialize maze with walls
        this.maze = [];
        for (let y = 0; y < this.rows; y++) {
            this.maze[y] = [];
            for (let x = 0; x < this.cols; x++) {
                this.maze[y][x] = 1; // 1 = wall, 0 = path
            }
        }

        // Generate maze using recursive backtracking
        this.carvePath(1, 1);

        // Set player start position
        this.player = { x: 1, y: 1 };

        // Set exit position (bottom-right corner)
        this.exit = { x: this.cols - 2, y: this.rows - 2 };
        this.maze[this.exit.y][this.exit.x] = 0; // Ensure exit is a path

        this.gameWon = false;
    }

    carvePath(x, y) {
        this.maze[y][x] = 0; // Mark as path

        const directions = [
            [0, -2], // Up
            [2, 0],  // Right
            [0, 2],  // Down
            [-2, 0]  // Left
        ];

        // Shuffle directions for randomness
        for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directions[i], directions[j]] = [directions[j], directions[i]];
        }

        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (newX > 0 && newX < this.cols - 1 && newY > 0 && newY < this.rows - 1 && this.maze[newY][newX] === 1) {
                // Carve path to new cell
                this.maze[y + dy/2][x + dx/2] = 0;
                this.carvePath(newX, newY);
            }
        }
    }

    update() {
        if (this.gameWon) return;

        // Handle player movement
        let newX = this.player.x;
        let newY = this.player.y;

        if (this.keys['w'] || this.keys['arrowup']) {
            newY--;
        }
        if (this.keys['s'] || this.keys['arrowdown']) {
            newY++;
        }
        if (this.keys['a'] || this.keys['arrowleft']) {
            newX--;
        }
        if (this.keys['d'] || this.keys['arrowright']) {
            newX++;
        }

        // Check collision with walls
        if (newX >= 0 && newX < this.cols && newY >= 0 && newY < this.rows && this.maze[newY][newX] === 0) {
            this.player.x = newX;
            this.player.y = newY;
        }

        // Check if player reached exit
        if (this.player.x === this.exit.x && this.player.y === this.exit.y) {
            this.gameWon = true;
            this.score += this.level * 100;
            this.playExitSound();

            // Move to next level after a short delay
            setTimeout(() => {
                this.level++;
                this.generateMaze();
                this.updateUI();
            }, 1000);
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#2a2a2a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw maze
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.maze[y][x] === 1) {
                    // Wall
                    this.ctx.fillStyle = '#666';
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }

        // Draw exit
        this.ctx.fillStyle = '#00ff00';
        this.ctx.fillRect(this.exit.x * this.cellSize, this.exit.y * this.cellSize, this.cellSize, this.cellSize);

        // Draw player
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.fillRect(this.player.x * this.cellSize, this.player.y * this.cellSize, this.cellSize, this.cellSize);

        // Add glow effect to player
        this.ctx.shadowColor = '#ff6b6b';
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(this.player.x * this.cellSize, this.player.y * this.cellSize, this.cellSize, this.cellSize);
        this.ctx.shadowBlur = 0;

        // Draw level complete message
        if (this.gameWon) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = '#00ff00';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('LEVEL COMPLETE!', this.canvas.width / 2, this.canvas.height / 2);

            this.ctx.font = '24px Arial';
            this.ctx.fillText('Loading next level...', this.canvas.width / 2, this.canvas.height / 2 + 50);
        }
    }

    updateUI() {
        this.scoreElement.textContent = `Score: ${this.score}`;
        this.levelElement.textContent = `Level: ${this.level}`;
    }

    gameLoop() {
        this.update();
        this.draw();
        this.updateUI();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BoxMazeGame();
});
