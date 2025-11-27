//App.js

import { useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

function LivePieChart() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const data = [
    { name: "Geeksforgeeks", students: 400 },
    { name: "Technical scripter", students: 700 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={700} height={700}>
      <Pie
        activeIndex={activeIndex}
        data={data}
        dataKey="students"
        outerRadius={250}
        fill="green"
        onMouseEnter={onPieEnter}
        style={{ cursor: "pointer", outline: "none" }} // Ensure no outline on focus
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}

export default LivePieChart;
