import MetricsChart from "./MetricsChart";
import TimelineChart from "./TimelineChart";
import { normalize } from "../utils/normalize";

function ResultCard({ result }) {
  const chartData = result?.meta
    ? [
        { name: "Commits", value: normalize(result.meta.totalCommits) },
        { name: "Days", value: normalize(result.meta.activeDays) },
        { name: "Files", value: normalize(result.meta.fileCount) },
      ]
    : [];

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold text-gray-800">
        {result.data.repoName}
      </h2>

      <p className="text-gray-500">
        ⭐ {result.data.stars} | 🍴 {result.data.forks}
      </p>

      {/* SCORE */}
      <div className="mt-4">
        <div className="bg-gray-200 rounded-full">
          <div
            className="bg-green-500 text-white text-center text-sm py-1 rounded-full"
            style={{ width: `${result.data.score}%` }}
          >
            {result.data.score}%
          </div>
        </div>

        <p className="mt-2 font-semibold">
          Level: {result.data.level}
        </p>
      </div>

      {/* AUTH */}
      {result.meta && (
        <div className="mt-3">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            {result.meta.authenticity}
          </span>
          <p className="text-sm text-gray-500 mt-1">
            Confidence: {result.meta.confidence}
          </p>
        </div>
      )}

      {/* SUMMARY */}
      {result.meta?.summary && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <h3 className="font-semibold text-blue-700">AI Summary</h3>
          <p className="mt-1 text-gray-700">{result.meta.summary}</p>
        </div>
      )}

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <div>
          <h3 className="font-semibold text-lg">Insights</h3>
          <ul className="list-disc ml-5 mt-2">
            {result.data.insights?.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>

          <div className="mt-5">
            <h3 className="font-semibold text-lg">Suggestions</h3>
            <ul className="list-disc ml-5 mt-2">
              {result.data.suggestions?.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>
        </div>

        <MetricsChart chartData={chartData} meta={result.meta} />
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Commits</p>
          <p className="font-bold">{result.meta.totalCommits}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Days</p>
          <p className="font-bold">{result.meta.activeDays}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Files</p>
          <p className="font-bold">{result.meta.fileCount}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Folders</p>
          <p className="font-bold">{result.meta.folderCount}</p>
        </div>
      </div>

      {result.meta?.timeline && (
        <TimelineChart timeline={result.meta.timeline} />
      )}
    </div>
  );
}

export default ResultCard;