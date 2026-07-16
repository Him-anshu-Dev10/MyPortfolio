import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-xl shadow-2xl ${
        isSuccess
          ? "bg-emerald-950/80 border-emerald-500/30 text-emerald-300"
          : "bg-rose-950/80 border-rose-500/30 text-rose-300"
      }`}
    >
      <div className="text-xl">
        {isSuccess ? <FaCheckCircle /> : <FaExclamationCircle />}
      </div>
      <div>
        <p className="text-sm font-semibold tracking-wide uppercase">
          {isSuccess ? "Success" : "Error"}
        </p>
        <p className="text-xs opacity-90 mt-0.5">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-xs opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
      >
        ✕
      </button>
    </motion.div>
  );
}
