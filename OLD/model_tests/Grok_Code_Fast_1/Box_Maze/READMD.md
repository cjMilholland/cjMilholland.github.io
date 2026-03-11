# Box Maze Game

A simple, addictive maze navigation game built with vanilla JavaScript, HTML5 Canvas, and CSS. Navigate through randomly generated mazes, collect points, and progress through increasingly challenging levels.

## 🎮 Game Features

- **Random Maze Generation**: Each level features a unique, procedurally generated maze using recursive backtracking algorithm
- **Smooth Controls**: Navigate using WASD keys or arrow keys
- **Progressive Difficulty**: Automatic level progression with increasing score multipliers
- **Visual Feedback**: Dark theme with glowing effects and clear visual indicators
- **Audio Effects**: Sound feedback when reaching the exit (Web Audio API)
- **Responsive Design**: Clean, modern interface that works across devices

## 🎯 How to Play

1. Use **WASD** or **Arrow Keys** to move your red box through the maze
2. Navigate through the gray walls to reach the green exit square
3. Each completed level automatically advances you to the next maze
4. Score points based on level completion (Level × 100 points)
5. Try to achieve the highest score possible!

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup and canvas element
- **CSS3**: Dark theme styling with modern flexbox layout
- **Vanilla JavaScript**: ES6+ features, no external frameworks
- **HTML5 Canvas**: 2D rendering for game graphics
- **Web Audio API**: Procedural sound generation

### Architecture
- **Object-Oriented Design**: Clean class-based structure
- **Game Loop**: 60fps animation using requestAnimationFrame
- **Event-Driven Input**: Keyboard event handling for smooth controls
- **Modular Code**: Separated concerns across HTML, CSS, and JavaScript files

### Key Components
- **Maze Generation**: Recursive backtracking algorithm for perfect mazes
- **Collision Detection**: Precise boundary checking for walls and exit
- **State Management**: Clean game state handling for levels and scoring
- **Audio System**: Web Audio API for sound effects without external files

## 📁 Project Structure

```
Box_Maze/
├── index.html      # Main HTML file
├── styles.css      # Dark theme and game styling
├── script.js       # Game logic and mechanics
└── README.md       # This file
```

## 🚀 Deployment

This game is designed to run on GitHub Pages:

1. All assets are self-contained (no external dependencies)
2. Uses relative paths for local resources
3. Compatible with GitHub's static hosting
4. No build process required

## 🎨 Visual Design

- **Dark Theme**: Easy on the eyes with high contrast elements
- **Color Scheme**:
  - Background: Dark gray (#1a1a1a)
  - Walls: Medium gray (#666)
  - Player: Red with glow effect (#ff6b6b)
  - Exit: Bright green (#00ff00)
  - UI Text: Green (#00ff00)

## 🔊 Audio

- Procedural sound generation using Web Audio API
- Exit sound: Descending frequency sweep
- Graceful fallback if Web Audio is not supported

## 📱 Browser Compatibility

- Modern browsers with HTML5 Canvas support
- ES6+ JavaScript features
- Web Audio API (optional, with fallback)

## 🎮 Game Mechanics

- **Movement**: Grid-based movement with collision detection
- **Level Progression**: Automatic advancement with score accumulation
- **Scoring System**: Points awarded based on level difficulty
- **Visual Feedback**: Clear indicators for player position and objectives

## 🛠️ Development

Built without any frameworks or external libraries to demonstrate core web development skills and maintain maximum compatibility.

---

**Enjoy the game!** Navigate through the mazes and see how high you can score! 🏆
