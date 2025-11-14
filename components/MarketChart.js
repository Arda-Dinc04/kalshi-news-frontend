import React from "react";
import { Platform, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function MarketChart() {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const values = [120, 140, 160, 180, 150];

  if (Platform.OS === "web") {
    // Dynamically import web-only chart libraries
    const ReactChartJS2 = require("react-chartjs-2");
    const ChartJSModule = require("chart.js");

    const Line = ReactChartJS2.Line;
    const ChartJS = ChartJSModule.Chart;

    ChartJS.register(
      ChartJSModule.LineElement,
      ChartJSModule.CategoryScale,
      ChartJSModule.LinearScale,
      ChartJSModule.PointElement,
      ChartJSModule.Tooltip,
      ChartJSModule.Legend,
    );

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
