import express from "express";
import axios from "axios";
import RepoAnalysis from "../models/RepoAnalysis.js";

const router = express.Router();
const ANALYSIS_VERSION = 9; // bump version

// ===== SAFE REQUEST =====
const safeGet = async (url, headers) => {
  try {
    return await axios.get(url, { headers });
  } catch {
    return { data: {} };
  }
};

// ===== AI SUMMARY =====
const generateSummary = (repoName, hasFrontend, hasBackend, fileCount) => {
  let summary = `The project "${repoName}" `;

  if (hasFrontend && hasBackend) summary += "is a full-stack application ";
  else if (hasFrontend) summary += "is a frontend project ";
  else if (hasBackend) summary += "is a backend system ";
  else summary += "is a software project ";

  if (fileCount < 20) summary += "with a small codebase.";
  else if (fileCount < 100) summary += "with a moderate structured codebase.";
  else summary += "with a large and complex codebase.";

  return summary + " Analysis based on commit activity and structure.";
};

// ===== ROUTE =====
router.post("/analyze", async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl || !repoUrl.includes("github.com")) {
      return res.status(400).json({ error: "Invalid GitHub URL" });
    }

    // ===== CACHE =====
    const existing = await RepoAnalysis.findOne({ repoUrl });

    if (
      existing &&
      existing.version === ANALYSIS_VERSION &&
      existing.meta?.summary &&
      existing.meta?.timeline
    ) {
      return res.json({
        success: true,
        data: existing,
        cached: true,
        meta: existing.meta,
      });
    }

    if (existing) {
      await RepoAnalysis.deleteOne({ _id: existing._id });
    }

    // ===== EXTRACT =====
    const parts = repoUrl.split("/");
    const owner = parts[3];
    const repo = parts[4]?.replace(".git", "");

    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    };

    // ===== REPO =====
    const repoData = await safeGet(
      `https://api.github.com/repos/${owner}/${repo}`,
      headers
    );

    const stars = repoData.data.stargazers_count || 0;
    const forks = repoData.data.forks_count || 0;
    const defaultBranch = repoData.data.default_branch || "main";

    // ===== COMMITS =====
    const commitsData = await safeGet(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`,
      headers
    );

    const commits = commitsData.data || [];

    const totalCommits = commits.length;

    const commitDates = commits.map(
      (c) => new Date(c.commit.author.date)
    );

    const activeDays = new Set(
      commitDates.map((d) => d.toDateString())
    ).size;

    // ===== TIMELINE (FIXED SORTING) =====
    const timelineMap = {};

    commits.forEach((c) => {
      const date = c.commit.author.date.split("T")[0];
      timelineMap[date] = (timelineMap[date] || 0) + 1;
    });

    const timeline = Object.keys(timelineMap)
      .map((date) => ({
        date,
        commits: timelineMap[date],
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // ✅ FIX

    // ===== FILE STRUCTURE =====
    const treeData = await safeGet(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
      headers
    );

    const files = treeData.data.tree || [];
    const fileCount = files.length;

    const folderCount = new Set(
      files
        .filter((f) => f.type === "tree")
        .map((f) => f.path.split("/")[0])
    ).size;

    let hasFrontend = false;
    let hasBackend = false;

    files.forEach((f) => {
      const path = f.path?.toLowerCase() || "";
      if (path.includes("react") || path.includes(".jsx")) hasFrontend = true;
      if (path.includes("server") || path.includes("api")) hasBackend = true;
    });

    // ===== SCORE =====
    let score = 0;

    if (totalCommits > 20) score += 30;
    else if (totalCommits > 5) score += 20;
    else score += 10;

    if (activeDays > 10) score += 25;
    else if (activeDays > 5) score += 15;
    else score += 5;

    if (fileCount > 100) score += 20;
    else if (fileCount > 50) score += 10;

    if (stars > 100) score += 10;

    if (hasFrontend && hasBackend) score += 10;

    score = Math.min(score, 100);

    const level =
      score > 75 ? "Advanced" : score > 40 ? "Intermediate" : "Basic";

    // ===== AUTHENTICITY =====
    let authenticity = "Highly Authentic Project";
    let confidence = "High";

    if (fileCount > 100 && totalCommits < 5) {
      authenticity = "Suspicious (Bulk Upload)";
      confidence = "Medium";
    } else if (fileCount <= 30 && totalCommits <= 5) {
      authenticity = "Small Project (Early Stage)";
      confidence = "Medium";
    } else if (totalCommits < 5) {
      authenticity = "Low Activity Project";
      confidence = "Low";
    }

    // ===== SUMMARY =====
    const summary = generateSummary(
      repoData.data.name,
      hasFrontend,
      hasBackend,
      fileCount
    );

    // ===== SAVE =====
    const newAnalysis = new RepoAnalysis({
      repoUrl,
      owner,
      repoName: repoData.data.name,
      stars,
      forks,
      score,
      level,
      insights: [
        `Project contains ${fileCount} files`,
        `Active development across ${activeDays} days`,
      ],
      suggestions:
        totalCommits < 10
          ? ["Increase commit frequency"]
          : ["Project looks strong"],
      version: ANALYSIS_VERSION,
      meta: {
        totalCommits,
        activeDays,
        fileCount,
        folderCount,
        hasFrontend,
        hasBackend,
        authenticity,
        confidence,
        summary,
        timeline,
      },
    });

    await newAnalysis.save();

    res.json({
      success: true,
      data: newAnalysis,
      meta: newAnalysis.meta,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;