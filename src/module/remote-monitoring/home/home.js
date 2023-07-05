import { DownOutlined } from "@ant-design/icons";
import { logDOM } from "@testing-library/react";
import {
  Avatar,
  Button,
  Col,
  Collapse,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Spin,
  Table,
  Typography,
} from "antd";
import React from "react";
import { Component } from "react";
import { AiOutlineUser, AiTwotoneFire } from "react-icons/ai";
import { HiBellAlert } from "react-icons/hi2";
import { MdWifi, MdWifiOff } from "react-icons/md";
import { Link } from "react-router-dom";
import TileCardOne from "../../../component/tile-card-one";
import { remoteAsset } from "../../../helpers/url";
import RemoteMonitoringHomeService from "../../../services/remote-monitoring-home-service";
import OnOffComponent from "../../../utils/on-off-component";
import Page from "../../../utils/page/page";
import PageList from "../../../utils/page/page-list";
import { withForm } from "../../../utils/with-form";
import { withRouter } from "../../../utils/with-router";
import FilterFunctions from "../common/filter-functions";
import CustomerDetail from "./customer-detail";
import Maps from "./maps";
const { Text, Title } = Typography;
let url = window.location.href;
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
    padding: "5px 10px",
  },
};

const { Panel } = Collapse;
class Home extends FilterFunctions {
  state = {
    changeCount: 0,
    selectedCustomerId: null,
    open: false,
    isCountryListLoading: false,
    countryList: [],
    isContinentListLoading: false,
    continentList: [],
    isStateListLoading: false,
    stateList: [],
    isCustomerListLoading: false,
    siteList: [],
    filterMode: null,
    testList: [],
  };
  service = new RemoteMonitoringHomeService();
  timeOut;
  componentDidMount() {
    this.getContinentList();
    this.getCountryList();
    this.getStateList();
    this.props.form.submit();
  }
  constructor(props) {
    super(props);
    this.getCountryList = this.getCountryList.bind(this);
    this.getStateList = this.getStateList.bind(this);
  }
  onExpandedRowsChange = (expandedRows) => {
    alert(expandedRows);
  };
  componentWillUnmount() {
    if (this.timeOut) clearTimeout(this.timeOut);
  }

  getCustomerDetail = (customerId, title) => {
    this.props.navigate(`../building-view?plantId=${customerId}`);
  };
  mapData(data) {
    return data?.map((e) => {
      let icon;
      switch (e.mode) {
        case 1:
          icon = "/siren.gif";
          break;
        case 2:
          icon = "http://maps.google.com/mapfiles/ms/micons/orange.png";
          break;
        case 3:
          icon = "/bs/marker.gif";
          break;
        default:
          icon = "http://maps.google.com/mapfiles/ms/micons/green.png";
          break;
      }

      return {
        // label: e.customerName,
        title: e.customerName,
        key: e.customerId,
        icon: icon,
        mode: e.mode,
        onClick: () => this.getCustomerDetail(e.customerId, e.customerName),
        position: { lat: e.latitude, lng: e.longitude },
      };
    });
  }
  customerSummary(mode = null) {
    this.props.form?.setFieldValue("mode", mode);
    this.props.form?.submit();
  }
  // _fetchDataSync = async () => {
  //   if (this.timeOut) clearTimeout(this.timeOut);
  //   let allValues = this.props.form.getFieldsValue();
  //   let filter = {
  //     continentId: allValues.region,
  //     countryId: allValues.country,
  //     stateId: allValues.state,
  //     mode: allValues.mode,
  //   };
  //   let response = await Promise.all([
  //     this.service.getTotal(filter),
  //     this.service.getCustomerSummary(filter),
  //     this.service.getCustomerStatus(filter),
  //   ]);

