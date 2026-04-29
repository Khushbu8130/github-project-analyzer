import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell
} from "recharts";

function MetricsChart({ chartData, meta }) {
  return (
    <div>
      <h3 className="font-semibold">Project Metrics</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(v, name) => {
              if (name === "Commits") return [meta.totalCommits];
              if (name === "Days") return [meta.activeDays];
              if (name === "Files") return [meta.fileCount];
            }}
          />
          <Bar dataKey="value">
            {chartData.map((entry, i) => (
              <Cell
                key={i}
                fill={
                  entry.name === "Commits"
                    ? "#3b82f6"
                    : entry.name === "Days"
                    ? "#f59e0b"
                    : "#10b981"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-500 mt-2">
        Values normalized for comparison
      </p>
    </div>
  );
}

export default MetricsChart;