import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Live updating chart component representing transportation emissions data and overall CO2 footprint trends.
export default function LiveChart() {
  const [data, setData] = useState([{ time: 0, value: 10 }]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const nextTime = prev.length;
        const nextValue = Math.floor(Math.random() * 100);

        // Add new point
        const updated = [...prev, { time: nextTime, value: nextValue }];

        // Keep only last 30 points
        return updated.slice(-30);
      });
    }, 60000); // speed of data update (60 seconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#00fff756" />
      </LineChart>
    </ResponsiveContainer>
  );
}
