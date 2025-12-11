import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useInView } from "./inView";

const data = [
  { name: "Cars", value: 57 },
  { name: "Vans", value: 18 },
  { name: "HGVs", value: 21 },
  { name: "Buses & Coaches", value: 3 },
];

const COLORS = ["#00d5ffff", "#3f5b96ff", "#34407fff", "#21304fff"];

export default function PieChartOnView() {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <div ref={ref} style={{ height: "350px" }}>
      {inView && (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
}
