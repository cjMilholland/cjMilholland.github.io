# 1942-Style Top-Down Airplane Shooter

A complete, single-file HTML5/JavaScript implementation of a classic vertical scrolling shooter game inspired by 1942.

## 🎮 Game Features

### Core Gameplay
- **Player Control**: Fly an airplane at the bottom of the screen with smooth 8-directional movement
- **Combat System**: Shoot enemies while dodging their fire and avoiding kamikaze attacks
- **Progressive Difficulty**: 3 levels with increasing enemy variety and spawn rates
- **Boss Battles**: Challenging mid-boss and final boss encounters with unique attack patterns

### Enemy Types
1. **Basic Fighter** (Red) - Simple straight-line movement with occasional shooting
2. **Zigzag Fighter** (Orange) - Sine wave pattern with faster firing rate
3. **Heavy Bomber** (Dark Red) - Slow but heavily armored with spread-shot attacks
4. **Kamikaze Fighter** (Purple) - Homes in on player position with increasing speed

### Power-Up System
- **Triple Shot**: Fires three bullets in a spread pattern
- **Shield**: Temporary invincibility with visual feedback
- **Health Pack**: Restores one heart of health
- **Score Multiplier**: Doubles points earned for 15 seconds

### Visual & Audio
- **Dynamic Backgrounds**: Level-specific color schemes and animated cloud effects
- **Particle Effects**: Explosions and visual feedback for all combat interactions
- **Sound Effects**: Web Audio API-generated sounds for shooting, explosions, and power-ups
- **Smooth Animations**: 60 FPS gameplay with requestAnimationFrame

## 🛠️ Technical Implementation

### Architecture
- **Single HTML File**: All HTML, CSS, and JavaScript in one self-contained file
- **ES6 Classes**: Object-oriented design with Entity, Player, Enemy, Bullet, and PowerUp classes
- **Canvas Rendering**: Hardware-accelerated 2D graphics at 800x600 resolution
- **Game State Management**: Clean state machine handling menus, gameplay, and transitions

### Key Systems
- **Collision Detection**: AABB rectangle-based collision with optimized performance
- **Object Pooling**: Efficient memory management for bullets and particles
- **Event Handling**: Keyboard input with proper event listener management
- **Local Storage**: Persistent high score tracking

### Performance Optimizations
- Offscreen culling prevents unnecessary rendering
- Limited particle effects (50 max concurrent)
- Efficient collision detection algorithms
- RequestAnimationFrame for smooth 60 FPS gameplay

## 🎯 Game Controls

- **Movement**: Arrow Keys or WASD
- **Shoot**: Spacebar (hold for continuous fire)
- **Pause**: P key
- **Debug Mode**: D key (shows hitboxes and performance stats)

## 📊 Scoring System

- **Enemies**: 100-500 points based on type and difficulty
- **Power-ups**: 50 points for collection
- **Bonuses**:
  - Level completion: 1000 points
  - No-hit bonus: 5000 points per level
  - Accuracy bonus: Based on shots hit vs fired ratio

## 🎮 Game States

1. **Start Screen**: Instructions and game introduction
2. **Playing**: Main gameplay with real-time action
3. **Paused**: Freeze gameplay with resume option
4. **Level Complete**: Progress screen with bonuses
5. **Game Over**: Final score with restart option
6. **Victory**: Completion celebration for beating all levels

## 🚀 How to Play

1. Open `index.html` in any modern web browser
2. Click "Start Game" or press any key
3. Use arrow keys/WASD to move your airplane
4. Hold spacebar to shoot continuously
5. Collect power-ups and avoid enemy fire
6. Survive all 3 levels and defeat the final boss!

## 📁 File Structure

```
Top_Down_Airplane_Shooter/
├── index.html          # Complete game implementation
└── README.md           # This documentation
```

## 🎨 Customization

The game is easily customizable through the constants at the top of the JavaScript:
- `PLAYER_SPEED`, `BULLET_SPEED`: Adjust movement and projectile speeds
- `CANVAS_WIDTH`, `CANVAS_HEIGHT`: Change game resolution
- Enemy spawn rates and health values
- Power-up durations and effects
- Color schemes and visual styling

