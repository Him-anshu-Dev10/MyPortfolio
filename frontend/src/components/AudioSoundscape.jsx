import { useEffect, useRef, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export default function AudioSoundscape() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const synthNodesRef = useRef([]);

  const startSynth = () => {
    try {
      // 1. Initialize Audio Context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // 2. Main Master Gain Node (low volume)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.04, ctx.currentTime); // Soft volume

      // 3. Create a Feedback Delay for depth
      const delay = ctx.createDelay(1.0);
      delay.delayTime.setValueAtTime(0.6, ctx.currentTime);
      const delayGain = ctx.createGain();
      delayGain.gain.setValueAtTime(0.4, ctx.currentTime); // feedback volume

      // Feedback routing
      delay.connect(delayGain);
      delayGain.connect(delay);

      // 4. Create Lowpass Filters to soften sound
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      filter.Q.setValueAtTime(4, ctx.currentTime);

      // 5. Synthesize Base Oscillators (Deep space drone)
      const osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(55.3, ctx.currentTime); // Slightly detuned for chorusing

      const osc3 = ctx.createOscillator();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(110, ctx.currentTime); // A2 octave accent

      // 6. Filter Frequency Modulator LFO (creates the slow moving space wave)
      const filterLFO = ctx.createOscillator();
      filterLFO.frequency.setValueAtTime(0.08, ctx.currentTime); // 0.08 Hz (very slow)
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(40, ctx.currentTime); // Modulate filter cutoff by +/- 40Hz

      // Connect LFO modulation
      filterLFO.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // 7. Routing connections
      osc1.connect(filter);
      osc2.connect(filter);
      osc3.connect(filter);

      filter.connect(masterGain);
      filter.connect(delay);
      delayGain.connect(masterGain);

      masterGain.connect(ctx.destination);

      // 8. Play nodes
      osc1.start();
      osc2.start();
      osc3.start();
      filterLFO.start();

      // Store nodes reference to stop later
      synthNodesRef.current = [osc1, osc2, osc3, filterLFO, ctx];
      setIsPlaying(true);
    } catch (e) {
      console.error("Web Audio API not supported in this browser:", e);
    }
  };

  const stopSynth = () => {
    const nodes = synthNodesRef.current;
    if (nodes && nodes.length > 0) {
      const [osc1, osc2, osc3, filterLFO, ctx] = nodes;
      try {
        osc1.stop();
        osc2.stop();
        osc3.stop();
        filterLFO.stop();
        ctx.close();
      } catch (err) {
        // Already stopped/closed
      }
      synthNodesRef.current = [];
    }
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  // Clean up nodes on unmount
  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  return (
    <button
      onClick={togglePlayback}
      className={`p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
        isPlaying
          ? "border-pink-500 bg-pink-500/10 text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:scale-105"
          : "border-gray-800 hover:border-violet-500 hover:bg-violet-900/10 text-gray-400 hover:text-white"
      }`}
      title={isPlaying ? "Mute Ambient Hum" : "Play Ambient Space Hum"}
    >
      {isPlaying ? (
        <FaVolumeUp className="text-sm animate-pulse" />
      ) : (
        <FaVolumeMute className="text-sm" />
      )}
    </button>
  );
}
