import { FaMicrochip, FaMemory, FaHdd, FaDesktop, FaMouse, FaKeyboard, FaLaptopCode, FaHeadphones } from "react-icons/fa";

// Professional Custom Divider Component
export const SectionDivider = ({ icon: Icon, title }) => (
  <div className="w-full flex items-center justify-center py-12 opacity-80">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    <div className="mx-6 px-6 py-2 rounded-full border border-cyan-500/20 bg-slate-900/50 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center gap-3">
      {Icon && <Icon className="text-cyan-400 w-5 h-5" />}
      <span className="text-sm font-semibold tracking-widest text-gray-300 uppercase">{title}</span>
    </div>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
  </div>
);
