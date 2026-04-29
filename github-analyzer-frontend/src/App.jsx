import { useState, useEffect } from "react";
import axios from "axios";

import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FeatureCards from "./components/FeatureCards";
import ResultCard from "./components/ResultCard";
import AuthModal from "./components/AuthModal";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔐 AUTH STATE
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ⭐ SAVE RECENT SEARCHES
  const saveRecent = (url) => {
    const prev = JSON.parse(localStorage.getItem("recent")) || [];
    const updated = [url, ...prev.filter((r) => r !== url)].slice(0, 3);
    localStorage.setItem("recent", JSON.stringify(updated));
  };

  const recent = JSON.parse(localStorage.getItem("recent")) || [];

  const handleAnalyze = async () => {
    console.log("Analyze clicked", { repoUrl, user });

    if (!repoUrl) return alert("Enter GitHub URL");

    // 🔐 Require login
    if (!user) {
      setShowAuth(true);
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const token = localStorage.getItem("token");

      // ✅ Use ENV instead of localhost
      const API = import.meta.env.VITE_API_URL;

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

      // ⭐ Save recent
      saveRecent(repoUrl);

    } catch (err) {
      console.error(err);
      alert("Error analyzing repo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      {/* 🔥 HEADER */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b px-6 py-3 flex justify-between items-center shadow-sm">
        <h1 className="font-semibold text-lg">
          GitHub Analyzer 🚀
        </h1>

        {user && (
          <div className="flex items-center gap-3">
            <img
              src={user.picture}
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">
              {user.name}
            </span>

            <button
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("recent"); // 🔥 ADD THIS

                setUser(null);

                // reset UI
                setResult(null);
                setRepoUrl("");
              }}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="p-6">

        {/* HERO */}
        <Hero setRepoUrl={setRepoUrl} />

        {/* SEARCH */}
        <SearchBar
          repoUrl={repoUrl}
          setRepoUrl={setRepoUrl}
          handleAnalyze={handleAnalyze}
          loading={loading}
        />

        {/* 🔥 RECENT SEARCHES */}
        {recent.length > 0 && !result && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Recent:</p>

            <div className="flex justify-center gap-2 mt-2 flex-wrap">
              {recent.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setRepoUrl(r)}
                  className="text-xs px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!result && !loading && (
          <div className="text-center mt-10 text-gray-500">
            <p className="text-lg font-medium">
              Paste a GitHub repo to get AI insights 🔍
            </p>
          </div>
        )}

        {/* FEATURES */}
        {!result && <FeatureCards />}

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-6 text-gray-500">
            Analyzing project...
          </p>
        )}

        {/* RESULT */}
        {result && result.data && (
          <div className="mt-8">
            <ResultCard result={result} />
          </div>
        )}

        {/* TRUST BADGE */}
        <p className="text-xs text-gray-400 text-center mt-8">
          🔒 Secure analysis • No data misuse
        </p>

      </div>

      {/* 🔐 AUTH MODAL */}
      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={(userData) => {
            setUser(userData);
            setShowAuth(false);
          }}
        />
      )}
    </div>
  );
}

export default App;