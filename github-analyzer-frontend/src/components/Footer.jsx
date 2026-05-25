import { useState } from "react";
import { Globe, Send, Rocket, Heart } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer id="contact" className="relative bg-slate-950 border-t border-slate-900 pt-16 pb-8 overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 glow-bg glow-purple opacity-[0.04] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-72 h-72 glow-bg glow-blue opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold font-mono bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              <Rocket className="w-5 h-5 text-purple-400" />
              <span>GitHub Analyzer</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering developers, managers, and open-source contributors with automated code behavior tracking and credibility verification diagnostics.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3.5 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-900 hover:border-slate-800 transition-all duration-200"
                aria-label="GitHub Link"
              >
                <GithubIcon className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-900 hover:border-slate-800 transition-all duration-200"
                aria-label="LinkedIn Link"
              >
                <LinkedinIcon className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-900 hover:border-slate-800 transition-all duration-200"
                aria-label="Twitter Link"
              >
                <TwitterIcon className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://google.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-900 hover:border-slate-800 transition-all duration-200"
                aria-label="Website Link"
              >
                <Globe className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Directory Links */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">Product</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><a href="#home" className="text-slate-400 hover:text-blue-400 transition-colors">Analyzer Engine</a></li>
              <li><a href="#features" className="text-slate-400 hover:text-blue-400 transition-colors">Features Grid</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-blue-400 transition-colors">How It Works</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">Resources</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">GitHub Docs</a></li>
              <li><a href="#home" className="text-slate-400 hover:text-blue-400 transition-colors">API References</a></li>
              <li><a href="#home" className="text-slate-400 hover:text-blue-400 transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Newsletter Input */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest font-mono">Stay Updated</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get detailed updates on new detection heuristics, security bulletins, and framework profiles.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 focus-within:border-purple-500/50 transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-transparent border-0 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 py-2 pl-3"
              />
              <button
                type="submit"
                className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
              >
                {subscribed ? (
                  <span className="text-[10px]">Subscribed!</span>
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Footer Base Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} GitHub Analyzer. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>using</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">MERN + AI Insights</span>
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
