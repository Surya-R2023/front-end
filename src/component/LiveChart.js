import ApexCharts from "apexcharts";
import { useEffect, useState  } from "react";
import ReactApexChart from "react-apexcharts";

function LiveChart(props) {
  const [interval,setIntervalVal] = useState(null);
  const [height, setHeight] = useState("auto");
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [type, setType] = useState("line");
  
  const updateSeries = (value) => {
      setData((d) => { let data = d; return [...data, value];});
  };
  useEffect(()=>{
    setData([]);
    let intr=interval;
    if(intr) clearInterval(intr);
    if (props.data) {
      intr = window.setInterval(() => {
        updateSeries({
          x: Date.now(),
          y: props.data,
        });
      }, 1000);
      setIntervalVal(intr);
     }
  },[props.parameter])
  useEffect(() => {
    ApexCharts.exec(props.id, "updateSeries", [{ data: data }]);
  }, [data]);
  useEffect(() => {
    if (props.type) setType(props.type);
    if (props.title) setTitle(props.title);
    if (props.height) setHeight(props.height);
  }, []);
 
  const options = {
    chart: {
      id: props.id,
      type: type,
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },

    grid: {
      strokeDashArray: 5,
      show: true,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    noData: {
      text: "No Data",
    },
    markers: {
      size: 0,
    },
    yaxis: {
      // max: 100,
    },

    xaxis: {
      type: "datetime",
      range: 20000,
    },

    title: {
      text: props.title,
      align: "left",
    },
    legend: {
      show: false,
    },
  };
  return (
    <div>
      {/* <select value={type} onChange={handleTypeChange}>
        <option value="line">Line Chart</option>
        <option value="area">Area Chart</option>
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
      </select> */}
      <ReactApexChart
        options={options}
        series={[
          {
            data: [],
          },
        ]}
        type={type}
        height={height}
      />
    </div>
  );
}

export default LiveChart;
