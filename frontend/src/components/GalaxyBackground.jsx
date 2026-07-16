import { useEffect, useRef } from "react";

export default function GalaxyBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const particleCount = 30;

    // Soft ambient lights
    const lights = [
      { x: 0.2, y: 0.2, color: "rgba(79, 70, 229, 0.12)", radius: 0.4 }, // Indigo
      { x: 0.8, y: 0.7, color: "rgba(168, 85, 247, 0.1)", radius: 0.35 }, // Purple
      { x: 0.5, y: 0.5, color: "rgba(99, 102, 241, 0.08)", radius: 0.45 }, // Slate Indigo
    ];

    // Initialize micro dust particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 0.5 + Math.random() * 1.2,
          speedY: -(0.05 + Math.random() * 0.15),
          speedX: (Math.random() - 0.5) * 0.1,
          opacity: 0.1 + Math.random() * 0.6,
          fadeSpeed: 0.002 + Math.random() * 0.005,
          fadingIn: Math.random() > 0.5,
        });
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      targetOffset.current = {
        x: ((e.clientX / window.innerWidth) - 0.5) * 30,
        y: ((e.clientY / window.innerHeight) - 0.5) * 30,
      };

      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    handleResize();
    mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };

    const draw = () => {
      // Solid pure dark slate background (standard premium dark mode)
      ctx.fillStyle = "#030014";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Interpolate parallax offsets
      currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.05;
      currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.05;

      const px = currentOffset.current.x;
      const py = currentOffset.current.y;

      // 1. Draw Large Static Ambient Radial Glows
      lights.forEach((light) => {
        const lx = canvas.width * light.x + px;
        const ly = canvas.height * light.y + py;
        const radius = Math.max(canvas.width, canvas.height) * light.radius;

        const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, radius);
        grad.addColorStop(0, light.color);
        grad.addColorStop(0.5, light.color.replace(/[\d.]+\)$/, "0.03)"));
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(lx, ly, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Subtle Developer Grid with Interactive Spotlight (Vercel/Linear style)
      const gridSpacing = 50;
      const spotlightRadius = 250;
      
      const offsetX = px % gridSpacing;
      const offsetY = py % gridSpacing;

      for (let x = offsetX - gridSpacing; x < canvas.width + gridSpacing; x += gridSpacing) {
        for (let y = offsetY - gridSpacing; y < canvas.height + gridSpacing; y += gridSpacing) {
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const distSq = dx * dx + dy * dy;

          // Default minimal grid visibility
          let gridOpacity = 0.025;
          let dotRadius = 0.85;

          // Spotlight logic
          if (distSq < spotlightRadius * spotlightRadius) {
            const dist = Math.sqrt(distSq);
            const ratio = 1 - dist / spotlightRadius; // 1 at mouse, 0 at edge

            gridOpacity += ratio * 0.18; // Make lines/dots under cursor glow
            dotRadius += ratio * 1.2;

            // Draw very soft connecting lines under the spotlight
            if (ratio > 0.4) {
              ctx.strokeStyle = `rgba(129, 140, 248, ${ (ratio - 0.4) * 0.05 })`; // Indigo-400
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x + gridSpacing, y);
              ctx.moveTo(x, y);
              ctx.lineTo(x, y + gridSpacing);
              ctx.stroke();
            }
          }

          // Draw the grid dot
          ctx.fillStyle = `rgba(255, 255, 255, ${gridOpacity})`;
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Draw Slowly Floating Micro Dust Particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        if (p.fadingIn) {
          p.opacity += p.fadeSpeed;
          if (p.opacity >= 0.7) p.fadingIn = false;
        } else {
          p.opacity -= p.fadeSpeed;
          if (p.opacity <= 0.05) p.fadingIn = true;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x + px * 0.1, p.y + py * 0.1, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#030014]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
