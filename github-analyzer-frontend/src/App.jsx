import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, History, Search, AlertTriangle, Info, CheckCircle, ShieldAlert, Sparkle, X } from "lucide-react";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import Loader from "./components/Loader";
import ResultsDashboard from "./components/ResultsDashboard";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 AUTH STATE
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  // 🎨 THEME STATE
  const [theme, setTheme] = useState("dark");

  // 🔔 TOAST STATE (Custom high-fidelity notifications)
  const [toasts, setToasts] = useState([]);

  // 🧠 FLOATING AI ASSISTANT PANEL STATE
  const [isAssistantVisible, setIsAssistantVisible] = useState(true);
  const [assistantMessage, setAssistantMessage] = useState("");

  // Ref for auto-scrolling to results
  const resultsRef = useRef(null);

  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ✅ Initialize theme and auth from localStorage
  useEffect(() => {
    // Load user
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load theme
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Update Floating Assistant Message based on app state
  useEffect(() => {
    if (loading) {
      setAssistantMessage("⚡ AI is actively analyzing repository patterns. Scrutinizing commit distribution ratios...");
    } else if (result && result.data) {
      const score = result.data.score || 0;
      const isSuspicious = result.meta?.authenticity?.toLowerCase().includes("suspicious");
      if (isSuspicious) {
        setAssistantMessage("⚠️ Warning: Possible template reuse or bulk upload detected. Commit history spans very few active days.");
      } else if (score >= 75) {
        setAssistantMessage("🌟 Audit complete! This repository is highly maintained and exhibits excellent developmental consistency. Perfect for portfolio display!");
      } else {
        setAssistantMessage("💡 Tip: Repository quality is intermediate. Increasing commit frequency and structuring modular folders will improve the credibility index.");
      }
    } else {
      setAssistantMessage("👋 Hello! Paste any public GitHub repository link above. Our AI scraper will audit commit activity and authenticate codebases instantly.");
    }
  }, [loading, result]);

  // Smooth scroll to results when audit completes
  useEffect(() => {
    if (result && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [result]);

  const handleToggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      addToast("Switched to Cyber Dark mode 🌙", "info");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      addToast("Switched to clean Light mode ☀️", "info");
    }
  };

  // ⭐ SAVE RECENT SEARCHES
  const saveRecent = (url) => {
    const prev = JSON.parse(localStorage.getItem("recent")) || [];
    const updated = [url, ...prev.filter((r) => r !== url)].slice(0, 4);
    localStorage.setItem("recent", JSON.stringify(updated));
  };

  const getRecent = () => {
    return JSON.parse(localStorage.getItem("recent")) || [];
  };

  const handleAnalyze = async () => {
    console.log("Analyze clicked", { repoUrl, user });

    if (!repoUrl) {
      addToast("Please enter a valid GitHub repository URL!", "warning");
      return;
    }

    // 🔐 Require login
    if (!user) {
      addToast("Authentication required! Please sign in with Google.", "warning");
      setShowAuth(true);
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const token = localStorage.getItem("token");
      const API = import.meta.env.VITE_API_URL;

      addToast("Connecting to analytical server... 🚀", "info");

      const res = await axios.post(
        `${API}/api/analyze`,
        { repoUrl },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setResult(res.data);
      saveRecent(repoUrl);
      addToast("Audit successfully compiled! Check findings below. 🏆", "success");

    } catch (err) {
      console.error(err);
      addToast("Error auditing repo. Please check the URL/API.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("recent");
    setUser(null);
    setResult(null);
    setRepoUrl("");
    addToast("Logged out successfully! See you soon.", "info");
  };

  const recentList = getRecent();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 relative">
      
      {/* Dynamic Cursor Glow Trailing Background overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-50 dark:opacity-75">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent blur-[120px]" />
        <div className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-pink-500/10 via-purple-500/5 to-transparent blur-[120px]" />
      </div>

      {/* 🔥 STICKY HEADER NAVBAR */}
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        theme={theme} 
        onToggleTheme={handleToggleTheme} 
        showAuthModal={() => setShowAuth(true)} 
      />

      {/* MAIN APPLICATION CONTAINER */}
      <main className="flex-grow z-10">
        
        {/* HERO HEADER FORM SECTION */}
        <HeroSection 
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
          handleAnalyze={handleAnalyze}
          loading={loading}
        />

        {/* ⭐ RECENT SEARCH CHIPS ROW */}
        {recentList.length > 0 && !result && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto px-4"
          >
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono flex items-center justify-center gap-1.5 mb-3">
              <History className="w-3.5 h-3.5 text-blue-500" />
              <span>Recent Enquiries</span>
            </p>

            <div className="flex justify-center gap-2 mt-2 flex-wrap">
              {recentList.map((r, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setRepoUrl(r);
                    addToast("Populated search box with query", "info");
                  }}
                  className="text-xs font-semibold font-mono px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:border-blue-500/30 dark:hover:border-blue-500/30 shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 animate-fade"
                >
                  <Search className="w-3 h-3 text-slate-400" />
                  <span>{r.replace("https://github.com/", "")}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ANALYZING SKELETON LOADER */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader />
            </motion.div>
          )}

          {/* DYNAMIC AUDIT SCOREBOARDS & SUGGESTIONS */}
          {result && result.data && !loading && (
            <div ref={resultsRef} className="scroll-mt-20">
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ResultsDashboard result={result} />
              </motion.div>
            </div>
          )}

          {/* BRAND VALUE GRID CARDS */}
          {!result && !loading && (
            <motion.div
              key="marketing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FeatureCards />
            </motion.div>
          )}
        </AnimatePresence>

        {/* WORKFLOW HOW-TO */}
        <AboutSection />

      </main>

      {/* PREMIUM HIGH-FIDELITY FOOTER */}
      <Footer />

      {/* 🔐 GOOGLE SIGN-IN POPUP MODAL */}
      <AnimatePresence>
        {showAuth && (
          <AuthModal
            onClose={() => {
              setShowAuth(false);
              addToast("Google authentication canceled", "warning");
            }}
            onSuccess={(userData) => {
              setUser(userData);
              setShowAuth(false);
              addToast(`Welcome back, ${userData.name}! 👋`, "success");
            }}
          />
        )}
      </AnimatePresence>

      {/* 🧠 FLOATING AI ASSISTANT PANEL */}
      <AnimatePresence>
        {isAssistantVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="fixed bottom-6 right-6 z-[9998] max-w-sm w-[90%] sm:w-80 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl backdrop-blur-md p-4 flex flex-col gap-3"
          >
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs uppercase tracking-wider font-mono">
                <Sparkles className="w-4.5 h-4.5 text-blue-500 animate-spin" />
                <span>AI Agent Advisor</span>
              </div>
              <button
                onClick={() => setIsAssistantVisible(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                aria-label="Close Assistant Panel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Message Body */}
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-350 leading-relaxed font-sans">
              {assistantMessage}
            </p>

            {/* Action link */}
            {!result && !loading && (
              <button
                onClick={() => {
                  setRepoUrl("https://github.com/facebook/react");
                  addToast("Shortcuts configured react repo", "info");
                }}
                className="w-full text-center py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-[10px] font-bold text-blue-600 dark:text-blue-400 transition-colors cursor-pointer"
              >
                Let's run facebook/react audit
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔔 FLOATING GLASSMORPHIC TOAST SYSTEM */}
      <div className="fixed bottom-6 left-6 sm:left-auto sm:right-6 z-[9999] flex flex-col gap-2.5 max-w-sm w-[90%] sm:w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 shadow-2xl backdrop-blur-md"
            >
              {/* Type-based customized icons */}
              {toast.type === "success" && (
                <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                  <CheckCircle className="w-4.5 h-4.5" />
                </div>
              )}
              {toast.type === "warning" && (
                <div className="p-1 rounded-lg bg-amber-500/10 text-amber-500 shrink-0">
                  <AlertTriangle className="w-4.5 h-4.5" />
                </div>
              )}
              {toast.type === "error" && (
                <div className="p-1 rounded-lg bg-red-500/10 text-red-500 shrink-0">
                  <ShieldAlert className="w-4.5 h-4.5" />
                </div>
              )}
              {toast.type === "info" && (
                <div className="p-1 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
                  <Info className="w-4.5 h-4.5" />
                </div>
              )}

              {/* Message */}
              <div className="flex-1 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                {toast.message}
              </div>

              {/* Toast close cross */}
              <button 
                onClick={() => removeToast(toast.id)} 
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-xs font-bold font-mono pl-1 cursor-pointer"
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default App;