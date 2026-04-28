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

const API_KEY = "M9wXhWSV7Rr425FBspxA";
const ZONE = "GB";

const FALLBACK_DATA = [
  { time: "00:00", value: 185 },
  { time: "03:00", value: 172 },
  { time: "06:00", value: 196 },
  { time: "09:00", value: 224 },
  { time: "12:00", value: 210 },
  { time: "15:00", value: 198 },
  { time: "18:00", value: 235 },
  { time: "21:00", value: 205 },
];

export default function LiveChart() {
  const [data, setData] = useState(FALLBACK_DATA);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.electricitymap.org/v3/carbon-intensity/history?zone=${ZONE}`,
        {
          headers: {
            "auth-token": API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Carbon API failed: ${response.status}`);
      }

      const json = await response.json();

      if (!json.history || !Array.isArray(json.history)) {
        throw new Error("Carbon API returned unexpected data");
      }

      const formatted = json.history.slice(-24).map((entry) => ({
        time: new Date(entry.datetime).getHours() + ":00",
        value: Number(entry.carbonIntensity),
      }));

      setData(formatted);
      setMessage("");
    } catch (error) {
      console.error("Failed to fetch carbon data:", error);
      setData(FALLBACK_DATA);
      setMessage("Showing sample UK carbon intensity data.");
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 3600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", height: 340 }}>
      {message && <p className="chart-message">{message}</p>}

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip
            formatter={(value) => `${Number(value).toFixed(2)} gCO₂eq/kWh`}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#00647bff"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}