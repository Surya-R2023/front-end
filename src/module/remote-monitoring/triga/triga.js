import React, { Component } from "react";
import { FireFilled, WarningFilled } from "@ant-design/icons";
import AssetService from "../../../services/asset-service";
import {
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import { withForm } from "../../../utils/with-form";
import { withRouter } from "../../../utils/with-router";
import Page from "../../../utils/page/page";
import FilterFunctions from "../common/filter-functions";
import PlantService from "../../../services/plant-service";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { fallback, remoteAsset, rootUrl } from "../../../helpers/url";
const { Text, Title } = Typography;
const style = {
  formItem: {
    minWidth: "150px",
  },
  online: { color: "green" },
  offline: { color: "grey" },
  alarm: { color: "orange" },
  disable: { color: "#dddddd", opacity: 0.5 },
  progressTable: {
    display: "flex",
    gap: "5px",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#f5f5f5",
    padding: "5px 10px",
  },
};
function Alert(props) {
  return (
    <div
      className="blink_me"
      style={{
        zIndex: 2,
        background: "red",
        position: "absolute",
        height: "100%",
        width: "100%",
        display: "inline-block",
        borderRadius: "50%",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FireFilled />
    </div>
  );
}

function Warning(props) {
  return (
    <div
      className="blink_me"
      style={{
        zIndex: 1,
        background: "orange",
        position: "absolute",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        color: "#ffffff",
      }}
    >
      <WarningFilled />
    </div>
  );
}

function Light(props) {
  return (
    <div
      className="lightGlow"
      style={{
        background: "red",
        position: "absolute",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        color: "#ffffff",
      }}
    ></div>
  );
}
function Mark(props) {
  return (
    <div
      style={{
        position: "absolute",
        height: "25px",
        width: "25px",
        ...props.style,
      }}
    >
      <></>
      {props.warning && <Warning />}
      {props.alert && <Alert />}
      {props.common && <Light />}
    </div>
  );
}

class Triga extends FilterFunctions {
  state = {
    marks: [
      {
        id: "L1_D1",
        style: { left: 270, top: 155, right: "auto" },
        warning: false,
        alert: false,
        status: 1,
      },
      {
        id: "L1_D2",
        style: { left: 315, top: 155, right: "auto" },
        warning: false,
        alert: false,
        status: 2,
      },
      {
        id: "L1_D3",
        style: { left: 358, top: 155, right: "auto" },
        warning: false,
        alert: false,
        status: 3,
      },
      {
        id: "L1_D4",
        style: { left: 403, top: 155, right: "auto" },
        warning: false,
        alert: false,
        status: 0,
      },
      {
        id: "L1_D5",
        style: { left: 570, top: 200, right: "auto" },
        warning: false,
        alert: false,
        status: 0,
      },
      {
        id: "L1_D6",
        style: { left: 610, top: 200, right: "auto" },
        warning: false,
        alert: false,
        status: 0,
      },
      {
        id: "L1_D7",
        style: { left: 650, top: 200, right: "auto" },
        warning: false,
        alert: false,
        status: 0,
      },
      {
        id: "L1_D8",
        style: { left: 690, top: 200, right: "auto" },
        warning: false,
        alert: false,
        status: 0,
      },
      {
        id: "L2_D1",
        style: { left: 268, top: 366, right: "auto" },
        warning: false,
        alert: false,
        status: 0,
      },
      {
        id: "L2_D2",
        style: { left: 322, top: 366, right: "auto" },
        warning: false,
        alert: false,
        status: 0,
      },
      {
        id: "L2_D3",
        style: { left: 375, top: 366, right: "auto" },
        warning: false,
        alert: false,
        status: 0,
      },
      {
        id: "L2_D4",
        style: { left: 436, top: 366, right: "auto" },
        warning: false,
        alert: false,
        status: 0,
      },
    ],
  };
  service = new PlantService();
  assetservice = new AssetService();
  componentDidMount() {
    this.getContinentList();
    this.getCustomerList();
    let plantId = this.props.searchParams.get("plantId");
    if (plantId) {
      this.props.form.setFieldValue("customerId", Number(plantId));
      this.setState((state) => ({ ...state, plantId: plantId }));
      this.getData(plantId);
    }
  }
  connect = (id) => {
    let ws;
    let topic = `/topic/${id}`;
    if (ws != undefined && !ws.CLOSED) ws.close();
    if (this.stompClient?.connected) this.stompClient.disconnect();
    ws = new SockJS(`${rootUrl}/ws`);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect(
      {},
      (frame) => {
        this.stompClient.subscribe(topic, (sdkEvent) => {
          this.onMessageReceived(sdkEvent.body);
        });
        //_this.stompClient.reconnect_delay = 2000;
      },
      this.errorCallBack
    );
  };
  onMessageReceived = (event) => {
    let jsonRes = JSON.parse(event);
    this.patch(jsonRes);
  };

  setValue(parameterKey, value) {
    let marks = this.state.marks;
    let index = marks.findIndex((el) => parameterKey.includes(el.id));
    if (index !== -1) {
      if (parameterKey.includes("TR")) {
        marks[index].warning = value;
        this.setState((state) => ({ ...state, marks: marks }));
      }
      if (parameterKey.includes("FIRE")) {
        marks[index].alert = value;
        this.setState((state) => ({ ...state, marks: marks }));
      }
    }
  }

  patch(data) {
    let p = this.state.parameters.find(
      (e) => e.parameterKey == data.parameterKey
    );
    if (p) {
      let v = this.parseValue(
        data.parameterValue,
        p.dataType,
        p.assetDisplayValue,
        data.parameterKey
      );
      this.setValue(data.parameterKey, v.value);
    }
  }
  parseValue(parameterValue, dataType, assetDisplayValue, parameterKey = "") {
    let display = assetDisplayValue?.find(
      (el) => el.value?.toLowerCase() == parameterValue?.toLowerCase()
    );
    let value;
    switch (dataType) {
      case "NUMBER":
        value = Number(parameterValue);
        break;
      case "BOOLEAN":
        value =
          parameterValue?.toLowerCase() === "true" || parameterValue === "1"
            ? true
            : false;

        break;
      case "DATETIME":
        value = parameterValue;
        break;
      default:
        value = parameterValue;
        break;
    }
    return {
      value,
      display: display ? display.displayValue : value,
      dataType,
      assetDisplayValue,
      parameterKey,
    };
  }
  errorCallBack = (error) => {
    console.log("errorCallBack -> " + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  };
  getData = (id) => {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.service.retrieve(id).then((response) => {
      this.setState((state) => ({
        ...state,
        data: response.data,
        isLoading: false,
      }));
    });
    let assetId = 3537;
    this.assetservice.retrieve(assetId).then(({ data }) => {
      data.parameters?.forEach((e) => {
        let v = this.parseValue(
          e.parameterValue,
          e.dataType,
          e.assetDisplayValue,
          e.parameterKey
        );
        this.setValue(e.parameterKey, v.value);
      });
      this.setState((state) => ({
        ...state,
        parameters: data.parameters,
      }));
      this.connect(assetId);
    });
  };

  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }
  render() {
    const { data, marks } = this.state;
    let common = marks.findIndex((e) => e.warning || e.alert);
    return (
      <Page
        filter={
          <Form
            size="small"
            // onFinish={this.search}
            // onValuesChange={this.search}
            form={this.props.form}
            layout="inline"
            initialValues={{ mode: null }}
          >
            <Form.Item name="mode" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="region" style={style.formItem}>
              <Select
                showArrow={false}
                showSearch={true}
                onChange={this.getCountryList}
                loading={this.state.isContinentListLoading}
                allowClear
                placeholder="Region"
                options={this.state.continentList}
              ></Select>
            </Form.Item>
            <Form.Item name="country" style={style.formItem}>
              <Select
                showArrow={false}
                onChange={this.getStateList}
                showSearch
                loading={this.state.isCountryListLoading}
                placeholder="Country"
                allowClear
                options={this.state.countryList}
              ></Select>
            </Form.Item>
            <Form.Item name="state" style={style.formItem}>
              <Select
                showArrow={false}
                onChange={this.getCustomerList}
                showSearch
                loading={this.state.isStateListLoading}
                placeholder="State"
                allowClear
                options={this.state.stateList}
              ></Select>
            </Form.Item>
            <Form.Item name="customerId" style={style.formItem}>
              <Select
                showArrow={false}
                showSearch
                onChange={this.getData}
                loading={this.state.isCustomerListLoading}
                placeholder="Site"
                options={this.state.customerList}
              ></Select>
            </Form.Item>
          </Form>
        }
      >
        <Row>
          <Col span={24}>
            <Title level={3} style={{ textTransform: "capitalize" }}>
              {data?.customerName}
            </Title>
          </Col>
          <Col span={24}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                background: "#333333",
              }}
            >
              <div style={{ position: "relative" }}>
                <img src={remoteAsset(data?.imageUrl)} width={940} />
                {marks.map((e) => (
                  <Mark {...e}></Mark>
                ))}

                {common !== -1 && (
                  <>
                    {[
                      {
                        id: "CommonFlashing",
                        style: {
                          right: 90,
                          top: 300,
                          left: "auto",
                          height: 30,
                          width: 30,
                        },
                        status: 0,
                        alarm: false,
                        warning: false,
                        common: true,
                      },
                      {
                        id: "CommonFlashing2",
                        style: {
                          right: 116,
                          top: 235,
                          left: "auto",
                          height: 35,
                          width: 35,
                        },
                        status: 0,
                        alarm: false,
                        warning: false,
                        common: true,
                      },
                    ].map((e) => (
                      <Mark {...e}></Mark>
                    ))}
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default withRouter(withForm(Triga));
