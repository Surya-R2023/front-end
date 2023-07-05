import { Select, Spin } from "antd";
import React, { Component } from "react";
import TimeSeriesGraph from "../../../component/TimeSeriesGraph";
import ParameterGraphService from "../services/parameter-graph-service";
class ParameterGraph extends Component {
  state = { assetId: null, value: [], isLoading: false, height: "200px" };
  service = new ParameterGraphService();

  constructor(props) {
    super(props);
  }

  processData() {
     let result = this.state.value?.map((param) => {
      let data = this.state.response?.map((e) => {
        let val;
        if (typeof e[param] == "boolean") {
          val = e[param] ? 1 : 0;
        } else val = e[param];

        return {
          x: e.timestamp,
          y: val,
        };
      });
      let parameter = this.props.parameters?.find(
        (e) => e.parameterKey?.toLowerCase() === param
      );
      return {
        name: parameter ? parameter.displayName : param,
        data: data,
      };
    });
    this.setState((state) => ({ ...state, result: result }));
  }
  static getDerivedStateFromProps(props, state) {
    console.log("props",props);
    if (props.parameters?.length) {
      return { ...state, ...props };
    }
    return { ...state, ...props };
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (this.state.parameters?.length > 0) {
  //     this.setState(
  //       (state) => ({
  //         ...state,
  //         value: [this.state.parameters[0].parameterKey],
  //       }),
  //       () => {
  //         this.processData();
  //       }
  //     );
  //   }
  // }
  componentDidMount() {
    if (this.state.parameters?.length > 0) {
      this.setState(
        (state) => ({
          ...state,
          value:[],
        }),
        () => {
          this.processData();
        }
      );
    }
  }
  handleSelect = (value) => {
    this.setState(
      (state) => ({ ...state, value: [value] }),
      ()=>{this.processData()}
    );
    //console.log("valueeee",this.state.result , this.state.value , value);
  };
  
  render() {
    console.log("value",this.state.result ,this.state.value);
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