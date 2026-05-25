import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Link2, Sparkles, Star, GitFork, AlertCircle, Info } from "lucide-react";

const SUGGESTIONS = [
  "facebook/react",
  "vercel/next.js",
  "tailwindlabs/tailwindcss",
  "Khushbu8130/github-project-analyzer"
];

function HeroSection({ repoUrl, setRepoUrl, handleAnalyze, loading }) {
  const [typingIndex, setTypingIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Dynamic Typing Effect
  useEffect(() => {
    let timer;
    const currentFull = SUGGESTIONS[typingIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && typedText === currentFull) {
      // Pause before deleting
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setTypingIndex((prev) => (prev + 1) % SUGGESTIONS.length);
    } else {
      timer = setTimeout(() => {
        setTypedText(
          isDeleting
            ? currentFull.substring(0, typedText.length - 1)
            : currentFull.substring(0, typedText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, typingIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAnalyze();
  };

  return (
    <div id="home" className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden flex flex-col items-center justify-center">
      
      {/* Dynamic Background Glowing Particles */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 glow-bg glow-blue opacity-25" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 glow-bg glow-purple opacity-20" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 glow-bg glow-pink opacity-25" />

      {/* Floating Small Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[15%] text-blue-500/30 dark:text-blue-500/10"
        >
          <Star className="w-10 h-10 fill-current" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-[15%] text-purple-500/30 dark:text-purple-500/10"
        >
          <GitFork className="w-12 h-12" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -12, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-[20%] text-pink-500/30 dark:text-pink-500/10"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        
        {/* Badge Intro */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/30 dark:border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New: Deep Commit Analysis Algorithm v9.0</span>
        </motion.div>

        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] font-mono"
        >
          Analyze GitHub Projects <br />
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
            with AI Insights 🚀
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Detect bulk-uploads and suspicious activity, evaluate repo structure depth, and gain real-time dev quality score analytics instantly.
        </motion.p>

        {/* Search / Input Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="relative flex items-center p-1.5 sm:p-2 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/15 shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 pl-3 flex-1">
              <Link2 className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
              <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="Paste GitHub Repository URL..."
                className="w-full bg-transparent border-0 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 py-2 sm:py-3 text-sm sm:text-base font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative overflow-hidden group px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 shrink-0 flex items-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 sm:w-5 h-5" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </form>

          {/* Typing Shortcut Container */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm font-medium">
            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              <span>Try typing:</span>
            </span>
            <div className="min-w-[120px] text-left">
              <button
                type="button"
                onClick={() => setRepoUrl(`https://github.com/${SUGGESTIONS[typingIndex]}`)}
                className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:underline font-mono font-semibold"
              >
                {typedText}
                <span className="animate-pulse">|</span>
              </button>
            </div>
            
            {/* Quick Badges */}
            <div className="flex gap-2 ml-2">
              {SUGGESTIONS.slice(0, 2).map((name) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => setRepoUrl(`https://github.com/${name}`)}
                  className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800 transition-colors text-[10px] sm:text-xs cursor-pointer font-mono"
                >
                  {name.split("/")[1]}
                </button>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
}

export default HeroSection;
