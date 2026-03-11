import Link from "next/link";
import { FiAlertTriangle } from "react-icons/fi";

export default function Error({error = "Product not found."}) {
  return (
     <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
          <FiAlertTriangle className="w-12 h-12 text-red-400 mx-auto" />
        </div>
        <h2 className="text-3xl font-black text-white">Oops!</h2>
        <p className="text-slate-400 max-w-sm">
          {error || "Product not found."}
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-cyan-500/25"
        >
          Back to Home
        </Link>
      </div>
  )
}
