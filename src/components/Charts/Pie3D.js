// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const chartComponant = ({ data }) => {
  const chartConfigs = {
    type: "Pie3D", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    borderColor: "red",
    borderThickness: 12,
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Languages",
        theme: "fusion",
        pieRadius: "45%",
        decimals: 0,
        // paletteColors: "#f1f1f1, #000, #ff0008, #806768, #a3464a"
      },
      // Chart Data
      data: data,
    }
  };
  return (<ReactFC {...chartConfigs} />);
}

export default chartComponant;