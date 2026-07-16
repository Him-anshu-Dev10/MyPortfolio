import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

const milestones = [
  {
    id: 1,
    year: "2026",
    type: "experience",
    title: "Front-End Developer",
    location: "Vercel / Freelance Projects",
    desc: "Designed dynamic React client frameworks and implemented responsive features, custom hooks state-logic, and automated API fetches.",
    icon: <FaBriefcase />,
    glowColor: "from-pink-500 to-rose-600",
  },
  {
    id: 2,
    year: "2022 - 2026",
    type: "education",
    title: "Bachelor of Technology",
    location: "Graphic Era Hill University",
    desc: "Completed comprehensive computer applications courses focusing on systems modeling, algorithm optimization (DSA), and relational datasets structures (SQL).",
    icon: <FaGraduationCap />,
    glowColor: "from-[#16f2b3] to-emerald-500",
  },
  {
    id: 3,
    year: "2021 - 2022",
    type: "education",
    title: "Intermediate Education",
    location: "S.G.R.R. Public School",
    desc: "Completed secondary education scoring 87.2%, focusing on advanced physics, mathematics, and introductory computing concepts.",
    icon: <FaGraduationCap />,
    glowColor: "from-violet-500 to-indigo-600",
  },
  {
    id: 4,
    year: "2019 - 2020",
    type: "education",
    title: "High School Education",
    location: "S.G.R.R. Public School",
    desc: "Scored 84.4%, building core competencies in fundamental mathematics, physics, and science disciplines.",
    icon: <FaGraduationCap />,
    glowColor: "from-cyan-500 to-blue-600",
  },
];

export default function RoadmapTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      id="experience" // Keeps nav links working smoothly by matching target id
      className="py-24 relative z-10 border-t border-[#25213b]"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex items-center mb-16 relative"
      >
        <div className="absolute left-0 top-1/2 w-full h-[1px] bg-gradient-to-r from-[#2b2553] via-[#2b2553] to-transparent z-0"></div>
        <div className="bg-[#1a1443] px-6 py-2 md:px-8 md:py-3 rounded-lg border border-[#2b2553] z-10 relative ml-4 md:ml-10">
          <h2 className="text-lg md:text-xl font-bold uppercase text-white tracking-widest">
            Milestone Roadmap
          </h2>
        </div>
      </motion.div>

      {/* Horizontal Path Slider */}
      <div className="max-w-4xl mx-auto px-4 my-10 relative">
        {/* Connection Line */}
        <div className="absolute top-[39px] left-8 right-8 h-[2px] bg-gray-800 z-0">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(activeIdx / (milestones.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-pink-500 via-violet-500 to-indigo-500"
          />
        </div>

        {/* Checkpoints */}
        <div className="flex justify-between relative z-10">
          {milestones.map((ms, idx) => {
            const isActive = idx === activeIdx;
            const isEdu = ms.type === "education";

            return (
              <button
                key={ms.id}
                onClick={() => setActiveIdx(idx)}
                className="flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                <div 
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center text-2xl border transition-all duration-500 ${
                    isActive
                      ? `bg-gradient-to-br ${ms.glowColor} text-white border-transparent scale-110 shadow-[0_0_25px_rgba(236,72,153,0.4)]`
                      : "bg-[#0b1021] text-gray-400 border-gray-800 group-hover:border-violet-500 group-hover:text-white"
                  }`}
                >
                  {ms.icon}
                </div>
                <span 
                  className={`mt-4 text-xs font-semibold tracking-wider font-mono transition-colors uppercase ${
                    isActive ? "text-pink-500" : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  {ms.year.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spotlight Detail Card */}
      <div className="max-w-2xl mx-auto px-4 mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#11152c]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-2xl rounded-full pointer-events-none" />

            <div className="flex items-center gap-4 mb-4">
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                milestones[activeIdx].type === "experience"
                  ? "bg-pink-500/10 text-pink-400 border border-pink-500/20"
                  : "bg-[#16f2b3]/10 text-[#16f2b3] border border-[#16f2b3]/20"
              }`}>
                {milestones[activeIdx].type}
              </span>
              <span className="text-xs text-gray-500 font-mono font-bold tracking-wider uppercase">
                {milestones[activeIdx].year}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
              {milestones[activeIdx].title}
            </h3>
            <p className="text-pink-500 text-sm font-semibold mb-4 tracking-wide uppercase">
              {milestones[activeIdx].location}
            </p>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light">
              {milestones[activeIdx].desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
