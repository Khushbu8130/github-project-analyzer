import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 md:p-8 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/60 shadow-lg backdrop-blur-md">
      
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
        <div className="space-y-3 flex-1">
          {/* Repository title skeleton */}
          <div className="h-7 w-2/3 max-w-[280px] bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
          {/* Stars & Forks skeleton */}
          <div className="flex gap-3">
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
            <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Action badges skeletons */}
        <div className="flex gap-2">
          <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Main Analysis Body Skeletons */}
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        
        {/* Left Side: Score & Fake Probability Gauge */}
        <div className="md:col-span-1 space-y-6 flex flex-col items-center p-6 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900">
          {/* Circle score loader */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <div className="w-full h-full rounded-full border-8 border-slate-150 dark:border-slate-850 animate-pulse" />
            <div className="absolute w-28 h-28 rounded-full border-8 border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-1.5">
              <div className="h-5 w-10 bg-slate-350 dark:bg-slate-750 rounded animate-pulse" />
              <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            </div>
          </div>

          <div className="w-full space-y-2">
            <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md mx-auto animate-pulse" />
            <div className="h-3.5 w-3/4 bg-slate-150 dark:bg-slate-850 rounded-md mx-auto animate-pulse" />
          </div>
        </div>

        {/* Right Side: Recharts Metrics Skeletons */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="h-5 w-36 bg-slate-250 dark:bg-slate-750 rounded-md animate-pulse" />
            <div className="h-44 bg-slate-150 dark:bg-slate-850 rounded-xl animate-pulse flex items-end justify-between p-4 gap-3">
              <div className="h-1/3 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-t-lg animate-pulse" />
              <div className="h-3/4 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-t-lg animate-pulse" />
              <div className="h-1/2 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-t-lg animate-pulse" />
              <div className="h-2/3 w-1/4 bg-slate-200 dark:bg-slate-800 rounded-t-lg animate-pulse" />
            </div>
          </div>
        </div>

      </div>

      {/* Numerical Metrics Cards Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[1, 2, 3, 4].map((idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900 space-y-2.5">
            <div className="h-3.5 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-5 w-16 bg-slate-300 dark:bg-slate-700 rounded-md animate-pulse" />
          </div>
        ))}
      </div>

      {/* Suggestion list skeleton */}
      <div className="mt-8 p-5 rounded-xl bg-blue-50/5 dark:bg-blue-500/5 border border-blue-500/10 space-y-3">
        <div className="h-4.5 w-32 bg-blue-500/20 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-3.5 w-full bg-slate-150 dark:bg-slate-850 rounded animate-pulse" />
          <div className="h-3.5 w-5/6 bg-slate-150 dark:bg-slate-850 rounded animate-pulse" />
        </div>
      </div>

    </div>
  );
}

export default Loader;
