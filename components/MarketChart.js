import React from "react";
import { Platform, View, Dimensions } from "react-native";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { LineChart } from "react-native-chart-kit";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const screenWidth = Dimensions.get("window").width;

export default function MarketChart() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const values = [120, 140, 160, 180, 150];

  if (Platform.OS === "web") {
    const data = {
      labels,
      datasets: [
        {
          data: values,
          borderColor: "#10b981",
          tension: 0.4,
          fill: false,
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { display: false } },
        x: { grid: { display: false } },
      },
    };

    return (
      <View
        style={{
          height: 400,
          width: "100%",
        }}
      >
        <Line data={data} options={options} />
      </View>
    );
  }

  // not for web, for ios and android
  return (
    <LineChart
      data={{
        labels,
        datasets: [{ data: values }],
      }}
      width={screenWidth - 40}
      height={200}
      chartConfig={{
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(16,185,129,${opacity})`,
        labelColor: () => "#9ca3af",
      }}
      bezier
      style={{ borderRadius: 16 }}
    />
  );
}
