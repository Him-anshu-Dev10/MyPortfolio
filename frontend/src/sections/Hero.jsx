import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function Hero() {
  return (
    <section
      id="home"
      className="py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between min-h-screen relative max-w-7xl mx-auto"
    >
      {/* Left Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-left w-full lg:w-1/2 z-10 px-4"
      >
        <Tilt
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          perspective={2000}
          scale={1.0}
          transitionSpeed={1200}
          className="w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div style={{ transformStyle: "preserve-3d" }}>
            <h1 
              className="text-3xl md:text-3xl lg:text-6xl font-bold mb-6 text-white leading-tight"
              style={{ transform: "translateZ(50px)" }}
            >
              Hello, <br />
              This is <span className="text-pink-500">HIMANSHU POKHRIYAL</span> ,
              I'm a <br />
              <span className="text-[#58e1b8]">Web Developer.</span>
            </h1>

            {/* Social Icons */}
            <div 
              className="flex space-x-4 mb-8"
              style={{ transform: "translateZ(30px)" }}
            >
              <a
                href="https://github.com/Him-anshu-Dev10"
                target="_blank"
                rel="noreferrer"
                className="text-pink-500 hover:text-[#16f2b3] transition-colors cursor-pointer text-2xl lg:text-3xl"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/himanshu-pokhriyal-988b5b252"
                target="_blank"
                rel="noreferrer"
                className="text-pink-500 hover:text-[#16f2b3] transition-colors cursor-pointer text-2xl lg:text-3xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.facebook.com/share/19AxENhWES/"
                target="_blank"
                rel="noreferrer"
                className="text-pink-500 hover:text-[#16f2b3] transition-colors cursor-pointer text-2xl lg:text-3xl"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-pink-500 hover:text-[#16f2b3] transition-colors cursor-pointer text-2xl lg:text-3xl"
              >
                <FaTwitter />
              </a>
            </div>

            {/* Buttons */}
            <div 
              className="flex flex-wrap gap-4"
              style={{ transform: "translateZ(40px)" }}
            >
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 lg:px-8 py-3 border border-pink-500 rounded-full text-white font-semibold text-xs lg:text-sm hover:bg-pink-500/10 transition-colors tracking-wider"
              >
                <span>CONTACT ME</span>
                <RiContactsFill className="text-lg" />
              </a>
              <a
                href="https://my-portfolio-lyart-three-83.vercel.app/cv.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 lg:px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full text-white font-semibold text-xs lg:text-sm hover:scale-105 transition-transform tracking-wider"
              >
                <span>GET RESUME</span>
                <MdDownload className="text-lg" />
              </a>
            </div>
          </div>
        </Tilt>
      </motion.div>

      {/* Right Code Snippet Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-16 lg:mt-0 w-full lg:w-1/2 max-w-2xl relative lg:ml-10"
      >
        <Tilt
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          perspective={1000}
          scale={1.01}
          transitionSpeed={1200}
          className="bg-[#080b16] border border-[#1b2c68a0] rounded-lg shadow-[0_0_50px_-12px_rgba(236,72,153,0.3)] overflow-hidden"
        >
          {/* Window Bar */}
          <div className="flex border-b border-[#1b2c68a0] px-4 py-3 bg-[#0a0d1a]">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
          </div>

          {/* Code Content */}
          <div className="p-4 lg:p-8 overflow-x-auto text-[13px] sm:text-sm lg:text-[15px] font-mono text-gray-300">
            <div className="flex flex-col space-y-1">
              <div className="whitespace-nowrap">
                <span className="text-pink-500">const</span>{" "}
                <span className="text-white">coder</span>{" "}
                <span className="text-pink-500">=</span>{" "}
                <span className="text-white">{"{"}</span>
              </div>
              <div className="pl-6 whitespace-nowrap">
                <span className="text-[#a9b2c3]">name:</span>{" "}
                <span className="text-yellow-300">'Himanshu Pokhriyal'</span>
                <span className="text-white">,</span>
              </div>
              <div className="pl-6 whitespace-nowrap flex">
                <span className="text-[#a9b2c3] mr-2">skills:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="text-white">[</span>
                  <span className="text-yellow-300">'React.js'</span>
                  <span className="text-white">,</span>
                  <span className="text-yellow-300">'JavaScript'</span>
                  <span className="text-white">,</span>
                  <span className="text-yellow-300">'HTML'</span>
                  <span className="text-white">,</span>
                </div>
              </div>
              <div className="pl-24 whitespace-nowrap flex flex-wrap gap-1">
                <span className="text-yellow-300">'CSS'</span>
                <span className="text-white">,</span>
                <span className="text-yellow-300">'Tailwind'</span>
                <span className="text-white">,</span>
                <span className="text-yellow-300">'SQL'</span>
                <span className="text-white">,</span>
                <span className="text-yellow-300">'DSA'</span>
                <span className="text-white">],</span>
              </div>

              <div className="pl-6 whitespace-nowrap">
                <span className="text-[#a9b2c3]">hardWorker:</span>{" "}
                <span className="text-orange-400">true</span>
                <span className="text-white">,</span>
              </div>
              <div className="pl-6 whitespace-nowrap">
                <span className="text-[#a9b2c3]">quickLearner:</span>{" "}
                <span className="text-orange-400">true</span>
                <span className="text-white">,</span>
              </div>
              <div className="pl-6 whitespace-nowrap">
                <span className="text-[#a9b2c3]">problemSolver:</span>{" "}
                <span className="text-orange-400">true</span>
                <span className="text-white">,</span>
              </div>
              <div className="pl-6 whitespace-nowrap">
                <span className="text-[#16f2b3]">hireable:</span>{" "}
                <span className="text-orange-400">function</span>
                <span className="text-white">() {"{"}</span>
              </div>
              <div className="pl-12 whitespace-nowrap">
                <span className="text-orange-400">return</span>{" "}
                <span className="text-white">(</span>
              </div>
              <div className="pl-16 whitespace-nowrap flex items-center gap-2">
                <div>
                  <span className="text-cyan-400">this.</span>
                  <span className="text-white">hardWorker</span>
                </div>{" "}
                <span className="text-orange-400">&&</span>
              </div>
              <div className="pl-16 whitespace-nowrap flex items-center gap-2">
                <div>
                  <span className="text-cyan-400">this.</span>
                  <span className="text-white">problemSolver</span>
                </div>{" "}
                <span className="text-orange-400">&&</span>
              </div>
              <div className="pl-16 whitespace-nowrap flex items-center gap-2">
                <div>
                  <span className="text-cyan-400">this.</span>
                  <span className="text-white">skills.length</span>
                </div>{" "}
                <span className="text-orange-400">{">="}</span>{" "}
                <span className="text-orange-400">5</span>
              </div>
              <div className="pl-12 whitespace-nowrap">
                <span className="text-white">);</span>
              </div>
              <div className="pl-6 whitespace-nowrap">
                <span className="text-white">{"}"}</span>
              </div>
              <div className="whitespace-nowrap">
                <span className="text-white">{"};"}</span>
              </div>
            </div>
          </div>
        </Tilt>
      </motion.div>
    </section>
  );
}
