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

export default function LiveChart() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.electricitymap.org/v3/carbon-intensity/history?zone=${ZONE}`,
        {
          headers: {
            "auth-token": API_KEY,
          },
        },
      );
      const json = await response.json();

      const formatted = json.history.slice(-24).map((entry) => ({
        time: new Date(entry.datetime).getHours() + ":00",
        value: entry.carbonIntensity,
      }));

      setData(formatted);
    } catch (error) {
      console.error("Failed to fetch carbon data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3600000); // refresh every hour
    return () => clearInterval(interval);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip
          formatter={(value) => value.toFixed(2) + " gCO2eq/kWh"}
          labelFormatter={(label) => `Time: ${label}`}
        />
        <Line type="monotone" dataKey="value" stroke="#00647bff" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
