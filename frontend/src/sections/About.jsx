import profileImg from "../assets/profile.jpeg";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function About() {
  return (
    <section id="about" className="py-20 relative border-t border-gray-800">
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
            About Me
          </h2>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tilt
            tiltMaxAngleX={4}
            tiltMaxAngleY={4}
            perspective={1000}
            scale={1.01}
            transitionSpeed={800}
          >
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.15)] transition-all duration-500 cursor-pointer">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-400 text-transparent bg-clip-text tracking-wide uppercase">
                Who I Am?
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg font-light">
                My name is <span className="text-white font-semibold underline decoration-pink-500 decoration-2">Himanshu Pokhriyal</span>. 
                My <span className="text-pink-400 font-medium">passion for web development</span> is the driving force behind everything I do. 
                I'm endlessly enthusiastic about exploring new technologies and crafting innovative web solutions. 
                I believe in the power of <span className="text-[#16f2b3] font-medium">continuous learning</span>, and I'm committed to putting in the practice needed to master my craft. 
                I strive to bring creativity to every project, thinking outside the box to deliver <span className="text-violet-400 font-medium">exceptional results</span>.
              </p>
            </div>
          </Tilt>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center md:justify-end w-full"
        >
          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            perspective={1000}
            scale={1.04}
            transitionSpeed={1000}
            className="w-full max-w-sm"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div 
              style={{ transformStyle: "preserve-3d" }}
              className="w-full h-auto relative group flex justify-center cursor-pointer"
            >
              <div 
                style={{ transform: "translateZ(-15px)" }}
                className="absolute inset-0 bg-gradient-to-br from-pink-500 to-violet-600 rounded-2xl transform rotate-3 scale-105 opacity-60 group-hover:rotate-6 group-hover:opacity-80 transition-all duration-300"
              />
              <img 
                src={profileImg} 
                alt="Profile" 
                style={{ transform: "translateZ(30px)" }}
                className="relative rounded-2xl w-full h-full object-cover border-2 border-gray-800 shadow-2xl filter contrast-125 transition-all duration-500 bg-[#0d1224]"
              />
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}
