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
    let stars = [];
    const starCount = 180;
    const colors = [
      "rgba(255, 255, 255, ",     // White
      "rgba(236, 72, 153, ",     // Pink
      "rgba(139, 92, 246, ",     // Violet
      "rgba(22, 242, 179, ",     // Teal
    ];

    const planets = [
      {
        distance: 220,
        angle: 0.8,
        speed: 0.0005,
        size: 13,
        baseColor: "#ec4899", // Pink planet
        lightColor: "#fdf4ff",
        darkColor: "#86198f",
        hasRings: false,
        hasMoons: 1,
      },
      {
        distance: 380,
        angle: 2.8,
        speed: -0.0003,
        size: 22,
        baseColor: "#0ea5e9", // Blue ringed giant
        lightColor: "#f0f9ff",
        darkColor: "#075985",
        hasRings: true,
        ringColor: "rgba(14, 165, 233, 0.35)",
        ringAngle: Math.PI / 6,
        hasMoons: 0,
      },
      {
        distance: 540,
        angle: 4.5,
        speed: 0.0002,
        size: 15,
        baseColor: "#10b981", // Emerald planet
        lightColor: "#ecfdf5",
        darkColor: "#065f46",
        hasRings: false,
        hasMoons: 2,
      },
    ];

    // Resize canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    // Track mouse position
    const handleMouseMove = (e) => {
      // Normalize mouse coords (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      
      // Target offset in pixels
      targetOffset.current = {
        x: x * 60, // Maximum offset horizontal
        y: y * 60, // Maximum offset vertical
      };
    };

    // Initialize stars in a galaxy spiral configuration
    const initStars = () => {
      stars = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.max(canvas.width, canvas.height) * 0.8;

      for (let i = 0; i < starCount; i++) {
        // Distribute stars along spiral arms (2 arms)
        const isArmA = Math.random() > 0.5;
        const baseAngle = isArmA ? 0 : Math.PI;

        // Distance from center with cubic distribution (more stars near center)
        const distance = Math.pow(Math.random(), 2.5) * maxRadius;
        
        // Spiral angle formula: angle increases with distance
        const angle = baseAngle + (distance * 0.005) + (Math.random() - 0.5) * 0.4;
        
        stars.push({
          distance,
          angle,
          speed: 0.0004 + Math.random() * 0.0008, // Slow orbital speed
          size: 0.4 + Math.pow(Math.random(), 2) * 2.2, // Variety of sizes
          colorPrefix: colors[Math.floor(Math.random() * colors.length)],
          twinkleSpeed: 0.005 + Math.random() * 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    
    // Set initial size
    handleResize();

    // Animation Loop
    const draw = () => {
      // Clear canvas to pure solid black space background
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smoothly interpolate (lerp) current offset to target mouse offset
      currentOffset.current.x += (targetOffset.current.x - currentOffset.current.x) * 0.05;
      currentOffset.current.y += (targetOffset.current.y - currentOffset.current.y) * 0.05;

      const centerX = (canvas.width / 2) + currentOffset.current.x;
      const centerY = (canvas.height / 2) + currentOffset.current.y;

      // Draw Galaxy Core Glow
      const coreGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.min(canvas.width, canvas.height) * 0.3
      );
      coreGradient.addColorStop(0, "rgba(79, 70, 229, 0.12)"); // Violet glow
      coreGradient.addColorStop(0.5, "rgba(236, 72, 153, 0.04)"); // Pink glow
      coreGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(canvas.width, canvas.height) * 0.6, 0, Math.PI * 2);
      ctx.fill();

      // Render Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Orbit calculation
        star.angle += star.speed;

        // Calculate coordinates based on distance, angle, and center (with mouse parallax)
        const x = centerX + Math.cos(star.angle) * star.distance;
        const y = centerY + Math.sin(star.angle) * star.distance;

        // Twinkle calculation
        star.twinklePhase += star.twinkleSpeed;
        const opacity = 0.3 + (Math.sin(star.twinklePhase) + 1) * 0.35; // oscilates between 0.3 and 1.0

        ctx.fillStyle = `${star.colorPrefix}${opacity})`;
        
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Optional star glow for larger stars
        if (star.size > 1.8) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
          ctx.beginPath();
          ctx.arc(x, y, star.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow
        }
      }

      // Render Floating Planets
      for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];

        // Update angle orbit
        planet.angle += planet.speed;

        // Calculate location with cursor parallax offset
        const px = centerX + Math.cos(planet.angle) * planet.distance;
        const py = centerY + Math.sin(planet.angle) * planet.distance;

        // Draw Rings behind the planet (drawn first as transparent ellipse)
        if (planet.hasRings) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(planet.ringAngle);
          ctx.strokeStyle = planet.ringColor;
          ctx.lineWidth = planet.size * 0.25;
          ctx.beginPath();
          ctx.ellipse(0, 0, planet.size * 1.8, planet.size * 0.4, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Draw Planet Body (3D Spherical Radial Gradient)
        const planetGrad = ctx.createRadialGradient(
          px - planet.size * 0.25, py - planet.size * 0.25, planet.size * 0.1,
          px, py, planet.size
        );
        planetGrad.addColorStop(0, planet.lightColor);
        planetGrad.addColorStop(0.35, planet.baseColor);
        planetGrad.addColorStop(1, planet.darkColor);

        ctx.fillStyle = planetGrad;
        ctx.beginPath();
        ctx.arc(px, py, planet.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw Orbiting Moons
        if (planet.hasMoons > 0) {
          for (let m = 0; m < planet.hasMoons; m++) {
            const moonDistance = planet.size * 1.8 + m * 8;
            const moonAngle = (Date.now() * 0.0015 * (m === 0 ? 1 : -0.7)) + (m * Math.PI * 0.5);
            const mx = px + Math.cos(moonAngle) * moonDistance;
            const my = py + Math.sin(moonAngle) * moonDistance;

            ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
            ctx.beginPath();
            ctx.arc(mx, my, 1.8 + m * 0.4, 0, Math.PI * 2);
            ctx.fill();

            // Subtle moon glow
            ctx.shadowBlur = 4;
            ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
            ctx.beginPath();
            ctx.arc(mx, my, 1.8 + m * 0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

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
      className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
