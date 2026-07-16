import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Toast from "../components/Toast";

// To receive submissions directly in your email (himutech10@gmail.com):
// 1. Get your free Access Key at: https://web3forms.com/
// 2. Paste your Access Key below, replacing "YOUR_ACCESS_KEY_HERE"
const WEB3FORMS_ACCESS_KEY = "b53e1b23-1519-4ddd-8a7c-7eda9bcee90a";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast({ visible: false, message: "", type: "success" });

    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY) {
      setToast({
        visible: true,
        message: "Please configure your Web3Forms Access Key at the top of Contact.jsx.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          access_key: WEB3FORMS_ACCESS_KEY,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setToast({
          visible: true,
          message: "Your message has been received! I'll contact you shortly.",
          type: "success",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setToast({
          visible: true,
          message: data.message || "Failed to send message. Please try again later.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setToast({
        visible: true,
        message: "Unable to connect to the mailing server. Please check your connection.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-gray-800 relative">
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
            Contact With Me
          </h2>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-12 justify-between">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <p className="text-gray-400 mb-8">
            If you have any questions or concerns, please don't hesitate to
            contact me. I am open to any work opportunities that align with my
            skills and interests.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Your Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 bg-[#11152c] border border-gray-700 rounded-md text-white focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Your Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 bg-[#11152c] border border-gray-700 rounded-md text-white focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Your Message:
              </label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 bg-[#11152c] border border-gray-700 rounded-md text-white focus:outline-none focus:border-pink-500"
              ></textarea>
            </div>
            <button
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full font-semibold hover:scale-105 transition-transform flex items-center disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:w-5/12 flex flex-col justify-center space-y-6"
        >
          <div className="flex items-center space-x-4 group">
            <span className="bg-[#11152c] p-3 rounded-full group-hover:bg-pink-500 transition-colors">
              <MdEmail className="text-2xl" />
            </span>
            <span className="text-gray-300 group-hover:text-white transition-colors">
              himutech10@gmail.com
            </span>
          </div>
          <div className="flex items-center space-x-4 group">
            <span className="bg-[#11152c] p-3 rounded-full group-hover:bg-violet-500 transition-colors">
              <MdPhone className="text-2xl" />
            </span>
            <span className="text-gray-300 group-hover:text-white transition-colors">
              +91 8868075145
            </span>
          </div>
          <div className="flex items-center space-x-4 group">
            <span className="bg-[#11152c] p-3 rounded-full group-hover:bg-pink-500 transition-colors">
              <MdLocationOn className="text-2xl" />
            </span>
            <span className="text-gray-300 group-hover:text-white transition-colors">
              India
            </span>
          </div>

          <div className="flex space-x-4 mt-8">
            <a
              href="https://github.com/Him-anshu-Dev10"
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-pink-500 to-violet-600 p-3 rounded-full hover:scale-110 transition-transform"
            >
              <FaGithub className="text-xl text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/himanshu-pokhriyal-988b5b252"
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-pink-500 to-violet-600 p-3 rounded-full hover:scale-110 transition-transform"
            >
              <FaLinkedin className="text-xl text-white" />
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-pink-500 to-violet-600 p-3 rounded-full hover:scale-110 transition-transform"
            >
              <FaTwitter className="text-xl text-white" />
            </a>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toast.visible && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, visible: false })}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
