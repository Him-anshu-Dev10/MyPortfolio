import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaGithub,
  FaDatabase,
  FaCode,
} from "react-icons/fa";
import { SiJavascript, SiTypescript, SiTailwindcss } from "react-icons/si";

const skillsData = [
  {
    name: "HTML",
    icon: <FaHtml5 className="text-[#E34F26] text-4xl sm:text-5xl" />,
  },
  {
    name: "CSS",
    icon: <FaCss3Alt className="text-[#1572B6] text-4xl sm:text-5xl" />,
  },
  {
    name: "JavaScript",
    icon: <SiJavascript className="text-[#F7DF1E] text-4xl sm:text-5xl" />,
  },
  {
    name: "React.js",
    icon: <FaReact className="text-[#61DAFB] text-4xl sm:text-5xl" />,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-[#3178C6] text-4xl sm:text-5xl" />,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-[#06B6D4] text-4xl sm:text-5xl" />,
  },
  {
    name: "DSA",
    icon: <FaCode className="text-[#FFB84D] text-4xl sm:text-5xl" />,
  },
  {
    name: "SQL",
    icon: <FaDatabase className="text-[#4479A1] text-4xl sm:text-5xl" />,
  },
  {
    name: "Git",
    icon: <FaGithub className="text-white text-4xl sm:text-5xl" />,
  },
];

const skillDetails = {
  "HTML": {
    proficiency: 95,
    description: "Expert in clean semantics, search engine optimization (SEO), web standards, accessibility frameworks, and responsive markup layouts.",
    keywords: ["HTML5", "SEO Headers", "Semantic Layouts", "WAI-ARIA Rules"],
  },
  "CSS": {
    proficiency: 90,
    description: "Highly skilled in building pixel-perfect stylesheets using Flexbox/Grid models, variables, custom transitions, 3D card matrices, and keyframes.",
    keywords: ["CSS3 Grid/Flex", "Animations", "3D Transforms", "Responsive Media"],
  },
  "JavaScript": {
    proficiency: 92,
    description: "Extensive experience in asynchronous event-loops, promise handling, state structures, direct DOM control, and RESTful API integrations.",
    keywords: ["ES6+", "Async/Await", "Promises & Fetch", "V8 Engine Logic"],
  },
  "React.js": {
    proficiency: 90,
    description: "Expertise in designing functional layouts, crafting custom hooks, global context states, lifecycle setups, and high-speed reconciliation.",
    keywords: ["Hooks Architecture", "Context API", "Virtual DOM", "Vite Bundles"],
  },
  "TypeScript": {
    proficiency: 80,
    description: "Proficient in strictly typed compiler systems, structural interfaces, union typing, generic classes, and compile-time bug prevention.",
    keywords: ["Static Typing", "Interfaces", "Generics", "Compiler Rules"],
  },
  "Tailwind CSS": {
    proficiency: 95,
    description: "Skilled in utility-first design architectures, extending theme parameters, responsive grid overlays, and dark-theme configurations.",
    keywords: ["Utility Classes", "Theme Overrides", "JIT Engine", "Glow Highlights"],
  },
  "DSA": {
    proficiency: 82,
    description: "Strong foundation in data organization, complexity estimations (Big O), sorting/searching optimizations, and complex recursive trees.",
    keywords: ["Big O Notation", "Linear Structures", "Search & Sort", "Recursion"],
  },
  "SQL": {
    proficiency: 85,
    description: "Experienced in database schema normalization, relational tables mapping, structured join queries, indexing, and transactional operations.",
    keywords: ["Relational Models", "Table Joins", "Aggregations", "Queries Tuning"],
  },
  "Git": {
    proficiency: 88,
    description: "Proficient in version control models, remote team collaboration, merge-conflict resolutions, branch rebasing, and git-flow setups.",
    keywords: ["Branching Flows", "Conflict Resolver", "Pull Requests", "Commit History"],
  },
};

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState("React.js");

  return (
    <section
      id="skills"
      className="py-20 relative z-10 border-t border-[#25213b]"
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
            Skills
          </h2>
        </div>
      </motion.div>

      <div className="w-full relative my-12 overflow-hidden flex">
        {/* Fading Edges for the marquee effect */}
        <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex flex-row items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20, // Adjust speed
          }}
        >
          {/* Double array to create infinite loop effect */}
          {[...skillsData, ...skillsData].map((skill, index) => (
            <div
              key={index}
              onClick={() => setSelectedSkill(skill.name)}
              className="w-36 min-w-[9rem] sm:min-w-[10rem] h-fit mx-3 sm:mx-5 transition-all duration-500 rounded-lg group relative hover:scale-[1.15] cursor-pointer"
            >
              <div className={`h-full w-full rounded-lg border transition-all duration-500 shadow-none ${
                selectedSkill === skill.name
                  ? "border-pink-500 bg-[#11152c]/80 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                  : "border-[#1f223c] bg-[#11152c] group-hover:border-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
              }`}>
                <div className="flex -translate-y-[1px] justify-center">
                  <div className="w-3/4">
                    <div className={`h-[1px] w-full bg-gradient-to-r from-transparent to-transparent ${
                      selectedSkill === skill.name ? "via-pink-500" : "via-violet-500"
                    }`} />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 p-6">
                  <div className="h-8 sm:h-10 flex items-center justify-center">
                    {skill.icon}
                  </div>
                  <p className="text-white text-sm sm:text-lg">{skill.name}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Skill Spotlight Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mt-12 bg-[#11152c]/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 blur-2xl rounded-full pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center relative z-10">
          {/* Left Column: Icon & Name */}
          <div className="flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
            <div className="p-5 bg-violet-950/40 rounded-2xl border border-violet-500/20 text-5xl mb-4 text-violet-400">
              {skillsData.find(s => s.name === selectedSkill)?.icon}
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wider">{selectedSkill}</h3>
          </div>

          {/* Middle/Right Column: Details */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <span className="text-[10px] font-semibold text-violet-400 tracking-widest uppercase block mb-0.5">Description</span>
              <p className="text-gray-300 leading-relaxed text-sm font-light">{skillDetails[selectedSkill]?.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {skillDetails[selectedSkill]?.keywords.map((kw, idx) => (
                <span key={idx} className="px-2.5 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-[10px] text-violet-300 uppercase font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
