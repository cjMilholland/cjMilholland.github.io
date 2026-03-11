# Glowing Ball Platformer

A retro-style platformer game built as a single-page web application. Control a glowing ball that can shoot energy projectiles at enemies and destroy objects in this Super Mario Bros 2-inspired adventure!

## 🎮 Game Features

- **Player Character**: A small glowing cyan ball with smooth movement and jumping physics
- **Combat System**: Shoot yellow energy balls at enemies and destructible objects
- **Three Progressive Levels**: Each level introduces new mechanics and increases difficulty
- **Enemy AI**: Static enemies, moving enemies, and boss enemies with health
- **Destructible Objects**: Breakable boxes that require multiple hits
- **Particle Effects**: Visual feedback when enemies/objects are destroyed
- **Responsive UI**: Health, level, and score tracking
- **Retro Styling**: Inspired by classic NES platformers

## 🎯 Controls

- **Arrow Keys** or **WASD**: Move left/right
- **Space**, **Up Arrow**, or **W**: Jump
- **Z**: Shoot energy balls
- **Mouse Click**: Start game from menu

## 🏗️ Technical Implementation

Built using vanilla JavaScript with HTML5 Canvas for rendering:

- **HTML5 Canvas**: Smooth 60fps game rendering
- **Object-Oriented Design**: Modular classes for Player, Enemies, Bullets, Platforms
- **Physics Engine**: Gravity, collision detection, and platforming mechanics
- **Particle System**: Dynamic visual effects for explosions and destruction
- **Game State Management**: Menu, playing, level complete, and game over states
- **Progressive Difficulty**: Each level teaches new mechanics

### Level Progression

1. **Level 1**: Basic movement and jumping, introduces shooting and basic enemies
2. **Level 2**: Adds moving enemies that patrol platforms, more complex level design
3. **Level 3**: Boss battle with multiple enemy types and challenging platform layout

## 🚀 How to Play

1. Open `index.html` in a modern web browser
2. Click anywhere on the canvas to start
3. Use the controls to navigate platforms and defeat enemies
4. Clear all enemies and destructible objects to advance levels
5. Survive all three levels to complete the game!

## 📁 Files

- `index.html` - Main game page with UI elements
- `styles.css` - Retro gaming aesthetic with glow effects
- `script.js` - Complete game engine and logic
- `README.md` - This documentation

## 🎨 Visual Design

- **Color Palette**: Cyan/blue player, red enemies, green destructibles, yellow projectiles
- **Glow Effects**: CSS shadows create the signature glowing ball effect
- **Retro UI**: Classic gaming interface with health, score, and level indicators
- **Particle Effects**: Dynamic explosions when objects are destroyed

## 🛠️ Development Notes

This game was created using modern web technologies without external frameworks, demonstrating:
- Canvas-based game development
- Real-time physics simulation
- Event-driven programming
- Object-oriented JavaScript architecture
- Responsive web design principles

## 🎮 Game Mechanics

- **Physics**: Realistic gravity and momentum-based movement
- **Collision Detection**: Precise hit detection for all game objects
- **Combat Balance**: Strategic shooting with cooldown mechanics
- **Progressive Challenge**: Each level builds upon previous skills
- **Scoring System**: Points for defeating enemies and destroying objects

---

## Original Prompt

> Grok please build me a single page web application which contains a video game.
>
> I would like the video game to be a simple platformer with weapons.
>
> You are a small glowing ball which can shot little balls of energy at enemy and some objects which are able to be destroyed.
>
> The game should have three levels with increasing difficulty. Each level should teach the player a new game mechanic.
>
> Please leverage any frameworks available to create whatever is needed to generate this game.
>
> Use Super Mario Bros 2 from the NES for inspiration.
>
> This will be a one shot prompt so please make sure the resulting page is perfect.
>
> Update this README.md file when finished. Please include this prompt so others will know how the game was generated.

**Game completed successfully!** 🎉
