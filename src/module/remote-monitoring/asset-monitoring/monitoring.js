import {
  AlertFilled,
  BarChartOutlined,
  CheckCircleFilled,
  DatabaseFilled,
  MinusCircleFilled,
  WifiOutlined,
} from "@ant-design/icons";
import { MdWifi, MdWifiOff } from "react-icons/md";
import {
  Avatar,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
  Tooltip,
} from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { connect } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Gauge from "../../../component/gauge";
import LiveChart from "../../../component/LiveChart";
import { fallback, remoteAsset, rootUrl } from "../../../helpers/url";
import AssetService from "../../../services/asset-service";
import PlantService from "../../../services/plant-service";
import Page from "../../../utils/page/page";
import { withForm } from "../../../utils/with-form";
import { withRouter } from "../../../utils/with-router";
import FilterFunctions from "../common/filter-functions";
import ParameterGraphService from "../services/parameter-graph-service";
import Maps from "./maps";
import RemoteStart from "../remote-start/remote-start";
import MapIconsDataService from "../../../services/map-icons-data-service";
let data;
let dataParam = 0;
let value = 0;
let param;
let filteredData;
var testVariable;
const { Text, Title } = Typography;
const { Option } = Select;
const style = {
  formItem: {
    minWidth: "150px",
  },
};

class AssetMonitoringParameters extends FilterFunctions {
  timeOut;
  state = {
    timer: null,
    tileMore: true,
    mapData: [],
    continentList: [],
    countryList: [],
    stateList: [],
    isLoading: false,
    mapIconData: [],
    mainData: 0,
    selectedParameter: "",
    selectedParameter2: "",
    flow: {
      value: [
        /*flow ,data*/
      ],
    },
    temperature: {
      value: [
        /* temperature, data*/
      ],
    },
    fuelLevel: {
      value: [
        /*fuel, level ,data*/
      ],
    },
    waterLevel: {
      value: [
        /*water, level ,data */
      ],
    },
  };