  //   this.setState((state) => ({
  //     ...state,
  //     total: response[0].data,
  //     status: response[2].data,
  //     assetSummary: [
  //       {
  //         label: "Assets Online",
  //         value: response[0].data?.online,
  //         percentage: this.calcPercent(
  //           response[0].data?.online ?? 0,
  //           response[0].data?.total ?? 0
  //         ),
  //         color: "green",
  //       },
  //       {
  //         label: "Assets - Fire Alarm",
  //         value: response[0].data?.fireAlarm,
  //         percentage: this.calcPercent(
  //           response[0].data?.fireAlarm ?? 0,
  //           response[0].data?.total ?? 0
  //         ),
  //         color: "red",
  //       },
  //       {
  //         label: "Assets - Pump Alarm",
  //         value: response[0].data?.pumpAlarm,
  //         percentage: this.calcPercent(
  //           response[0].data?.pumpAlarm ?? 0,
  //           response[0].data?.total ?? 0
  //         ),
  //         color: "orange",
  //       },
  //       {
  //         label: "Assets Offline",
  //         value: response[0].data?.offline,
  //         percentage: this.calcPercent(
  //           response[0].data?.offline ?? 0,
  //           response[0].data?.total ?? 0
  //         ),
  //         color: "grey",
  //       },
  //     ],
  //     customerSummary: response[1].data.map((e, i) => ({
  //       ...e,
  //       key: i.toString(),
  //     })),
  //     isLoading: false,
  //   }));

  //   this.timeOut = setTimeout(async () => {
  //     this._fetchDataSync();
  //   }, 500);
  // };

