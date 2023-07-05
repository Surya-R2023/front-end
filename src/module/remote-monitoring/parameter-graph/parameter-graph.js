import { Select, Spin } from "antd";
import React, { Component } from "react";
import TimeSeriesGraph from "../../../component/TimeSeriesGraph";
import ParameterGraphService from "../services/parameter-graph-service";
import moment from "moment";
class ParameterGraph extends Component {
  state = { assetId: null, value: [], isLoading: false, height: "200px" };
  service = new ParameterGraphService();

  constructor(props) {
    super(props);
  }

  processData() {
    let result = this.state.value?.map((param) => {
      let data = this.state.response?.map((e) => {
        let val; //= //e[param.toUpperCase()];
        console.log("param:", param);
        console.log("e:", e);
        console.log("val:", val);

        // Split the string into an array of words
        const words = param.split("_");

        // Capitalize the first letter of each word
        const capitalizedWords = words.map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });

        // Join the capitalized words with underscores
        const convertedParam = capitalizedWords.join("_");

        console.log("camel", convertedParam); // Output: "Room_Temperature"

        if (typeof e[convertedParam] == "boolean") {
          val = e[convertedParam] ? 1 : 0;
        } else val = e[convertedParam];

        return {
          x: moment(e.timestamp) /*timestamp*/,
          y: val,
        };
      });

      let parameter = this.props.parameters?.find(
        (e) => e.parameterKey === param.toUpperCase()
      );
      console.log("parameter:", parameter);
      return {
        name: parameter ? parameter.displayName : param.toUpperCase(),
        data: data,
      };
    });
    console.log("result:", result);
    this.setState((state) => ({ ...state, result: result }));
  }

  static getDerivedStateFromProps(props, state) {
    console.log("props", props);
    if (props.parameters?.length) {
      return { ...state, ...props };
    }
    return { ...state, ...props };
  }

  componentDidMount() {
    //if (this.state.parameters?.length > 0) {
    // this.setState(
    //   (state) => ({
    //     ...state,
    //     value:[],
    //   }),
    //   () => {
    //     //
    //     // this.processData();
    //   }
    // );
    //}
  }

  handleSelect = (value) => {
    console.log("valuee", value.name);
    this.setState(
      (state) => ({ ...state, value: [value] }),
      () => {
        const data = this.processData(value);
        console.log("response data", data);
      }
    );
  };

  render() {
    console.log("result", this.state.result, "value", this.state.value);
    const data = this.state.value;
    console.log("check: ", data);
    const checkProps = this.state.response;
    console.log("props: ", checkProps);
    return (
      <div>
        <Select
          placeholder="Select Parameter...."
          //value={this.state.value}
          //mode="multiple"
          size="small"
          onChange={this.handleSelect}
          style={{ minWidth: "200px" }}
          options={this.state.parameters
            ?.filter((e) => e.dataType == "BOOLEAN" || e.dataType == "NUMBER")
            ?.map((e) => ({
              label: e.displayName,
              value: e.parameterKey,
            }))}
        ></Select>
        {/* {JSON.stringify(this.state)} */}
        <TimeSeriesGraph
          height={this.state.height}
          series={this.state.result}
        />
      </div>
    );
  }
}

export default ParameterGraph;
