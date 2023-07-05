import { useEffect, useState } from "react";
import { Typography } from "antd";
import TimeSeriesGraph from "./TimeSeriesGraph";
import moment from "moment";
const { Text, Title } = Typography;
function ParameterListItem(props) {
  const [series, setSeries] = useState({});
  const [_class, setClass] = useState("");
  const [_displayValue, setDisplayValue] = useState(null);
  const [_actualValue, setActualValue] = useState(null);

  useEffect(() => {
    let displayValue,
      classname = "";

    let value = props.parameterValue;
    if (!props.parameterId) {
      classname = "disabled";
    }
    switch (props.dataType) {
      case "BOOLEAN":
        value = props.parameterValue?.toLowerCase() === "true";
        classname = value ? "online" : "offline";
        displayValue = value ? "True" : "False";
        break;
      case "NUMBER":
        value = Number(props.parameterValue ?? 0);
        displayValue = value;
        break;
      default:
        value = props.parameterValue;
        displayValue = value;
        break;
    }
    setActualValue(value);
    setClass(classname);
    setDisplayValue(displayValue);
    setSeries({
      name: props.displayName,
      data: [],
    });
    setInterval(() => {
      setSeries((e) => ({
        ...e,
        data: [...e.data, { x: moment(), y: Number(_actualValue) ?? 0 }],
      }));
    }, 5000);
  }, [props.displayName]);

  return (
    <div className={`parameterItem ${_class}`}>
      {/* <TimeSeriesGraph
        subtitle={props.displayName}
        title={_displayValue}
        series={[series]}
      /> */}
      <Text type="secondary" italic className="title">
        {props.displayName}
      </Text>
      <Title className="value" level={3} ellipsis>
        {_displayValue}
      </Title>
    </div>
  );
}

function ParameterRowList(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    let limit = 4;
    let tempData = [];
    if (props.data) tempData = [...props.data];
    let n = tempData.length;
    let mod = n % limit;
    if (mod > 0) {
      let diff = limit - (n % limit);
      for (let i = 0; i < diff; i++) {
        tempData = [...tempData, { displayName: "No Parameter" }];
      }
    }
    setData((value) => tempData);
  }, [props.data]);

  return (
    <div className="parameterList">
      {data?.map((e, i) => {
        return <ParameterListItem {...e} />;
      })}
    </div>
  );
}

function ParameterList(props) {
  const [parameters, setParameters] = useState([]);
  useEffect(() => {
    setParameters((value) => props.parameters);
  }, [props.parameters]);
  return (
    <>
      {parameters?.length > 0 ? (
        <>
          {/* <ParameterRowList
            data={parameters?.filter((e) => e.dataType == "BOOLEAN")}
          />
          <ParameterRowList
            data={parameters?.filter((e) => e.dataType != "BOOLEAN")}
          /> */}
          <ParameterRowList data={parameters} />
        </>
      ) : (
        <>
          <ParameterRowList data={[{ displayName: "No Parameter" }]} />
          {/* <ParameterRowList data={[{ displayName: "No Parameter" }]} /> */}
        </>
      )}
    </>
  );
}

export default ParameterList;
