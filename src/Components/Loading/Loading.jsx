import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";
export default function Loading() {
  return (
    <div className="flex items-center justify-center py-32">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <FiLoader className="w-12 h-12 text-cyan-400" />
      </motion.div>
    </div>
  );
}
