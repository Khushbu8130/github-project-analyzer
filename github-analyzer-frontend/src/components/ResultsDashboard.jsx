import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, Cell, CartesianGrid 
} from "recharts";
import { 
  Star, GitFork, AlertTriangle, CheckCircle, HelpCircle, 
  Calendar, Layers, FileText, BarChart3, TrendingUp, Sparkles, ShieldAlert 
} from "lucide-react";
import { normalize } from "../utils/normalize";

function ResultsDashboard({ result }) {
  const scoreRef = useRef(null);
  const data = result?.data || {};
  const meta = result?.meta || {};
  const score = data.score || 0;
  const authenticity = meta.authenticity || "Unknown Quality";
  const confidence = meta.confidence || "Low";

  // Trigger celebration confetti for high authenticity & score!
  useEffect(() => {
    if (score >= 60 && authenticity.toLowerCase().includes("authentic")) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // confettis from two corners
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [score, authenticity]);

  // SVG Gauge calculations
  const radius = 55;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Set color styling depending on the quality rating
  const getScoreColor = (scoreVal) => {
    if (scoreVal >= 75) return "text-emerald-500 stroke-emerald-500 bg-emerald-500/10";
    if (scoreVal >= 45) return "text-amber-500 stroke-amber-500 bg-amber-500/10";
    return "text-red-500 stroke-red-500 bg-red-500/10";
  };

  const getAuthenticityBadge = (authText) => {
    const text = authText.toLowerCase();
    if (text.includes("authentic")) {
      return {
        icon: CheckCircle,
        style: "bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/10",
        label: "Highly Authentic Project"
      };
    }
    if (text.includes("suspicious") || text.includes("bulk")) {
      return {
        icon: ShieldAlert,
        style: "bg-red-500/10 dark:bg-red-500/5 text-red-600 dark:text-red-400 border border-red-500/30 dark:border-red-500/10 animate-pulse",
        label: "Suspicious Bulk Upload"
      };
    }
    return {
      icon: AlertTriangle,
      style: "bg-amber-500/10 dark:bg-amber-500/5 text-amber-600 dark:text-amber-400 border border-amber-500/30 dark:border-amber-500/10",
      label: "Moderate Activity / Small Scale"
    };
  };

  const badge = getAuthenticityBadge(authenticity);
  const BadgeIcon = badge.icon;

  // Chart Data preparation
  const chartData = [
    { name: "Commits", value: normalize(meta.totalCommits || 0), raw: meta.totalCommits },
    { name: "Days", value: normalize(meta.activeDays || 0), raw: meta.activeDays },
    { name: "Files", value: normalize(meta.fileCount || 0), raw: meta.fileCount },
  ];

  const timelineData = meta.timeline || [];

  // Custom tooltips for clean styled details
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="p-3 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg backdrop-blur-md text-xs font-semibold">
          <p className="text-slate-500 dark:text-slate-400">{dataPoint.name}</p>
          <p className="text-slate-900 dark:text-white text-sm font-bold mt-0.5">{dataPoint.raw}</p>
        </div>
      );
    }
    return null;
  };

  const CustomLineTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg backdrop-blur-md text-xs font-semibold">
          <p className="text-slate-500 dark:text-slate-400">Date: {payload[0].payload.date}</p>
          <p className="text-blue-500 text-sm font-bold mt-0.5">Commits: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto mt-12 p-6 md:p-8 rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/60 shadow-xl backdrop-blur-md relative overflow-hidden"
    >
      {/* Glossy top lighting line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      {/* Dashboard Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pb-6 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="space-y-2">
          {/* Main Repo Heading */}
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
              {data.repoName}
            </h2>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${badge.style}`}>
              <BadgeIcon className="w-3.5 h-3.5" />
              <span>{badge.label}</span>
            </div>
          </div>

          {/* Stars & Forks indicators */}
          <div className="flex gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{data.stars?.toLocaleString()} stars</span>
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="w-4 h-4 text-blue-500" />
              <span>{data.forks?.toLocaleString()} forks</span>
            </span>
            <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200/55 dark:border-slate-800/80 uppercase">
              {data.level} Project
            </span>
          </div>
        </div>

        {/* Confidence indicators */}
        <div className="text-left md:text-right shrink-0">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">AI Confidence</p>
          <p className={`text-base font-bold flex items-center md:justify-end gap-1 ${
            confidence === "High" ? "text-emerald-500" : confidence === "Medium" ? "text-amber-500" : "text-red-500"
          }`}>
            <span>{confidence} Index</span>
          </p>
        </div>
      </div>

      {/* Main Panels Grid */}
      <div className="grid md:grid-cols-12 gap-8 mt-8">
        
        {/* Left column: Circular score indicator & Authenticity alert */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900/60 shadow-inner">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono mb-6">Credibility Score</h3>
          
          {/* SVG Score Ring */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              {/* Outer Track Ring */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-slate-200 dark:stroke-slate-800/80 fill-none"
                strokeWidth={strokeWidth}
              />
              {/* Animated Progress Ring */}
              <motion.circle
                cx="72"
                cy="72"
                r={radius}
                className={`fill-none ${getScoreColor(score).split(" ")[1]}`}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-3xl font-extrabold font-mono leading-none tracking-tighter ${getScoreColor(score).split(" ")[0]}`}>
                {score}%
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">
                AI Rating
              </span>
            </div>
          </div>

          <div className="w-full text-center mt-6 space-y-2">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Level: {data.level} Index
            </p>
            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-[200px] mx-auto">
              Rating computed dynamically based on commits distribution vs active workspace timelines.
            </p>
          </div>
        </div>

        {/* Right column: Interactive Recharts Metrics Panels */}
        <div className="md:col-span-8 flex flex-col justify-between space-y-6">
          
          {/* AI Structured summary */}
          {meta.summary && (
            <div className="p-4 rounded-xl bg-blue-500/5 border-l-4 border-blue-500 text-sm font-medium">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold mb-1">
                <Sparkles className="w-4.5 h-4.5" />
                <span>AI Automated Audit Summary</span>
              </div>
              <p className="text-slate-600 dark:text-slate-350 leading-relaxed text-xs sm:text-sm">
                {meta.summary}
              </p>
            </div>
          )}

          {/* Recharts - Normalized Metrics Bar Chart */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span>Project Structure Metrics</span>
            </h3>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} fontStyle="semibold" />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={45}>
                    {chartData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={
                          entry.name === "Commits"
                            ? "#3b82f6"
                            : entry.name === "Days"
                            ? "#a855f7"
                            : "#10b981"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              * Bars represent logarithmic normalizations of codebase files, active days, and commit totals for equal-weight comparisons.
            </p>
          </div>

        </div>

      </div>

      {/* Raw Metrics cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
        
        <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Commits</p>
            <p className="text-base font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">{meta.totalCommits}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Active Days</p>
            <p className="text-base font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">{meta.activeDays}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-sans">Total Files</p>
            <p className="text-base font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">{meta.fileCount}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Folders</p>
            <p className="text-base font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">{meta.folderCount}</p>
          </div>
        </div>

      </div>

      {/* Structured Commit Timeline chart */}
      {timelineData.length > 0 && (
        <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono flex items-center gap-1">
            <Calendar className="w-4.5 h-4.5 text-blue-500" />
            <span>Developer Commit Frequency Timeline</span>
          </h3>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={10} />
                <CartesianGrid strokeDasharray="3 3" opacity={0.08} />
                <Tooltip content={<CustomLineTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="commits" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorCommits)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Insights & Suggestions Panel */}
      <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
        
        {/* Insights list */}
        <div className="p-5 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900/60">
          <h3 className="font-bold text-sm font-mono text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>AI Discovered Strengths</span>
          </h3>
          <ul className="space-y-2">
            {data.insights?.map((i, idx) => (
              <li key={idx} className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                <span className="text-emerald-500 select-none mt-0.5">•</span>
                <span>{i}</span>
              </li>
            ))}
            {(!data.insights || data.insights.length === 0) && (
              <li className="text-xs text-slate-500 italic">No structured strengths found</li>
            )}
          </ul>
        </div>

        {/* Suggestions list */}
        <div className="p-5 rounded-xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900/60">
          <h3 className="font-bold text-sm font-mono text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-purple-500" />
            <span>AI Structural Recommendations</span>
          </h3>
          <ul className="space-y-2">
            {data.suggestions?.map((i, idx) => (
              <li key={idx} className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                <span className="text-purple-500 select-none mt-0.5">•</span>
                <span>{i}</span>
              </li>
            ))}
            {(!data.suggestions || data.suggestions.length === 0) && (
              <li className="text-xs text-slate-500 italic">No structural suggestions found</li>
            )}
          </ul>
        </div>

      </div>

    </motion.div>
  );
}

export default ResultsDashboard;