## 🏆 Features Implemented

✅ Single-file HTML5/JavaScript game
✅ Canvas-based rendering (800x600px)
✅ 60 FPS gameplay with requestAnimationFrame
✅ 4 enemy types with unique behaviors
✅ 3 progressive levels with boss battles
✅ 4 power-up types with timed effects
✅ Complete UI system with multiple screens
✅ Sound effects using Web Audio API
✅ Particle effects and visual feedback
✅ Collision detection and game physics
✅ Scoring system with bonuses
✅ Local storage for high scores
✅ Pause functionality and debug mode
✅ Mobile-friendly responsive design

## 🎯 Original Specification

[Original game specification and requirements preserved below]

---

## Game Specification: 1942-Style Top-Down Airplane Shooter

### Core Game Overview
Create a single-file HTML5/JavaScript game that runs in a web browser. The game should be a vertical scrolling shooter where the player controls an airplane at the bottom of the screen, shooting upward at enemy planes while dodging enemy fire and obstacles.

### Technical Requirements
- **Single HTML file** containing all HTML, CSS, and JavaScript
- **Canvas-based rendering** using HTML5 Canvas API (800x600px recommended)
- **No external dependencies** except for CDN-hosted libraries if needed
- **Frame rate:** 60 FPS target using requestAnimationFrame
- **Browser compatibility:** Modern Chrome, Firefox, Safari, Edge

### Player Aircraft
- **Starting position:** Bottom center of screen (x: canvas.width/2, y: canvas.height - 100)
- **Movement speed:** 5 pixels per frame
- **Controls:**
  - Arrow keys or WASD for movement
  - Spacebar for shooting
  - Hold for continuous fire (fire rate: 1 bullet per 100ms)
- **Boundaries:** Cannot move outside canvas edges
- **Health:** 3 hit points (display as hearts/lives in UI)
- **Sprite:** Simple triangle or airplane shape (30x30px)
- **Color:** Green or blue

### Player Weapons
- **Primary weapon:** Single straight bullet
  - Speed: 8 pixels per frame upward
  - Damage: 1 hit point
  - Size: 4x10px rectangle
  - Color: Yellow
- **Power-up weapon:** Triple shot (unlocked via power-up)
  - Three bullets: one straight, two at 15-degree angles
  - Duration: 10 seconds

### Enemy Types
1. **Basic Fighter**
   - Health: 1 HP
   - Movement: Straight down at 2px/frame
   - Shooting: Single bullet every 2 seconds
   - Points: 100
   - Sprite: Red triangle (25x25px)

2. **Zigzag Fighter**
   - Health: 2 HP
   - Movement: Sine wave pattern while moving down
   - Shooting: Single bullet every 1.5 seconds
   - Points: 200
   - Sprite: Orange triangle (25x25px)

3. **Heavy Bomber**
   - Health: 5 HP
   - Movement: Slow (1px/frame) straight down
   - Shooting: Spread of 3 bullets every second
   - Points: 500
   - Sprite: Dark red rectangle (40x60px)

4. **Kamikaze Fighter**
   - Health: 1 HP
   - Movement: Tracks player position, increases speed over time
   - Shooting: None (damage on collision)
   - Points: 150
   - Sprite: Purple triangle (20x20px)

### Level Structure
**Level 1: Training Grounds**
- Duration: 60 seconds
- Enemy waves:
  - 0-20s: Basic Fighters only (spawn every 2s)
  - 20-40s: Mix of Basic and Zigzag (spawn every 1.5s)
  - 40-60s: All enemy types except boss
- Background: Light blue with cloud sprites
- Boss: None

**Level 2: Ocean Battle**
- Duration: 90 seconds
- Enemy waves:
  - Increased spawn rate (every 1s)
  - More Zigzag and Kamikaze fighters
  - Heavy Bombers appear in pairs
- Background: Dark blue with wave patterns
- Mid-boss at 45s: Large bomber with 20 HP

**Level 3: Final Assault**
- Duration: 120 seconds
- Enemy waves:
  - Maximum spawn rate (every 0.75s)
  - All enemy types
  - Formation attacks (5 enemies in V-formation)
