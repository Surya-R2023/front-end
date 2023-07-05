import moment from "moment";
import FilterFunctions from "../common/filter-functions";
import {
  Row,
  Col,
  Card,
  Select,
  Form,
  Button,
  DatePicker,
  Radio,
  TimePicker,
  Typography,
} from "antd";

import { withForm } from "../../../utils/with-form";
import firealert from "./firealert.gif";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Page from "../../../utils/page/page";
import { Alert } from "antd";

const { Title, Text } = Typography;
const onChange = (date, dateString) => {
  // console.log(date, dateString);
};
const style = {
  formItem: {
    minWidth: "120px",
  },
};

class CarmerView extends FilterFunctions {
  // constructor() {
  //     this.state = {
  //       currentDateTime: Date().toLocaleString()
  //     }
  //   }

  state = { form: {} };
  componentDidMount() {
    this.getContinentList();
  }
  getData = (assetId) => {
    console.log(assetId);
    this.setState((state) => ({ ...state, assetId: assetId, isLoading: true }));
    this.assetService.retrieve(assetId).then((response) => {
      if (response.data) {
        this.setState((state) => ({
          ...state,
          isLoading: false,
          parameters: response.data.parameters,
        }));
      }
      // setTimeout(() => {
      //   this._getData(assetId);
      // }, 500);
    });
  };
  onFinish = (value) => {
    this.getData(value.assetId);
    this.setState((state) => ({ ...state, form: value }));
  };
  render() {
    return (
      <Page title="Camera View">
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card>
              <Row gutter={[16, 16]}>
                <img src={firealert} width={40} />
                <Col span={4}>
                  <Alert
                    message={
                      <></>
                      // <Marquee pauseOnHover gradient={false}>
                      //   FireAlert
                      // </Marquee>
                    }
                    type="warning"
                    showIcon
                  />
                </Col>
                <Col span={4}>
                  {" "}
                  <Alert
                    message={
                      <></>
                      // <Marquee pauseOnHover gradient={false}>
                      //   HumanDetector
                      // </Marquee>
                    }
                    type="info"
                    showIcon
                  />
                </Col>

                <Col span={4}>
                  {" "}
                  <Alert
                    message={
                      <></>
                      // <Marquee pauseOnHover gradient={false}>
                      //   SmokeDetector
                      // </Marquee>
                    }
                    type="success"
                    showIcon
                  />{" "}
                </Col>
                <Col>
                  <table className="display-table">
                    <tr>
                      <td>18-10-22</td>
                      {/* <td>{this.state.data?.assetLibraryName}</td> */}
                    </tr>
                  </table>
                  {/* <Text style={{ color: "inherit", margin: 0 }}>
                    <DatePicker
                      name="Campaign-date"
                      showTime={{
                        defaultValue: moment("00:00:00", "HH:mm:ss"),
                      }}
                      format={"YYYY-MM-DD HH:mm"}
                      style={{ width: "100%" }}
                    />
                  </Text> */}
                </Col>
              </Row>
            </Card>

            <Card>
              <ReactPlayer
                url="https://youtu.be/puy6IUd4IQ0"
                width={950}
                height={400}
              />
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default CarmerView;
