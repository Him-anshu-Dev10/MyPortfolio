import React from "react";

export default function GalaxyBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black overflow-hidden">
      {/* Top-Center Ambient Glow (Vercel/Linear style) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] opacity-75"
        style={{
          background: "radial-gradient(circle 500px at 50% 0px, rgba(120, 119, 198, 0.13) 0%, rgba(120, 119, 198, 0.03) 50%, transparent 100%)",
        }}
      />

      {/* Subtle Bottom Ambient Glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] opacity-40"
        style={{
          background: "radial-gradient(circle 400px at 50% 100%, rgba(99, 102, 241, 0.06) 0%, transparent 100%)",
        }}
      />

      {/* Ultra-Clean Static Grid Lines */}
      <div 
        className="absolute inset-0 w-full h-full opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          backgroundPosition: "center top",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 70%, transparent 100%)",
        }}
      />

      {/* Subtle Horizontal Divider Glow */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </div>
  );
}
