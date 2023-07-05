import moment from "moment";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
function TimeSeriesGraph(props) {
  const [height, setHeight] = useState(160);
  const [title, setTitle] = useState("");
  const [series, setSeries] = useState([]);
  const [type, setType] = useState("line");
  useEffect(() => {
    if (props.type) setType(props.type);
    if (props.title) setTitle(props.title);
    if (props.height) setHeight(props.height);
    if (props.series) {
      setSeries(props.series);
    }
  }, [props]);

  const options = {
    chart: {
      group: "sparklines",
      type: type,
      sparkline: {
        enabled: true,
      },

      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
        zoom: {
          enabled: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 1,
    },

    xaxis: {
      type: "datetime",
      lines: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
    },
    legend: {
      show: false,
    },
    title: {
      text: props.title,
      offsetX: 30,
      style: {
        fontSize: "24px",
        cssClass: "apexcharts-yaxis-title",
      },
    },
    subtitle: {
      text: props.subtitle,
      offsetX: 30,
      style: {
        fontSize: "14px",
        cssClass: "apexcharts-yaxis-title",
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

export default TimeSeriesGraph;
