import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

function TimelineChart({ timeline }) {
  return (
    <div className="mt-8">
      <h3 className="font-semibold">Commit Timeline</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={timeline}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line dataKey="commits" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TimelineChart;