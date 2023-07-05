import {
  Card,
  Col,
  Descriptions,
  Drawer,
  Form,
  Image,
  Layout,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import moment from "moment";
import React from "react";
import "react-multi-carousel/lib/styles.css";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { remoteAsset, rootUrl } from "../../../helpers/url";
import AssetService from "../../../services/asset-service";
import PlantService from "../../../services/plant-service";
import Page from "../../../utils/page/page";
import { withForm } from "../../../utils/with-form";
import { withRouter } from "../../../utils/with-router";
import FilterFunctions from "../common/filter-functions";
import ParameterGraphService from "../services/parameter-graph-service";
import ParameterList from "./parameter-list";
import { Typography } from 'antd';


const { Header, Sider, Content } = Layout;
const { confirm } = Modal;
const { Text, Title } = Typography;


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 5,
    partialVisibilityGutter: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5,
    partialVisibilityGutter: 10,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 4,
    partialVisibilityGutter: 10,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2,
    partialVisibilityGutter: 10,
  },
};
let active;
const style = {
  formItem: {
    minWidth: "150px",
  },
};
class MonitoringParameters extends FilterFunctions {
  timeOut;
  state = {
    timer: null,
    isChecked: false,
    tileMore: true,
    widget: [],
    continentList: [],
    countryList: [],
    stateList: [],
    isLoading: false,
  };
  plantservice = new PlantService();
  assetservice = new AssetService();
  remotestartservice= new RemoteStartService();
  service = new ParameterGraphService();
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this._getData = this._getData.bind(this);
  }

  connect = (id) => {
    let ws;
    let topic = `/topic/${id}`;
    if (ws != undefined && !ws.CLOSED) ws.close();
    if (this.stompClient?.connected) this.stompClient.disconnect();
    ws = new SockJS(`${rootUrl}/ws`);
    //4.247.25.138:8080/Thingworx/WS?appKey=94eeb891-da12-42ec-8280-10a49e37068e
    ws: this.stompClient = Stomp.over(ws);

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

    this.setState((state) => ({ ...state, parameters: jsonRes }));
    // let alerts = [...this.props.alertList];

    // for (let x of jsonRes) {
    //   let index = alerts.findIndex((e) => e.alertId === x.alertId);
    //   if (index != -1) {
    //     alerts[index] = x;
    //   } else alerts.push(x);
    // }
    // this.props.setAlertData([...alerts.filter((e) => !e.closed)]);
  };
  errorCallBack = (error) => {
    console.log("errorCallBack -> " + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  };
  tileMore = () => {
    this.setState((state, props) => ({ ...state, tileMore: !state.tileMore }));
  };
  addWidget = () => {
    let widget = this.state.widget;
    let n = widget.length;
    widget.push("A");

    this.setState(
      (state, props) => ({
        ...state,
        widget: widget,
      }),
      () => {}
    );
  };
  componentDidMount() {
    this.getContinentList();
    this.getCustomerList();
    this.getAssetList();

    for (let i = 0; i < 4; i++) this.addWidget();
    let assetId = this.props.searchParams.get("assetId");
    
    if (assetId) {
      setTimeout(() => {
        this.props.form?.setFieldValue("asset", Number(assetId));
        this.getData(assetId);
      }, 500);
    }
  }
  getAssetList(plantId) {
    this.setState((state, props) => ({
      ...state,
      isAssetListLoading: true,
      assetList: [],
    }));
    this.assetService
      .list({ active: true, published: true, plantId: plantId })
      .then((response) => {
        this.setState((state, props) => ({
          ...state,
          assetList: response.data?.map((e) => ({
            label: e.assetName,
            value: e.assetId,
          })),
        }));
        if (response.data.length > 0) {
          this.props.form.setFieldValue("asset", response.data[0].assetId);
          this.getData(response.data[0].assetId);
        }
      })
      .finally(() => {
        this.setState((state, props) => ({
          ...state,
          isAssetListLoading: false,
          isChecked:false
        }));
      });
  }
  getData(assetId) {
    // this.connect(assetId);
    this.setState(
      (state) => ({
        ...state,
        assetId: assetId,
        isLoading: true,
        parameters: [],
        rows: [],
      }),
      () => {
        setTimeout(() => {
          this._getData();
        }, 500);
      }
    );
    return;
  }

  processData(parameters) {
    let connectionStatus, lastOnlineTime, lastOfflineTime, runningStatus;
    for (let x of parameters) {
      switch (x.parameterKey) {
        case "connectionStatus":
          connectionStatus = Boolean(x.parameterValue);
          break;
        case "runningStatus":
          runningStatus = Boolean(x.parameterValue);
          break;
        case "lastOnlineTime":
          lastOnlineTime = moment(Number(x.parameterValue));
          break;
        case "lastOfflineTime":
          lastOfflineTime = moment(Number(x.parameterValue));
          break;

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
    this.setState((state) => ({
      ...state,
      parameters: parameters
        .sort((a, b) => a.displayName.localeCompare(b.displayName))
        .filter((e) => !e.preDefinedProperties),

      status: status,
      runningStatus: runningStatus,
      connectionStatus: connectionStatus,
      // rows: response[1].data.rows,
    }));
  }


  confirmation = (checked) => {
    if(checked == true){
      confirm({
        title: "Are you sure you want to start the remote?",
        icon: <ExclamationCircleOutlined />,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",

        onOk() {
          
        },
        onCancel(){
         
        }

      });
      
    }
    else{
      console.log("TestFail");
    }
    
  };
  // isActivechange (value){
  //   let r = this.confirmation(value)
  //   console.log(r)
  //     this.setState({
  //       isChecked: r,
  //     }) 
  //   }
  
  _getData() {
    if (this.timeOut) clearTimeout(this.timeOut);
    Promise.all([
      this.assetservice.retrieve(this.state.assetId),
      this.service.list({ assetId: this.state.assetId, mode: 4 }),
    ])
      .then((response) => {
        if (response[0].data) {
          this.setState(
            (state) => ({
              ...state,
              asset: response[0].data,
              rows: response[1].data.rows,
            }),

            () => {
              // if (this.state.assetId) {
              //   this.timeOut = setTimeout(() => {
              //     this._getData(this.state.assetId);
              //   }, 1000);
              // }
            }
          );
          this.processData(response[0].data.parameters);
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
    // if (this.timeOut) clearTimeout(this.timeOut);
  }
  render() {
    
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
                onChange={(value) => this.getData(value)}
                showSearch
                loading={this.state.isAssetListLoading}
                placeholder="Asset"
                allowClear
                options={this.state.assetList}
              ></Select>
            </Form.Item>
            <Form.Item name="status" style={style.formItem}>
            <Text strong>REMOTE START   </Text>
            <Switch
              checkedChildren={"On"}
              unCheckedChildren={"Off"}
              onClick={this.confirmation}
            />
            </Form.Item>
          </Form>
        }
      >
        
        <Spin spinning={this.state.isLoading}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <div style={{ position: "relative", minHeight: "80vh" }}>
                <ParameterList parameters={this.state.parameters} />
                <Drawer
                  title="Asset Detail"
                  placement="right"
                  open={true}
                  getContainer={false}
                  style={{ position: "absolute" }}
                >
                  <Card
                    bordered={false}
                    size="small"
                    cover={
                      <Image
                        style={{
                          padding: "10px",
                          height: "200px",
                          objectFit: "scale-down",
                          border: "1px solid #eee",
                          borderRadius: "5px",
                          margin: "15px",
                          width: "calc(100% - 30px)",
                        }}
                        preview={false}
                        src={
                          this.state.asset?.imagePath
                            ? remoteAsset(this.state.asset?.imagePath)
                            : "/pump.png"
                        }
                        fallback="data:image/png;base64,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"
                      />
                    }
                  >
                    {/* <Card.Meta
                  // avatar={
                  //   this.state.asset?.connected ? (
                  //     <Text
                  //       type="success"
                  //       style={{ lineHeight: "30px" }}
                  //       title="Connected"
                  //     >
                  //       <MdWifi />
                  //     </Text>
                  //   ) : (
                  //     <Text
                  //       type="secondary"
                  //       style={{ lineHeight: "30px" }}
                  //       title="Not Connected"
                  //     >
                  //       <MdWifiOff />
                  //     </Text>
                  //   )
                  // }
                  title={<Text>{this.state.asset?.assetName}</Text>}
                  description={
                    <>
                      <div>
                        {this.state.asset?.connected ? (
                          <Badge color="green" text="Online" />
                        ) : (
                          <Badge color="#717171" text="Offline" />
                        )}
                      </div>
                      <div>
                        {this.state.asset?.runningStatus ? (
                          <Badge color="green" text="Running" />
                        ) : (
                          <Badge color="#717171" text="Not Running" />
                        )}
                      </div>
                      <Descriptions
                        className="assetDetail"
                        title={this.state.asset?.assetName}
                        column={1}
                      >
                        <Descriptions.Item label="Testing & Commissioned On">
                          20-20-2022
                        </Descriptions.Item>
                        <Descriptions.Item label="Warranty Period">
                          366 days
                        </Descriptions.Item>
                        <Descriptions.Item label="Warranty Period Till">
                          20-20-2023
                        </Descriptions.Item>
                        <Descriptions.Item label="Elapsed Time">
                          364 d 22 h 58 m
                        </Descriptions.Item>
                        <Descriptions.Item label="Warranty Status">
                          Active
                        </Descriptions.Item>
                      </Descriptions>
                    </>
                  }
                /> */}
                    <Descriptions
                      className="assetDetail"
                      title={this.state.asset?.assetName}
                      column={1}
                    >
                      <Descriptions.Item label="Testing & Commissioned On">
                        20-20-2022
                      </Descriptions.Item>
                      <Descriptions.Item label="Warranty Period">
                        366 days
                      </Descriptions.Item>
                      <Descriptions.Item label="Warranty Period Till">
                        20-20-2023
                      </Descriptions.Item>
                      <Descriptions.Item label="Elapsed Time">
                        364 d 22 h 58 m
                      </Descriptions.Item>
                      <Descriptions.Item label="Warranty Status">
                        Active
                      </Descriptions.Item>
                    </Descriptions>
                    {/* <Space>
                  <OnOffComponent
                    value={
                      this.state.asset?.runningStatus ? "Online" : "Offline"
                    }
                  />
                  <span>
                    {this.state.asset?.runningStatus ? "Running" : "Off"}
                  </span>
                </Space> */}
                    {/* <Card.Meta title={this.state.asset?.assetName} /> */}
                  </Card>
                </Drawer>
              </div>
            </Col>
            <Col span={6}></Col>
            {/* {this.state.parameters?.map((e) => (
              <Col span={6}>
                <ParameterGraph
                  size="small"
                  assetId={this.state.assetId}
                  parameters={this.state.parameters}
                  response={this.state.rows}
                />
              </Col>
            ))} */}

            {/* {this.state.widget?.map((e, i) => (
              <Col sm={12}>
             
                <Card title="Trends" size="small">
                  <ParameterGraph
                    size="small"
                    assetId={this.state.assetId}
                    parameters={this.state.parameters}
                    response={this.state.rows}
                  />
                </Card>
              </Col>
            ))} */}
          </Row>
          {/* {this.state.widget?.length < 4 && (
            <Divider plain>
              <Button
                shape="circle"
                type="primary"
                onClick={this.addWidget}
                icon={<PlusOutlined />}
              ></Button>
            </Divider>
          )} */}
        </Spin>
      </Page>
    );
  }
}

export default withForm(withRouter(MonitoringParameters));