  plantservice = new PlantService();
  assetservice = new AssetService();
  mapicondataservice = new MapIconsDataService();
  service = new ParameterGraphService();
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this._getData = this._getData.bind(this);
  }

  handleSelectParameter = (value) => {
    this.setState({ selectedParameter: value });
  };

  handleSelectParameter2 = (value) => {
    this.setState({ selectedParameter2: value });
  };

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
  errorCallBack = (error) => {
    //console.log("errorCallBack -> " + error);
    setTimeout(() => {
      this.connect(this.state.assetId);
    }, 5000);
  };
  setValue = () => {
    const flow = this.state.data?.gauge?.find((e) =>
      e.displayName?.toLowerCase().includes("flow")
    );
  };
  tileMore = () => {
    this.setState((state, props) => ({ ...state, tileMore: !state.tileMore }));
  };

  componentDidMount() {
    this.getContinentList();
    this.getCustomerList();
    this.getAssetList();
    this.getmapiconvalues();
    let assetId = this.props.searchParams.get("assetId");
    let plantId = this.props.searchParams.get("plantId");
    if (plantId) {
      // setTimeout(() => {
      this.props.form?.setFieldValue("customer", Number(plantId));
      this.getAssetList(plantId);
      this.getmapiconvalues(plantId);
      // }, 500);
    }
    if (assetId) {
      // setTimeout(() => {
      this.props.form?.setFieldValue("asset", Number(assetId));
      this.getData(assetId);
      // }, 500);
    }
  }
  getmapiconvalues = (plantId) => {
    this.mapicondataservice
      .list({ active: true, published: true, plantId: plantId })
      .then((response) => {
        this.setState((state) => ({
          ...state,
          mapIconData: response.data,
        }));
        //console.log("resp", response.data);
      });
  };
  getAssetList(plantId) {
    var array = [];
    this.setState((state, props) => ({
      ...state,
      isAssetListLoading: true,
      assetList: [],
    }));
    this.assetService
      .list({ active: true, published: true, plantId: plantId })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]?.assetCategory != "Energy Meter") {
            array.push({
              label: response.data[i]?.assetName,
              value: response.data[i]?.assetId,
            });
          }
        }
        this.setState((state, props) => ({
          ...state,
          assetList: array,

          // // assetList: array,
          // assetList:response.data?.map((e)=>{
          //   if(e.assetCategory!="Energy Meter")
          //   {
          //     return{
          //       label:e.assetName,
          //       value:e.assetId,
          //     };
          //   }
          //   else{
          //     return null
          //   }
          // })
        }));

        if (
          !this.props.form.getFieldValue("asset") &&
          response.data.length > 0
        ) {
          // this.props.form.setFieldValue("asset", response.data[0].assetId);
          // setTimeout(() => {
          this.getData(response.data[0].assetId);
          // }, 500);
        }
      })
      .finally(() => {
        this.setState((state, props) => ({
          ...state,
          isAssetListLoading: false,
        }));
      });
  }
  getData(assetId) {
    this.setState(
      (state) => ({
        ...state,
        assetId: assetId,
        isLoading: true,
        parameters: [],
        rows: [],
        data: [],
        mapData: [],
      }),
      () => {
        // setTimeout(() => {
        this._getData();
        // }, 500);
      }
    );
    return;
  }
  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }

  patch(data) {
    const { gauge, component } = this.state.data;
    let param = this.state.asset.parameters.find(
      (e) => e.parameterKey === data.parameterKey
    );
    if (!param) return;
    let v = this.parseValue(
      data.parameterValue,
      param.dataType,
      param.assetDisplayValue,
      param.parameterKey
    );

    switch (param.displayName) {
      case "Connection Status":
        this.setState((state) => ({ ...state, connectionStatus: v.value }));
        break;
      case "Running Status":
        this.setState((state) => ({ ...state, runningStatus: v.value }));
        break;
      default:
        break;
    }

    let index = gauge.findIndex((e) => e.parameterKey == data.parameterKey);
    if (index !== -1) {
      let valueObj = this.parseValue(
        data.parameterValue,
        gauge[index].dataType,
        gauge[index].assetDisplayValue,
        gauge[index].parameterKey
      );
      gauge[index].value = valueObj.value;
      this.setState((state) => ({ ...state, data: { gauge, component } }));
      return;
    }
    let obj = {};
    for (let g of gauge) {
      obj[g.parameterKey] = data.value;
    }
    this.setState((state) => ({ ...state, gaugeHash: obj }));
    for (let i in component) {
      let x = component[i];
      let index = x.parameter.findIndex(
        (e) => e.parameterKey == data.parameterKey
      );
      if (index !== -1) {
        let valueObj = this.parseValue(
          data.parameterValue,
          x.parameter[index].dataType,
          x.parameter[index].assetDisplayValue,
          x.parameter[index].parameterKey
        );
        component[i].parameter[index] = {
          ...x.parameter[index],
          value: valueObj.value,
          displayValue: valueObj.display,
        };
        this.setState((state) => ({ ...state, data: { gauge, component } }));
        return;
      }
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

        // if (!parameterKey.includes("powerhealthy")) {
        //   value = !value;
        // }
        break;
      case "DATETIME":
        value = parameterValue;
        break;
      default:
        value = parameterValue;
        break;
    }
    return { value, display: display ? display.displayValue : value };
  }
  _getData() {
    if (this.timeOut) clearTimeout(this.timeOut);
    Promise.all([
      this.assetservice.retrieve(this.state.assetId),
      this.service.list({ assetId: this.state.assetId, mode: 1 }),
    ])
      .then((response) => {
        if (response[0].data) {
          let connectionStatus, lastOnlineTime, lastOfflineTime, runningStatus;
          for (let x of response[0].data.parameters) {
            switch (x.displayName) {
              case "Connection Status":
                connectionStatus = Boolean(x.parameterValue);
                break;
              case "Running Status":
                runningStatus = Boolean(x.parameterValue);
                break;
              // case "lastOnlineTime":
              //   lastOnlineTime = moment(Number(x.parameterValue));
              //   break;
              // case "lastOfflineTime":
              //   lastOfflineTime = moment(Number(x.parameterValue));
              //   break;

              default:
                break;
            }
          }
          let status;
          if (connectionStatus) {
            let ms = moment().diff(lastOnlineTime, "seconds");
            let hours = String(Math.floor(ms / (60 * 60))).padStart(2, "0");
            let modulo = ms % (60 * 60);
            let minutes = String(Math.floor(modulo / 60)).padStart(2, "0");
            status = `Since ${hours} h ${minutes} m`;
          } else {
            let ms = moment().diff(lastOfflineTime, "seconds");
            let hours = String(Math.floor(ms / (60 * 60))).padStart(2, "0");
            let modulo = ms % (60 * 60);
            let minutes = String(Math.floor(modulo / 60)).padStart(2, "0");
            status = `Since ${hours} h ${minutes} m`;
          }

          let parameter = response[0].data.parameters.filter(
            (e) => !e.preDefinedProperties
          );

          let data = parameter.reduce(
            (carry, e) => {
              let valueObj = this.parseValue(
                e.parameterValue,
                e.dataType,
                e.assetDisplayValue,
                e.parameterKey
              );
              if (e.dataType === "NUMBER") {
                carry.gauge.push({
                  displayName: e.displayName,
                  parameterKey: e.parameterKey,
                  label: e.displayName,
                  min: Number(e.min),
                  max: Number(e.max),
                  value: valueObj.value,
                  assetDisplayValue: e.assetDisplayValue,
                  dataType: e.dataType,
                  connected: e.connected,
                  connectedOn: e.connectedOn,
                });
              } else {
                // if (e.componentId) {
                let index = carry.component.findIndex(
                  (el) => el.componentId === e.componentId
                );

                if (index === -1) {
                  carry.component.push({
                    componentId: e.componentId,
                    componentName: e.component
                      ? e.component.componentName
                      : "Others",
                    parameter: [
                      {
                        parameterKey: e.parameterKey,
                        displayName: e.displayName,
                        value: valueObj.value,
                        displayValue: valueObj.display,
                        assetDisplayValue: e.assetDisplayValue,
                        dataType: e.dataType,
                      },
                    ],
                  });
                } else {
                  carry.component[index].parameter = [
                    ...carry.component[index].parameter,
                    {
                      parameterKey: e.parameterKey,
                      displayName: e.displayName,
                      value: valueObj.value,
                      displayValue: valueObj.display,
                      assetDisplayValue: e.assetDisplayValue,
                      dataType: e.dataType,
                    },
                  ];
                }
                // }
              }

              return carry;
            },
            { gauge: [], component: [] }
          );

          let asset = response[0].data;
          let mapData = [
            {
              label: asset.customer.customerName,
              title: asset.customer.customerName,
              key: asset.customer.customerId,

              position: {
                lat: asset.customer.latitude,
                lng: asset.customer.longitude,
              },
            },
          ];
          //console.log(response[0].data.parameters)
          let obj = {};
          for (let g of data.gauge) {
            obj[g.parameterKey] = g.value;
          }
          // this.setState(state=>({...state,gaugeHash:obj}));
          this.setState(
            (state) => ({
              ...state,
              gaugeHash: obj,
              parameters: response[0].data.parameters
                .sort((a, b) => a.displayName.localeCompare(b.displayName))
                .filter((e) => !e.preDefinedProperties),
              asset: response[0].data,
              status: status,
              runningStatus: runningStatus,
              connectionStatus: connectionStatus,
              rows: response[1].data.rows,
              data: data,
              mapData: mapData,
            }),

            () => {
              if (this.state.assetId) {
                this.connect(this.state.assetId);
              }
            }
          );
        }
      })
      .catch((err) => {
        if (this.timeOut) clearTimeout(this.timeOut);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  }
  componentWillUnmount() {
    if (this.stompClient?.connected) this.stompClient.disconnect();
  }
  diff = (date) => {
    //    let current = moment();
    //  let d = moment(date);
    // if (current.isBefore(d)) {
    //   return "00d 00h 00m";
    // }
    let diff = moment().diff(moment(date), "d").toString();
    return diff > 0 ? `${diff} days` : `${diff * -1} days left`;
  };
  render() {
    const { mapIconData } = this.state;
    const assetAlert = this.state.assetAlertsList?.filter(
      (e) => e.assetId == this.state.asset?.assetId
    );
    console.log("selected data", this.state.assetList);

    return (
      <Page
        title="Asset Monitoring"
        filter={
          <Form layout="inline" size="small" form={this.props.form}>
            <Form.Item name="region" style={style.formItem}>
              <Select
                showArrow={false}
                onChange={this.getCountryList}
                loading={this.state.isContinentListLoading}
                showSearch
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
            <Form.Item name="customer" style={style.formItem}>
              <Select
                showArrow={false}
                onChange={this.getAssetList}
                showSearch
                loading={this.state.isCustomerListLoading}
                placeholder="Customer"
                allowClear
                options={this.state.customerList}
              ></Select>
            </Form.Item>
            <Form.Item name="asset" style={style.formItem}>
              <Select
                showArrow={false}
                onChange={(value) => {
                  this.getData(value);
                  this.getmapiconvalues(value);
                }}
                showSearch
                loading={this.state.isAssetListLoading}
                placeholder="Asset"
                allowClear
                options={this.state.assetList}
              ></Select>
            </Form.Item>
          </Form>
        }
      >
        <Spin spinning={this.state.isLoading}>
          <Row gutter={[10, 10]}>
            <Col sm={12} xs={12} md={12}>
              <Card
                size="medium"
                style={{ overflow: "hidden" }}
                bodyStyle={{
                  position: "relative",
                  overflow: "hidden",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    color: "#ffffff",
                    alignItems: "flex-start",
                    background:
                      "linear-gradient(45deg, #000000b5, transparent)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    gap: "10px",
                  }}
                >
                  <Title
                    level={4}
                    style={{ color: "inherit", textTransform: "uppercase" }}
                  >
                    {this.state.asset?.customer?.customerName}
                  </Title>
                  {assetAlert?.length > 0 ? (
                    <Tag color="#f50">Critical</Tag>
                  ) : (
                    <Tag color="#4caf50">Healthy</Tag>
                  )}
                  <Space>
                    <Tooltip title="No. of assets configured" color="orange">
                      <Tag color="#ffffff" style={{ color: "#333333" }}>
                        <DatabaseFilled />
                        {this.state.mapIconData[0]?.assetCount}
                      </Tag>
                    </Tooltip>

                    <Tooltip title="No. of assets connected" color="green">
                      <Tag color="#ffffff" style={{ color: "#333333" }}>
                        <BarChartOutlined />
                        {this.state.mapIconData[0]?.connectionCount}
                      </Tag>
                    </Tooltip>
                    <Tooltip title="No. of alerts generated" color="red">
                      <Tag color="#ffffff" style={{ color: "#333333" }}>
                        <AlertFilled />
                        {this.state.mapIconData[0]?.alertCount}
                        {/* {assetAlert?.length} */}
                      </Tag>
                    </Tooltip>
                  </Space>
                  {/* <div>
                    <h3>
                      Asset Count: {this.state.mapIconData[0]?.assetCount}
                    </h3>
                    <h3>
                      Connection Count:
                      {this.state.mapIconData[0]?.connectionCount}
                    </h3>
                    <h3>Alert Count: {assetAlert?.length}</h3>
                  </div> */}
                </div>

                <Maps marker={this.state?.mapData} />
              </Card>
            </Col>
            <Col sm={4} xs={4} md={4}>
              <Card
                style={{ overflow: "hidden" }}
                bodyStyle={{
                  overflow: "hidden",
                  padding: 0,
                  height: 250,
                  position: "relative",
                }}
                size="medium"
              >
                <Image
                  style={{ objectFit: "cover" }}
                  height="100%"
                  width="100%"
                  preview={false}
                  src={remoteAsset(this.state.asset?.imagePath)}
                  fallback={fallback}
                />
                <div
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    bottom: "15px",
                    right: "15px",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: this.state.connectionStatus
                        ? "green"
                        : "grey",
                      lineHeight: "35px",
                    }}
                    icon={
                      this.state.connectionStatus ? <MdWifi /> : <MdWifiOff />
                    }
                  ></Avatar>
                </div>
              </Card>
            </Col>
            <Col sm={8} xs={8} md={8}>
              <Card
                bodyStyle={{ padding: "10px" }}
                size="medium"
                style={{
                  height: 250,
                  // padding: 0,
                  backgroundColor:
                    this.state.asset?.warrantyTillDate &&
                    moment(this.state.asset?.warrantyTillDate).isAfter(moment())
                      ? "#36f46933"
                      : "#f4433633",
                }}
              >
                <RemoteStart assetId={this.state.asset?.assetId} />
                <Divider style={{ margin: "5px 0" }} />
                <Text strong>Warranty Record</Text>
                <table>
                  {[
                    {
                      label: "Warranty Status",
                      value:
                        this.state.asset?.warrantyTillDate &&
                        moment(this.state.asset?.warrantyTillDate).isAfter(
                          moment()
                        ) ? (
                          <Tag
                            style={{ background: "green", color: "#ffffff" }}
                          >
                            Active
                          </Tag>
                        ) : (
                          <Tag style={{ background: "red", color: "#ffffff" }}>
                            Expired
                          </Tag>
                        ),
                    },
                    {
                      label: "Warranty Period",
                      value: `${this.state.asset?.warrantyPeriod} Days`,
                    },
                    {
                      label: "Warranty Period Till",
                      value: this.state.asset?.warrantyTillDate
                        ? moment(this.state.asset?.warrantyTillDate).format(
                            "DD-MM-YYYY"
                          )
                        : "",
                    },
                    {
                      label: "Testing & Commissioning Date",
                      value: this.state.asset?.commissionedDate
                        ? moment(this.state.asset?.commissionedDate).format(
                            "DD-MM-YYYY"
                          )
                        : "",
                    },

                    {
                      label: "Elapsed Time",
                      value: this.diff(this.state.asset?.warrantyTillDate),
                    },
                  ].map((e, i) => (
                    <tr key={`wd${i}`}>
                      <td
                        style={{
                          padding: "5px 5px 5px 0",
                          // fontSize: ".8em",
                          color: "grey",
                        }}
                      >
                        {e.label}
                      </td>
                      <td
                        style={{
                          padding: "5px",
                          // fontSize: ".8em",
                          color: "grey",
                        }}
                      >
                        {e.value}
                      </td>
                    </tr>
                  ))}
                </table>
              </Card>
            </Col>
            <Col span={24}>
              <Row gutter={[10, 10]}>
                {this.state.data?.gauge?.map((e) => (
                  <Col flex="1 0 250px">
                    <Gauge {...e} />
                  </Col>
                ))}
              </Row>
            </Col>
            {this.state.data?.component?.map((e) => (
              <>
                <Col span={24}>
                  <Title level={4}>{e.componentName}</Title>
                </Col>

                <Col span={24}>
                  <div className="parameterList">
                    {e.parameter?.map(
                      (el) => (
                        (this.testvariable = el?.assetDisplayValue?.find(
                          (e) =>
                            el?.value?.toString() == e?.value?.toLowerCase()
                        )),
                        (
                          <div
                            className={
                              `parameterItem ${
                                this.testvariable?.colour
                                  ? this.testvariable?.colour
                                  : el.value
                                  ? "Green"
                                  : "Red"
                              }`
                              // style={{backgroundColor: "Red"}
                            }
                          >
                            <div>
                              {el.value ? (
                                <Title level={3} className="title">
                                  <CheckCircleFilled />
                                </Title>
                              ) : (
                                <Title level={3} className="title">
                                  <MinusCircleFilled />
                                </Title>
                              )}
                            </div>
                            <Text type="secondary" className="title" ellipsis>
                              {el.displayName}
                            </Text>
                            <Text className="value" level={5} ellipsis>
                              {el.displayValue}
                            </Text>
                          </div>
                        )
                      )
                    )}
                  </div>
                </Col>
              </>
            ))}
            <Col sm={12} xs={24}>
              <Card size="small">
                <Select
                  onChange={this.handleSelectParameter}
                  style={{
                    width: 160,
                  }}
                  //defaultValue={"flow"}
                  //mode="multiple"
                >
                  {this.state.data?.gauge?.map((e) => (
                    <Option key={e.parameterKey} value={e.parameterKey}>
                      {e.displayName}
                    </Option>
                  ))}
                </Select>
                {/* {!this.state.isLoading && ( */}
                <LiveChart
                  id="i1"
                  data={
                    this.state.selectedParameter
                      ? this.state.gaugeHash[this.state.selectedParameter]
                      : null
                  }
                  parameter={this.state.selectedParameter}
                  height="280px"
                />
                {/* )} */}
              </Card>
            </Col>
            <Col sm={12} xs={24}>
              <Card size="small">
                <Select
                  onChange={this.handleSelectParameter2}
                  style={{
                    width: 160,
                  }}
                  //defaultValue={"flow"}
                  //mode="multiple"
                >
                  {this.state.data?.gauge?.map((e) => (
                    <Option key={e.parameterKey} value={e.parameterKey}>
                      {e.displayName}
                    </Option>
                  ))}
                </Select>
                {/* {!this.state.isLoading && ( */}
                <LiveChart
                  id="i2"
                  data={
                    this.state.selectedParameter2
                      ? this.state.gaugeHash[this.state.selectedParameter2]
                      : null
                  }
                  parameter={this.state.selectedParameter2}
                  height="280px"
                />
                {/* )} */}
              </Card>
            </Col>
            {/* <Col sm={12} xs={24}>
              <Card size="small">
                {!this.state.isLoading && (
                  <LiveChart
                    id="i2"
                    title="Pressure"
                    data={pressure?.value}
                    height="280px"
                  />
                )}
              </Card>
            </Col> */}
          </Row>
        </Spin>
      </Page>
    );
  }
}
const mapStateToProps = (state) => {
  return (
    {
      fireAlertsList: state.loggedReducer.fireAlertsList,
      assetAlertsList: state.loggedReducer.pumpAlertsList,
    } ?? {}
  );
};
export default connect(
  mapStateToProps,
  {}
)(withForm(withRouter(AssetMonitoringParameters)));
