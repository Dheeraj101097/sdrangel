import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./FrequencyGraph.module.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function FrequencyGraph({
  centerFreq = 14500000,
  range = 50000,
}) {
  const points = Array.from({ length: 101 }, (_, i) => {
    const freq = centerFreq - range + (i * (2 * range)) / 100;
    const amplitude = Math.sin((freq - centerFreq) / 5000) * 50 + 50;
    return { x: freq, y: amplitude };
  });

  const data = {
    datasets: [
      {
        label: "Signal",
        data: points,
        borderColor: "#3b82f6",
        fill: true,
        pointRadius: 0,
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        type: "linear",
        min: centerFreq - range,
        max: centerFreq + range,
        grid: { display: false },
        ticks: {
          callback: (value) => `${(value / 1_000_000).toFixed(1)}`,
        },
      },
      y: {
        display: false,
        min: 0,
        max: 100,
        grid: { display: false },
      },
    },
  };

  return (
    <div className={styles.container}>
      <Line data={data} options={options} />
    </div>
  );
}
