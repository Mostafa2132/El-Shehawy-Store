"use client";

import { FiAlertCircle, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SimpleErorr({ error }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6"
      >
        <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <FiAlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-300">{error}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300"
          >
            <FiX className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
