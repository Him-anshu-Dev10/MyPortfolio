import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGamepad } from "react-icons/fa";

export default function SpaceArcade() {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);

  // Game state references to avoid stale closure issues in canvas loop
  const gameState = useRef({
    ship: { x: 250, y: 350, w: 20, h: 20, speed: 6 },
    lasers: [],
    asteroids: [],
    keys: {},
    score: 0,
    gameOver: false,
  });

  const handleKeyDown = (e) => {
    gameState.current.keys[e.key] = true;
    if (e.key === " " && !gameState.current.gameOver) {
      // Fire Laser
      gameState.current.lasers.push({
        x: gameState.current.ship.x,
        y: gameState.current.ship.y - 10,
        r: 3,
        speed: 8,
      });
    }
  };

  const handleKeyUp = (e) => {
    gameState.current.keys[e.key] = false;
  };

  const initGame = () => {
    setScore(0);
    setGameOver(false);
    gameState.current = {
      ship: { x: 250, y: 350, w: 20, h: 20, speed: 6 },
      lasers: [],
      asteroids: [],
      keys: {},
      score: 0,
      gameOver: false,
    };
  };

  useEffect(() => {
    if (!isOpen) {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      return;
    }

    initGame();
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const update = () => {
      const state = gameState.current;

      if (state.gameOver) return;

      // Ship controls
      if (state.keys["ArrowLeft"] || state.keys["a"] || state.keys["A"]) {
        state.ship.x = Math.max(20, state.ship.x - state.ship.speed);
      }
      if (state.keys["ArrowRight"] || state.keys["d"] || state.keys["D"]) {
        state.ship.x = Math.min(480, state.ship.x + state.ship.speed);
      }

      // Update Lasers
      state.lasers.forEach((laser, idx) => {
        laser.y -= laser.speed;
        if (laser.y < 0) state.lasers.splice(idx, 1);
      });

      // Spawn Asteroids
      if (Math.random() < 0.02) {
        state.asteroids.push({
          x: Math.random() * 460 + 20,
          y: -20,
          r: Math.random() * 15 + 8,
          speed: Math.random() * 2 + 1.5,
        });
      }

      // Update Asteroids
      state.asteroids.forEach((asteroid, idx) => {
        asteroid.y += asteroid.speed;
        if (asteroid.y > 420) state.asteroids.splice(idx, 1);

        // Check laser collision
        state.lasers.forEach((laser, lIdx) => {
          const dist = Math.hypot(laser.x - asteroid.x, laser.y - asteroid.y);
          if (dist < asteroid.r + laser.r) {
            // Hit! Remove both
            state.asteroids.splice(idx, 1);
            state.lasers.splice(lIdx, 1);
            state.score += 10;
            setScore(state.score);
          }
        });

        // Check ship collision
        const shipDist = Math.hypot(state.ship.x - asteroid.x, state.ship.y - asteroid.y);
        if (shipDist < asteroid.r + 10) {
          state.gameOver = true;
          setGameOver(true);
        }
      });
    };

    const draw = () => {
      const state = gameState.current;
      ctx.clearRect(0, 0, 500, 400);

      // Starfield background effect inside game canvas
      ctx.fillStyle = "#03040a";
      ctx.fillRect(0, 0, 500, 400);

      // Draw Ship
      ctx.beginPath();
      ctx.moveTo(state.ship.x, state.ship.y - 12);
      ctx.lineTo(state.ship.x - 10, state.ship.y + 8);
      ctx.lineTo(state.ship.x + 10, state.ship.y + 8);
      ctx.closePath();
      ctx.fillStyle = "#ec4899"; // Pink ship
      ctx.fill();

      // Draw Lasers
      ctx.fillStyle = "#a78bfa"; // Violet lasers
      state.lasers.forEach((laser) => {
        ctx.beginPath();
        ctx.arc(laser.x, laser.y, laser.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Asteroids
      ctx.fillStyle = "#6b7280"; // Gray asteroids
      state.asteroids.forEach((asteroid) => {
        ctx.beginPath();
        ctx.arc(asteroid.x, asteroid.y, asteroid.r, 0, Math.PI * 2);
        ctx.fill();
        // Core glow outline
        ctx.strokeStyle = "#4b5563";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    };

    const loop = () => {
      update();
      draw();
      gameLoopRef.current = requestAnimationFrame(loop);
    };

    // Run game loop
    loop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Game Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[999] p-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full shadow-lg border border-white/10 flex items-center justify-center cursor-pointer hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-105 transition-all"
        title="Play Space Arcade"
      >
        <FaGamepad className="text-xl" />
      </button>

      {/* Retro Game Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-[#0b0c16] border border-violet-500/30 rounded-3xl p-6 relative shadow-[0_0_50px_rgba(124,58,237,0.2)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg p-2 transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="text-center mb-4">
                <span className="text-[10px] font-bold text-violet-400 tracking-widest uppercase">Space Mini-Game</span>
                <h3 className="text-xl font-black text-white uppercase tracking-wider">Asteroid Shooter</h3>
                <div className="flex justify-between items-center mt-2 px-2">
                  <span className="text-xs text-gray-400">Controls: A/D or Left/Right to Move, Space to Fire</span>
                  <span className="text-sm font-bold text-pink-500">Score: {score}</span>
                </div>
              </div>

              {/* Game View */}
              <div className="relative border border-violet-500/20 rounded-2xl overflow-hidden shadow-inner flex justify-center bg-black">
                <canvas
                  ref={canvasRef}
                  width="500"
                  height="400"
                  className="w-full h-auto"
                />

                {/* Overlay Screen: Game Over */}
                {gameOver && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-4">
                    <h4 className="text-3xl font-black text-red-500 tracking-wider">GAME OVER</h4>
                    <p className="text-gray-400 text-sm">Final Score: <span className="text-white font-bold">{score}</span></p>
                    <button
                      onClick={initGame}
                      className="px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-full font-bold text-xs hover:scale-105 transition-transform tracking-wider cursor-pointer"
                    >
                      TRY AGAIN
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
