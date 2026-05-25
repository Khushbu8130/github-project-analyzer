import { motion } from "framer-motion";
import { ShieldCheck, BrainCircuit, BarChart3, ChevronRight } from "lucide-react";

const FEATURES = [
  {
    title: "Authenticity Detection",
    description: "Identify fake, plagiarized, or mass-bulk uploaded template projects instantly. Scan distributions of commits and folder setups.",
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    glowColor: "group-hover:shadow-emerald-500/10"
  },
  {
    title: "AI Quality Insights",
    description: "Understand codebase modularity, architecture depth, frontend-backend split configurations, and receive developer credibility scoring.",
    icon: BrainCircuit,
    color: "from-purple-500 to-indigo-500",
    bgLight: "bg-purple-500/5 border-purple-500/20 text-purple-600 dark:text-purple-400",
    glowColor: "group-hover:shadow-purple-500/10"
  },
  {
    title: "Visual Development Analytics",
    description: "Analyze interactive charts detailing active days ratios, commit timelines, and repository structures in high-fidelity Recharts visual boards.",
    icon: BarChart3,
    color: "from-blue-500 to-sky-500",
    bgLight: "bg-blue-500/5 border-blue-500/20 text-blue-600 dark:text-blue-400",
    glowColor: "group-hover:shadow-blue-500/10"
  }
];

function FeatureCards() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div id="features" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 relative">
      
      {/* Small Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
          Engineered for Deep Verification ⚡
        </h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Powering developers, recruiters, and open-source audit logs with high-fidelity analytical indexes.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-3 gap-6 lg:gap-8"
      >
        {FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)"
              }}
              className={`group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-md shadow-sm ${feat.glowColor}`}
            >
              {/* Dynamic Gradient Top Shimmer */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r opacity-50 dark:opacity-80 from-transparent via-blue-500/20 to-transparent group-hover:via-purple-500 transition-all duration-500" />
              
              <div>
                {/* Icon wrapper */}
                <div className={`inline-flex p-3 rounded-xl border ${feat.bgLight} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 animate-pulse" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-950 dark:text-white font-mono flex items-center gap-1.5 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>

              {/* Extra CTA Link indicator */}
              <div className="mt-8 flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                <span>Learn how it analyzes</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default FeatureCards;