import React, { Component } from "react";
import Chart from "react-apexcharts";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 41],
      options: {
        chart: {
          type: "donut",
        },
        labels: ["Audit", "NCR", "Observation"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="donut"
        width="620"
        height="334"
        display="content"
        align="center"
        labels="center"
      />
    );
  }
}

export default Donut;
