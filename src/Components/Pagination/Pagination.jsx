"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ totalPages, page, setPage }) {
 


 if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2 flex-wrap mt-8"
    >
      {/* Previous Button */}
      {page > 1 && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded-lg bg-slate-800/50 text-gray-300 hover:bg-slate-800 border border-purple-500/20 transition-all duration-300 font-semibold flex items-center gap-1"
        >
          <FiChevronLeft className="w-5 h-5" />
          Previous
        </motion.button>
      )}

      {/* Page Numbers - Show all pages if <= 12 */}
      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;

        // إذا كان عدد الصفحات <= 12، عرض جميع الصفحات
        if (totalPages <= 12) {
          return (
            <motion.button
              key={pageNum}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage(pageNum)}
              className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                page === pageNum
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                  : "bg-slate-800/50 text-gray-300 hover:bg-slate-800 border border-purple-500/20"
              }`}
            >
              {pageNum}
            </motion.button>
          );
        }

        // إذا كان عدد الصفحات > 12، عرض صفحات ذكية
        // عرض: الأولى، الأخيرة، والقريبة من الحالية
        if (
          pageNum === 1 || // الصفحة الأولى
          pageNum === totalPages || // الصفحة الأخيرة
          (pageNum >= page - 2 && pageNum <= page + 2) // الصفحات القريبة من الحالية
        ) {
          return (
            <motion.button
              key={pageNum}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage(pageNum)}
              className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                page === pageNum
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50"
                  : "bg-slate-800/50 text-gray-300 hover:bg-slate-800 border border-purple-500/20"
              }`}
            >
              {pageNum}
            </motion.button>
          );
        }

        // عرض نقاط فارغة بين الأرقام
        if (
          (pageNum === 2 && page > 4) ||
          (pageNum === totalPages - 1 && page < totalPages - 3)
        ) {
          return (
            <span key={`ellipsis-${pageNum}`} className="text-gray-400 px-2">
              ...
            </span>
          );
        }

        return null;
      })}

      {/* Next Button */}
      {page < totalPages && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-lg bg-slate-800/50 text-gray-300 hover:bg-slate-800 border border-purple-500/20 transition-all duration-300 font-semibold flex items-center gap-1"
        >
          Next
          <FiChevronRight className="w-5 h-5" />
        </motion.button>
      )}
    </motion.div>
  );
}
