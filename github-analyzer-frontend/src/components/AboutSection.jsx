import { motion } from "framer-motion";
import { Link2, ShieldAlert, Sparkles, Terminal, FileCode, Play } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Link Repository",
    description: "Provide any public GitHub URL. No login details, API permissions or tokens are needed to audit public repositories.",
    icon: Link2,
    iconColor: "text-blue-500",
    bgClass: "bg-blue-500/10 dark:bg-blue-500/5 border-blue-500/20"
  },
  {
    number: "02",
    title: "AI Development Scrutiny",
    description: "Our backend runs statistical checks, tracking commit histories, folder groupings, and code templates to identify mass bulk-uploads.",
    icon: ShieldAlert,
    iconColor: "text-amber-500",
    bgClass: "bg-amber-500/10 dark:bg-amber-500/5 border-amber-500/20"
  },
  {
    number: "03",
    title: "Gain Verification Certificate",
    description: "Access instant authenticity diagnostics, a quality score out of 100%, timeline graphs, and suggestions to enrich depth.",
    icon: Sparkles,
    iconColor: "text-purple-500",
    bgClass: "bg-purple-500/10 dark:bg-purple-500/5 border-purple-500/20"
  }
];

function AboutSection() {
  return (
    <div id="about" className="py-20 bg-slate-50/50 dark:bg-slate-950/10 border-y border-slate-200/50 dark:border-slate-900/60 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-bg glow-purple opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight"
          >
            How GitHub Analyzer Works 🛠️
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            By combining standard repository webhooks scraping with smart code profiling heuristics, we generate credibility insights in under 3 seconds.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Timeline Cards */}
          <div className="lg:col-span-6 space-y-8 relative">
            
            {/* Connection Line */}
            <div className="absolute left-[29px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-amber-500 to-purple-500 opacity-20 dark:opacity-10 hidden sm:block" />

            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group"
                >
                  {/* Step Icon Indicator */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl border ${step.bgClass} flex items-center justify-center relative z-10 shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className={`w-6 h-6 ${step.iconColor}`} />
                    <span className="absolute -top-2.5 -right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shadow-sm font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white font-mono group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Code/VSCode Graphic Mockup */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-[#0f141f] shadow-2xl relative overflow-hidden"
            >
              {/* VSCode-style Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a0d16] border-b border-slate-800/80">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold font-mono">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>analysis-engine.js</span>
                </div>
                <div className="w-10" />
              </div>

              {/* Code/Terminal Content */}
              <div className="p-6 font-mono text-xs sm:text-sm text-slate-350 leading-relaxed overflow-x-auto">
                <div className="text-slate-500">// Initialize git repository quality inspector</div>
                <div>
                  <span className="text-pink-500">const</span> <span className="text-blue-400">verifyRepo</span> = <span className="text-pink-500">async</span> (url) =&gt; &#123;
                </div>
                <div className="pl-4">
                  <span className="text-pink-500">const</span> stats = <span className="text-pink-500">await</span> fetchGitHubData(url);
                </div>
                <div className="pl-4 text-emerald-500">
                  <span className="text-pink-500">const</span> score = calcQualityScore(&#123;
                </div>
                <div className="pl-8 text-emerald-500">
                  commits: stats.totalCommits,
                </div>
                <div className="pl-8 text-emerald-500">
                  activeDays: stats.activeDays,
                </div>
                <div className="pl-8 text-emerald-500">
                  files: stats.fileCount
                </div>
                <div className="pl-4 text-emerald-500">&#125;);</div>
                
                <div className="pl-4 mt-3">
                  <span className="text-pink-500">if</span> (score &gt; <span className="text-purple-400">75</span>) &#123;
                </div>
                <div className="pl-8 text-indigo-400">
                  <span className="text-pink-500">return</span> &#123; status: <span className="text-teal-400">"Highly Authentic"</span>, score &#125;;
                </div>
                <div className="pl-4">&#125; <span className="text-pink-500">else</span> &#123;</div>
                <div className="pl-8 text-indigo-400">
                  <span className="text-pink-500">return</span> evaluateAnomalies(stats);
                </div>
                <div className="pl-4">&#125;</div>
                <div>&#125;;</div>

                <div className="mt-6 flex items-center justify-between p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-slate-400">Engine active: ready for scanning</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-500">
                    <span>Run code</span>
                    <Play className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AboutSection;
