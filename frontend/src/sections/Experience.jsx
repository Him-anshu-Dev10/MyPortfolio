import { BsPersonWorkspace } from "react-icons/bs";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import experienceImg from "../assets/developer.png";

export default function Experience() {
  const experiences = [
    {
      id: 1,
      title: "Freelance Web Developer",
      company: "Self Employed",
      duration: "Present",
    },
    {
      id: 2,
      title: "Front-end Developer (Internship)",
      company: "Self Employed",
      duration: "15 Jun 2026 - 15 Aug 2026",
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 relative border-t border-gray-800"
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
            Experiences
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left Side Visual - 3D Rotatable Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center w-full"
          style={{ perspective: 1200 }}
        >
          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            perspective={1000}
            scale={1.04}
            transitionSpeed={1000}
            className="w-full max-w-md"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div 
              style={{ transformStyle: "preserve-3d" }}
              className="relative rounded-2xl p-1 bg-gradient-to-br from-pink-500 to-violet-600 shadow-[0_0_50px_rgba(236,72,153,0.3)] cursor-pointer"
            >
              <div 
                style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} 
                className="bg-[#0b1021] w-full h-full rounded-2xl overflow-hidden shadow-2xl relative border border-white/5"
              >
                {/* Overlay glow/lighting */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10 block"></div>
                
                <img
                  src={experienceImg}
                  alt="3D Developer Setup"
                  style={{ transform: "scale(1.03) translateZ(40px)" }}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </Tilt>
        </motion.div>

        {/* Right Side Cards */}
        <div className="flex flex-col space-y-6">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: exp.id * 0.2 }}
              viewport={{ once: true }}
            >
              <Tilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1000}
                scale={1.02}
                transitionSpeed={800}
              >
                <div className="bg-[#11152c] rounded-xl p-6 border border-gray-800 relative group overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] transition-all duration-300">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-violet-500 opacity-50"></div>

                  <div className="text-center md:text-right text-[#16f2b3] text-sm mb-4">
                    {exp.duration}
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="bg-violet-900/40 p-4 rounded-xl text-violet-500 group-hover:scale-110 transition-transform">
                      <BsPersonWorkspace size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-pink-500 transition-colors uppercase">
                        {exp.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{exp.company}</p>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