  _fetchData = () => {
    let allValues = this.props.form.getFieldsValue();
    let filter = {
      continentId: allValues.region,
      countryId: allValues.country,
      stateId: allValues.state,
      mode: allValues.mode,
    };
    Promise.all([
      this.service.getTotal(filter),
      this.service.getCustomerSummary(filter),
      this.service.getCustomerStatus(filter),
    ])
      .then((response) => {
        setTimeout(() => {
          this.setState((state) => ({
            ...state,
            total: response[0].data,
            status: response[2].data,
            assetSummary: [
              {
                label: "Assets Online",
                value: response[0].data?.online,
                percentage: this.calcPercent(
                  response[0].data?.online ?? 0,
                  response[0].data?.total ?? 0
                ),
                color: "green",
              },
              {
                label: "Assets - Fire Alarm",
                value: response[0].data?.fireAlarm,
                percentage: this.calcPercent(
                  response[0].data?.fireAlarm ?? 0,
                  response[0].data?.total ?? 0
                ),
                color: "red",
              },
              {
                label: "Assets - Pump Alarm",
                value: response[0].data?.pumpAlarm,
                percentage: this.calcPercent(
                  response[0].data?.pumpAlarm ?? 0,
                  response[0].data?.total ?? 0
                ),
                color: "orange",
              },
              {
                label: "Assets Offline",
                value: response[0].data?.offline,
                percentage: this.calcPercent(
                  response[0].data?.offline ?? 0,
                  response[0].data?.total ?? 0
                ),
                color: "grey",
              },
            ],
            customerSummary: response[1].data.map((e, i) => ({
              ...e,
              key: i.toString(),
            })),
            //testList : this.mapData(response[1].data),
          }));
        }, 500);
        // this.timeOut = setTimeout(async () => {

        this.compareData(this.state.siteList, this.mapData(response[1].data));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };

  compareData(oldObject, newObject) {
    let check = false;
    if (oldObject.length == 0) {
      setTimeout(() => {
        this.setState((state) => ({ ...state, siteList: newObject }));
      }, 500);
    } else {
      let emptyArray = [];
      for (let x of oldObject) {
        let i = newObject.findIndex((e) => e.key === x.key);
        if (oldObject[i].mode != newObject[i].mode) {
          check = true;
          emptyArray.push(newObject[i]);
        } else {
          emptyArray.push(oldObject[i]);
        }
      }
      if (check == true) {
        this.setState((state) => ({ ...state, siteList: emptyArray }));
      }
    }
  }

  recursion() {
    this.timeOut = setTimeout(async () => {
      this._fetchData();
    }, 1000);
  }

  search = (changedValues, allValues) => {
    this.time = Date.now();
    //if (this.timeOut) clearTimeout(this.timeOut);
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    this._fetchDataSync = async () => {
      if (this.timeOut) clearTimeout(this.timeOut);
      let allValues = this.props.form.getFieldsValue();
      let filter = {
        continentId: allValues.region,
        countryId: allValues.country,
        stateId: allValues.state,
        mode: allValues.mode,
      };
      let response = await Promise.all([
        this.service.getTotal(filter),
        this.service.getCustomerSummary(filter),
        this.service.getCustomerStatus(filter),
      ]);

      this.setState((state) => ({
        ...state,
        total: response[0].data,
        status: response[2].data,
        assetSummary: [
          {
            label: "Assets Online",
            value: response[0].data?.online,
            percentage: this.calcPercent(
              response[0].data?.online ?? 0,
              response[0].data?.total ?? 0
            ),
            color: "green",
          },
          {
            label: "Assets - Fire Alarm",
            value: response[0].data?.fireAlarm,
            percentage: this.calcPercent(
              response[0].data?.fireAlarm ?? 0,
              response[0].data?.total ?? 0
            ),
            color: "red",
          },
          {
            label: "Assets - Pump Alarm",
            value: response[0].data?.pumpAlarm,
            percentage: this.calcPercent(
              response[0].data?.pumpAlarm ?? 0,
              response[0].data?.total ?? 0
            ),
            color: "orange",
          },
          {
            label: "Assets Offline",
            value: response[0].data?.offline,
            percentage: this.calcPercent(
              response[0].data?.offline ?? 0,
              response[0].data?.total ?? 0
            ),
            color: "grey",
          },
        ],
        customerSummary: response[1].data.map((e, i) => ({
          ...e,
          key: i.toString(),
        })),

        isLoading: false,
      }));

      this.compareData(this.state.siteList, this.mapData(response[1].data));
      if (this._fetchDataSync) {
        this.timeOut = setTimeout(async () => {
          this._fetchDataSync();
        }, 500);
      }
    };
    this._fetchDataSync();
  };
  toggleDrawer = () => {
    this.setState((state, props) => ({ ...state, open: !state.open }));
  };

  columns = [
    {
      title: "Site",
      dataIndex: "customerName",
      key: "customerName",
      width: "100px",
      render: (value, record) => {
        return (
          <Text
            style={{ cursor: "pointer" }}
            onClick={() => this.getCustomerDetail(record.customerId, "")}
          >
            {value}
          </Text>
        );
      },
      onCell: (_, index) => {
        return {
          colSpan: 5,
        };
      },
    },
    {
      title: "Asset Name",
      dataIndex: "assetName",
      key: "assetName",
      width: 200,

      onCell: (_, index) => {
        return {
          colSpan: 0,
        };
      },
    },
    {
      title: "Connection Status",
      dataIndex: "connectionStatus",
      key: "connectionStatus",
      // width: 200,
      sorter: true,
      align: "center",
      width: 150,
      onCell: (_, index) => {
        return {
          colSpan: 0,
        };
      },
    },
    {
      title: "On / Off Status",
      dataIndex: "runningStatus",
      key: "runningStatus",
      // width: 200,
      align: "center",
      sorter: true,
      width: 150,
      onCell: (_, index) => {
        return {
          colSpan: 0,
        };
      },
    },
    {
      title: "Alert",
      dataIndex: "alertStatus",
      key: "alertStatus",
      sorter: true,
      align: "center",
      width: 150,
      filters: [
        {
          text: "Fire Alert",
          value: 1,
        },
        {
          text: "Asset Alert",
          value: 2,
        },
      ],
      onFilter: (value, record) => {
        return value === record.mode;
      },
      onCell: (_, index) => {
        return {
          colSpan: 0,
        };
      },
    },
  ];
  calcPercent(value, total) {
    return Number((value / total) * 100);
  }
  render() {
    const getMode = (x) => {
      let mode = 1;
      if (x.fireAlarm) mode = 3;
      else if (x.pumpAlarm) mode = 2;
      else mode = 1;
      return mode;
    };
    const sort = {
      connectionStatus: undefined,
      runningStatus: undefined,
      alertStatus: undefined,
    };
    const sortFn = (obj) => {
      sort.connectionStatus = undefined;
      sort.runningStatus = undefined;
      sort.alertStatus = undefined;

      switch (obj.columnKey) {
        case "connectionStatus":
          sort.connectionStatus = obj.order;
          break;
        case "runningStatus":
          sort.runningStatus = obj.order;
          break;
        case "alertStatus":
          sort.alertStatus = obj.order;
          break;
        default:
          break;
      }
    };

    return (
      <Page
        title="Dashboard"
        filter={
          <Form
            size="small"
            onFinish={this.search}
            onValuesChange={this.search}
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
                showSearch
                loading={this.state.isStateListLoading}
                placeholder="State"
                allowClear
                options={this.state.stateList}
              ></Select>
            </Form.Item>
          </Form>
        }
      >
        <Spin spinning={this.state.isLoading}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Row gutter={[10, 10]}>
                {[
                  {
                    label: "Total Sites",
                    value: this.state.status?.total ?? 0,
                    class: "total",
                    mode: null,
                    icon: <AiOutlineUser />,
                    color: "#2196f3",
                    shadow: "rgb(33 150 243 / 15%)",
                    percentage: this.calcPercent(
                      this.state.status?.total ?? 0,
                      this.state.status?.total ?? 0
                    ),
                  },
                  {
                    label: "Online Sites",
                    value: this.state.status?.online ?? 0,
                    class: "online",
                    mode: 4,
                    icon: <MdWifi />,
                    shadow: "rgb(0 128 0 / 15%)",
                    color: "green",
                    percentage: this.calcPercent(
                      this.state.status?.online ?? 0,
                      this.state.status?.total ?? 0
                    ),
                  },
                  {
                    label: "Fire Alarm Sites",
                    value: this.state.status?.fireAlarm ?? 0,
                    class: "fireAlarm",
                    mode: 1,
                    icon: <AiTwotoneFire />,
                    color: "red",
                    shadow: "rgb(255 0 0 / 10%)",
                    percentage: this.calcPercent(
                      this.state.status?.fireAlarm ?? 0,
                      this.state.status?.total ?? 0
                    ),
                  },
                  {
                    label: "Asset Alert Sites",
                    value: this.state.status?.pumpAlarm ?? 0,
                    class: "pumpAlarm",
                    mode: 2,
                    icon: <HiBellAlert />,
                    color: "orange",
                    shadow: "rgb(255 165 0 / 10%)",
                    percentage: this.calcPercent(
                      this.state.status?.pumpAlarm ?? 0,
                      this.state.status?.total ?? 0
                    ),
                  },
                  {
                    label: "Offline Sites",
                    value: this.state.status?.offline ?? 0,
                    class: "offline",
                    mode: 3,
                    icon: <MdWifiOff />,
                    color: "grey",
                    shadow: "rgb(128 128 128 / 15%)",
                    percentage: this.calcPercent(
                      this.state.status?.offline ?? 0,
                      this.state.status?.total ?? 0
                    ),
                  },
                ].map((e) => {
                  let style =
                    this.props.form.getFieldValue("mode") == e.mode
                      ? `0 1px 2px -2px ${e.shadow}, 0 3px 6px 0 ${e.shadow}, 0 5px 12px 4px ${e.shadow}`
                      : "";
                  return (
                    <Col flex={1}>
                      <TileCardOne
                        style={{ boxShadow: style }}
                        {...e}
                        onCardClick={() => this.customerSummary(e.mode)}
                      />
                    </Col>
                  );
                })}
              </Row>
            </Col>
            <Col sm={24} xs={24} md={12} lg={12}>
              <Maps marker={this.state.siteList} />
            </Col>

            <Col md={12} lg={12} sm={24}>
              <Table
                onChange={(pagination, filters, sorter, extra) => {
                  sortFn(sorter);
                }}
                // scroll={{ y: 340 }}
                size="small"
                rowClassName={(record, index) => {
                  return record.fireAlarm > 0 ? "bold bg-row-alert" : "bold";
                }}
                columns={this.columns}
                expandable={{
                  // columnWidth: 40,
                  expandRowByClick: true,
                  showExpandColumn: true,
                  expandIcon: ({ expanded, onExpand, record }) => (
                    <DownOutlined
                      onClick={(e) => onExpand(record, e)}
                      style={{
                        transition: ".25s",
                        transform: !expanded ? "rotate(-90deg)" : "",
                      }}
                    />
                  ),
                  expandedRowRender: (record) => {
                    const columns = [
                      {
                        title: "",
                        dataIndex: "imagePath",
                        key: "imagePath",
                        render: (value, record) => {
                          return <Avatar src={remoteAsset(value)} />;
                        },
                        width: "138px",
                        align: "center",
                      },
                      {
                        title: "Asset Name",
                        dataIndex: "assetName",
                        key: "assetName",
                        width: 200,

                        render: (value, r) => {
                          return (
                            <Link
                              to={`../building-view?plantId=${record.customerId}`}
                            >
                              {value}
                            </Link>
                          );
                        },
                      },
                      {
                        title: "Connection Status",
                        dataIndex: "connectionStatus",
                        key: "connectionStatus",
                        sorter: (a, b) =>
                          Number(a.connectionStatus ?? 0) -
                          Number(b.connectionStatus ?? 0),
                        sortOrder: sort.connectionStatus,
                        align: "center",
                        width: 150,
                        render: (value) => {
                          return (
                            <Avatar
                              style={{
                                backgroundColor: value ? "green" : "grey",
                                lineHeight: "35px",
                              }}
                              icon={value ? <MdWifi /> : <MdWifiOff />}
                            />
                          );
                        },
                      },
                      {
                        title: "On / Off Status",
                        dataIndex: "runningStatus",
                        key: "runningStatus",
                        sortOrder: sort.runningStatus,
                        align: "center",
                        width: 150,
                        sorter: (a, b) =>
                          Number(a.runningStatus ?? 0) -
                          Number(b.runningStatus ?? 0),
                        render: (value) => {
                          return <OnOffComponent value={value} />;
                        },
                      },
                      {
                        title: "Alert",
                        dataIndex: "alertStatus",
                        key: "alertStatus",
                        align: "center",
                        sortOrder: sort.alertStatus,
                        width: 150,
                        sorter: (a, b) => {
                          let aMode = getMode(a);
                          let bMode = getMode(b);
                          return Number(aMode) - Number(bMode);
                        },

                        render: (value, record, index) => {
                          if (record.fireAlarm) {
                            return (
                              <span style={style.alarm}>
                                {/* <Avatar
                                  style={{ backgroundColor: "red" }}
                                  src="/siren.gif"
                                  gap={8}
                                ></Avatar> */}
                                <img
                                  src="/siren.gif"
                                  style={{ width: "20px" }}
                                />
                              </span>
                            );
                          } else if (record.pumpAlarm) {
                            return (
                              <span style={style.alarm}>
                                <Avatar
                                  style={{
                                    backgroundColor: "orange",
                                    lineHeight: "35px",
                                  }}
                                  icon={<HiBellAlert />}
                                ></Avatar>
                              </span>
                            );
                          } else {
                            return (
                              <span style={style.disable}>
                                <HiBellAlert />
                              </span>
                            );
                          }
                        },
                      },
                    ];
                    return (
                      <Table
                        showHeader={false}
                        columns={columns}
                        dataSource={record.asset}
                        size="small"
                        pagination={false}
                      />
                    );
                  },
                  indentSize: 0,
                  defaultExpandedRowKeys: ["0"],
                }}
                dataSource={this.state.customerSummary}
                pagination={false}
                indentSize={0}
              />
            </Col>
          </Row>
          <Drawer
            title={this.state?.selectedCustomerName}
            placement="right"
            closable={true}
            onClose={this.toggleDrawer}
            open={this.state.open}
            width={400}
            getContainer={true}
            // style={{ position: "absolute" }}
            // extra={<>Test</>}
          >
            {this.state.open && (
              <CustomerDetail id={this.state.selectedCustomerId} />
            )}
          </Drawer>
        </Spin>
      </Page>
    );
  }
}

export default withRouter(withForm(Home));
