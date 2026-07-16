import { useRef, useState } from "react";
import { projects } from "../data/projects";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { ExternalLink, Github } from "lucide-react";

const projectCaseStudies = {
  1: {
    challenges: "Designing secure role-based routes for Customers, Salon Admins, and Super Admins. Scaling concurrent appointment bookings to prevent double-booking slot conflicts, and integrating database queries/joins across relational salons.",
    features: ["Multi-Tenant Dashboards", "Role-Based Access Control", "JWT Auth Systems", "Location Salon Search"],
    architecture: "MERN Stack Architecture with PostgreSQL/Supabase database tables, Express routing controllers, and React UI layout."
  },
  2: {
    challenges: "Handling state transitions between editing and listing feeds, dealing with rich text data uploads, and managing request queues under slow connectivity.",
    features: ["CRUD Post Actions", "API Integration", "Framer Transition feeds", "State Hook workflows"],
    architecture: "React Client Application mapping to RESTful payload interfaces."
  }
};

export default function Projects() {
  const containerRef = useRef(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 relative min-h-screen overflow-hidden bg-transparent text-white"
    >
      {/* Animated Background Elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 left-0 w-full h-full z-0 opacity-30 pointer-events-none"
      >
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-pink-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[20%] left-[20%] w-[250px] h-[250px] bg-purple-600/20 rounded-full blur-[100px]"></div>
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
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
              Projects
            </h2>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="h-full"
            >
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.04}
                transitionSpeed={1000}
                className="h-full"
              >
                <div 
                   className="group relative h-full flex flex-col rounded-3xl bg-[#0a0a0d]/80 backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.3)] hover:border-pink-500/30"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Neon Glow Effect on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(10px)" }}>
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-sm opacity-20"></div>
                  </div>

                  {/* Image/Thumbnail Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#111]" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                    <img
                      src={
                        project.image ||
                        `https://picsum.photos/seed/${project.id * 8}/800/500`
                      }
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Dark Overlay that fades on hover */}
                    <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/10"></div>

                    {/* Hover Buttons Overlay */}
                    <div 
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-20 bg-black/50 backdrop-blur-[3px]"
                      style={{ transform: "translateZ(50px)" }}
                    >
                      {project.demo && project.demo !== "#" && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 w-40 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full border border-white/20 transition-all hover:scale-105"
                        >
                          <ExternalLink size={14} />
                          <span className="text-xs font-medium">Live Demo</span>
                        </a>
                      )}
                      <a
                        href={project.github || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-40 py-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white rounded-full border border-white/20 transition-all hover:scale-105"
                      >
                        <Github size={14} />
                        <span className="text-xs font-medium">GitHub Code</span>
                      </a>
                      <button
                        onClick={() => setActiveCaseStudy(project)}
                        className="flex items-center justify-center gap-2 w-40 py-2 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-full transition-all hover:scale-105 cursor-pointer shadow-lg shadow-pink-500/20 animate-none"
                      >
                        <span className="text-xs font-semibold">View Case Study</span>
                      </button>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div 
                    className="flex flex-col flex-grow p-6 md:p-8 relative z-10 bg-gradient-to-b from-transparent to-[#050505]/80"
                    style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
                  >
                    <h3 
                      className="text-2xl font-bold text-gray-100 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-pink-400 transition-all duration-300"
                      style={{ transform: "translateZ(40px)" }}
                    >
                      {project.name}
                    </h3>

                    <p 
                      className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-2"
                      style={{ transform: "translateZ(25px)" }}
                    >
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div 
                      className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2"
                      style={{ transform: "translateZ(35px)" }}
                    >
                      {project.tools?.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-[11px] md:text-xs font-semibold tracking-wide text-indigo-300 bg-indigo-500/10 rounded-full border border-indigo-500/20 uppercase"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Overlay */}
      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl bg-[#0b0c16]/95 border border-white/10 rounded-3xl p-6 md:p-8 relative shadow-2xl overflow-y-auto max-h-[85vh] text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCaseStudy(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg p-2 transition-colors cursor-pointer"
              >
                ✕
              </button>

              <span className="text-[10px] font-semibold text-pink-500 tracking-widest uppercase block mb-1">
                {activeCaseStudy.role}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-6">
                {activeCaseStudy.name}
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">Project Brief</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{activeCaseStudy.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">Technical Challenges</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {projectCaseStudies[activeCaseStudy.id]?.challenges || "Configuring clean state routing, handling edge data errors, and optimizing page load sizes for fast mobile execution."}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-2">Architecture & Stack</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {projectCaseStudies[activeCaseStudy.id]?.architecture || "React hooks architecture connected to a modular UI layer with client-side routing."}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-3">Key Features Implemented</h4>
                  <div className="flex flex-wrap gap-2">
                    {(projectCaseStudies[activeCaseStudy.id]?.features || ["Responsive Grid Layout", "Asynchronous Operations", "UI Animations"]).map((f, i) => (
                      <span key={i} className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 text-pink-300 rounded-full text-xs font-medium uppercase">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