- Background: Sunset orange/red gradient
- Final Boss at 90s: Giant aircraft with 50 HP, multiple attack patterns

### Boss Mechanics
**Mid-Boss (Level 2)**
- Size: 80x100px
- Attack Pattern 1: Circular bullet spray (8 bullets)
- Attack Pattern 2: Targeted beam at player position
- Movement: Horizontal back and forth at top of screen

**Final Boss (Level 3)**
- Size: 120x150px
- Attack Pattern 1: Spiral bullet pattern
- Attack Pattern 2: Laser sweep across screen
- Attack Pattern 3: Summon 3 Basic Fighters
- Movement: Figure-8 pattern

### Power-Ups
- **Triple Shot:** Temporary weapon upgrade (10s)
- **Shield:** Temporary invincibility (5s)
- **Health:** Restore 1 HP
- **Score Multiplier:** 2x points for 15 seconds
- **Spawn rate:** 1 power-up every 15 seconds
- **Movement:** Float down at 1px/frame
- **Sprite:** Rotating square (20x20px) with different colors per type

### Sound Effects (Using Web Audio API or Audio() objects)
- **Player shoot:** High-pitched "pew" (100ms, 800Hz sine wave)
- **Enemy shoot:** Lower "pew" (100ms, 400Hz sine wave)
- **Explosion:** White noise burst (200ms)
- **Power-up collect:** Rising arpeggio (C-E-G notes)
- **Player hit:** Descending tone (500Hz to 200Hz)
- **Level complete:** Victory fanfare (C major chord)
- **Background music:** Simple 4-bar loop using oscillators

### Visual Effects
- **Explosions:** Expanding circles (3-5 frames) with color fade
- **Bullet impacts:** Small spark effect (2-3 frame animation)
- **Power-up glow:** Pulsing outline effect
- **Screen shake:** On player hit or boss explosion
- **Parallax scrolling:** Two-layer background (clouds and ground/water)

### UI Elements
- **Score:** Top-left corner, white text
- **Lives:** Top-right corner, heart icons
- **Level indicator:** Top-center
- **Boss health bar:** Top of screen when boss appears
- **Game Over screen:** Final score, restart button
- **Start screen:** Title, instructions, start button
- **Pause menu:** Press 'P' to pause, show "PAUSED" overlay

### Collision Detection
- **Method:** Rectangle-based AABB collision
- **Player hitbox:** Slightly smaller than sprite (80% size)
- **Enemy hitbox:** Full sprite size
- **Bullet hitbox:** Full sprite size

### Scoring System
- **Basic enemy kill:** 100 points
- **Zigzag enemy kill:** 200 points
- **Heavy bomber kill:** 500 points
- **Kamikaze kill:** 150 points
- **Power-up collect:** 50 points
- **Level completion bonus:** 1000 points
- **No-hit bonus:** 5000 points per level
- **Accuracy bonus:** Points based on hit/miss ratio

### Game States
1. **MENU:** Show start screen
2. **PLAYING:** Main game loop
3. **PAUSED:** Freeze game, show pause overlay
4. **LEVEL_COMPLETE:** Show level stats, continue button
5. **GAME_OVER:** Show final score, restart option
6. **VICTORY:** Show victory screen after completing all levels

### Performance Optimizations
- Object pooling for bullets and enemies
- Offscreen culling (don't update/render offscreen entities)
- Sprite batching where possible
- Limit particle effects to 50 concurrent particles

### Additional Features
- **High score:** Store in localStorage
- **Difficulty settings:** Easy (0.5x enemy speed), Normal (1x), Hard (1.5x)
- **Screen bounds:** Enemies and bullets removed when off-screen
- **Combo system:** Consecutive hits without missing increase multiplier
- **Debug mode:** Press 'D' to show hitboxes and FPS counter

### Code Structure Requirements
- Use ES6 classes for game entities (Player, Enemy, Bullet, etc.)
- Implement a main Game class to manage state
- Separate update and render loops
- Clear commenting for major sections
- Implement proper event listeners with cleanup

This specification should provide enough detail for a one-shot implementation while leaving room for the model to handle specific implementation details creatively.

---

**Implementation Status**: ✅ **COMPLETE** - All features implemented in a single HTML file as requested.
