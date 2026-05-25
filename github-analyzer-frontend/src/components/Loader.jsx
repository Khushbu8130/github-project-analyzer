import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CircleDot, Loader2, Sparkles, Database, Terminal, ShieldAlert } from "lucide-react";

const LOADING_STEPS = [
  { id: 1, text: "Connecting to GitHub API & scraping metadata...", duration: 1200, icon: Database },
  { id: 2, text: "Scanning commit frequencies & author distributions...", duration: 1500, icon: Terminal },
  { id: 3, text: "Evaluating directory trees & framework layouts...", duration: 1200, icon: CircleDot },
  { id: 4, text: "Applying AI heuristics & compiling credibility certificate...", duration: 1000, icon: Sparkles }
];

function Loader() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep < LOADING_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, LOADING_STEPS[activeStep].duration);
      return () => clearTimeout(timer);
    }
  }, [activeStep]);

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6 md:p-8 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/60 shadow-xl backdrop-blur-md relative overflow-hidden">
      {/* Glow highlight line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse" />

      {/* AI Progressive Audit Hub */}
      <div className="p-6 rounded-xl bg-slate-900/50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-850/80 mb-8 shadow-inner">
        <div className="flex items-center gap-2 mb-6 text-slate-800 dark:text-slate-100">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
          <h3 className="text-sm font-extrabold font-mono uppercase tracking-widest text-slate-900 dark:text-white">
            AI Scrutiny Pipeline Active
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {LOADING_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isCompleted = activeStep > idx;
            const isActive = activeStep === idx;
            const isPending = activeStep < idx;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "bg-blue-500/5 border-blue-500/30 text-blue-600 dark:text-blue-400 shadow-md shadow-blue-500/5"
                    : isCompleted
                    ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-500"
                    : "bg-slate-50/50 dark:bg-slate-900/20 border-slate-150 dark:border-slate-900/50 text-slate-400 dark:text-slate-600"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : isActive ? (
                    <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  ) : (
                    <StepIcon className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold font-mono tracking-tight flex items-center gap-1.5">
                    <span>STEP {step.id}</span>
                    {isActive && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-blue-500/10 text-blue-500 rounded border border-blue-500/20 uppercase tracking-widest animate-pulse font-sans">
                        Auditing
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20 uppercase tracking-widest font-sans">
                        Done
                      </span>
                    )}
                  </p>
                  <p className="text-xs font-semibold leading-relaxed font-sans">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pulsing Dashboard Skeleton Overlay */}
      <div className="space-y-6 opacity-30 select-none pointer-events-none">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/50 dark:border-slate-800/65">
          <div className="space-y-3 flex-1">
            <div className="h-7 w-2/3 bg-slate-300 dark:bg-slate-800 rounded-lg" />
            <div className="flex gap-3">
              <div className="h-4 w-16 bg-slate-350 dark:bg-slate-800 rounded-md" />
              <div className="h-4 w-16 bg-slate-350 dark:bg-slate-800 rounded-md" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-24 bg-slate-300 dark:bg-slate-800 rounded-full" />
          </div>
        </div>

        {/* Main Analysis Body Skeletons */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6 flex flex-col items-center p-6 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <div className="w-full h-full rounded-full border-8 border-slate-300 dark:border-slate-850" />
            </div>
            <div className="w-full space-y-2">
              <div className="h-4 w-1/2 bg-slate-300 dark:bg-slate-850 rounded mx-auto" />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="h-44 bg-slate-200 dark:bg-slate-850 rounded-xl flex items-end justify-between p-4 gap-3">
              <div className="h-1/3 w-1/4 bg-slate-300 dark:bg-slate-800 rounded-t-lg" />
              <div className="h-3/4 w-1/4 bg-slate-300 dark:bg-slate-800 rounded-t-lg" />
              <div className="h-1/2 w-1/4 bg-slate-300 dark:bg-slate-800 rounded-t-lg" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Loader;
