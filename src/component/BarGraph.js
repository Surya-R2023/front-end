import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
const colors = [
  "#26a0fc",
  "#26e7a6",
  "#febc3b",
  "#ff6178",
  "#8b75d7",
  "#6d848e",
  "#46b3a9",
  "#d830eb",
];
function BarGraph(props) {
  const [height, setHeight] = useState(200);
  const [title, setTitle] = useState("");
  const [yaxisTitle, setYaxisTitle] = useState("");
  const [series, setSeries] = useState([]);
  const [type, setType] = useState("bar");
  useEffect(() => {
    if (props.yaxisTitle) setYaxisTitle(props.yaxisTitle);
    if (props.title) setTitle(props.title);
    if (props.height) setHeight(props.height);
    if (props.series && props.series.length > 0)
      setSeries(
        props.series.map((e, i) => {
          let index = i;
          let n = colors.length;
          if (i >= n) {
            index = i % n;
          }
          return { ...e, color: colors[index] };
        })
      );
    if (props.type) setType(props.type);
  }, [props]);

  const options = {
    chart: {
      type: "bar",
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: colors,
    },

    yaxis: {
      dataLabels: "floating",
      title: {
        text: yaxisTitle,
        style: {
          color: undefined,
          fontSize: "12px",
          fontWeight: 600,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    title: {
      text: props.title,
    },
    xaxis: {
      // type:props.xaxisType?props.xaxisType:'datetime',
      title: {
        text: props.xaxisTitle ? props.xaxisTitle : "",
      },
      labels: {
        show: false,
        style: {
          // colors: colors,
          fontSize: "12px",
        },
      },
    },
  };
  return (
    <Chart
      title={title}
      options={options}
      series={series}
      type={type}
      height={height}
    />
  );
}

export default BarGraph;
