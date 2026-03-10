export default function CategorySkeleton() {
  return (
    <div className="w-full py-8 overflow-hidden">
      <div className="flex gap-6 animate-pulse px-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-none w-64 h-80 bg-slate-800/50 rounded-xl border border-slate-700/50 relative overflow-hidden">
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            
            {/* Image Placeholder */}
            <div className="w-full h-48 bg-slate-700/50 rounded-t-xl"></div>
            
            {/* Content Placeholders */}
            <div className="p-4 space-y-3">
              <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
              <div className="h-4 bg-slate-700/50 rounded w-1/2"></div>
              <div className="pt-2 flex justify-between items-center">
                <div className="h-6 bg-slate-700/50 rounded w-1/3"></div>
                <div className="h-8 w-8 bg-slate-700/50 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
