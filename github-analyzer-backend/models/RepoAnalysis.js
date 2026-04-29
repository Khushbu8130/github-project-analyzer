import mongoose from "mongoose";

const repoAnalysisSchema = new mongoose.Schema(
  {
    repoUrl: { type: String, required: true },
    owner: String,
    repoName: String,
    stars: Number,
    forks: Number,
    score: Number,
    level: String,
    insights: [String],
    suggestions: [String],
    version: Number,

    meta: {
      totalCommits: Number,
      activeDays: Number,
      fileCount: Number,
      folderCount: Number,
      hasFrontend: Boolean,
      hasBackend: Boolean,
      authenticity: String,
      confidence: String,
      summary: String,

      // ✅ NEW FIELDS (IMPORTANT)
      timeline: [
        {
          date: String,
          commits: Number,
        },
      ],

      heatmap: [
        {
          date: String,
          count: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("RepoAnalysis", repoAnalysisSchema);