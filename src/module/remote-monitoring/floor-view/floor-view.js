import {
  Card,
  Col,
  message,
  Row,
  List,
  Avatar,
  Image,
  Table,
  Form,
  Select,
  Input,
  Spin,
  Typography,
} from "antd";
import React, { Component } from "react";
import { MdWifi, MdWifiOff } from "react-icons/md";
import OnOffComponent from "../../../utils/on-off-component";
import Page from "../../../utils/page/page";
import Floor from "./floor.png";
import { HiBellAlert } from "react-icons/hi2";
import ImageMapper from "react-image-mapper";
import { withRouter } from "../../../utils/with-router";
import AssetService from "../../../services/asset-service";
import { remoteAsset } from "../../../helpers/url";
import { Link } from "react-router-dom";
import PlantService from "../../../services/plant-service";
import RemoteMonitoringHomeService from "../../../services/remote-monitoring-home-service";
import FilterFunctions from "../common/filter-functions";
import { withForm } from "../../../utils/with-form";
const { Title, Text } = Typography;
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
const mapper = [
  {
    id: 1046,
    shape: "circle",
    coords: [421, 274, 10],
    preFillColor: "blue",
    assetId: 1046,
  },
  {
    id: 1054,
    shape: "circle",
    coords: [465, 218, 10],
    preFillColor: "blue",
    assetId: 1054,
  },
  {
    id: 1101,
    shape: "circle",
    coords: [533, 211, 10],
    preFillColor: "blue",
    assetId: 1101,
  },
  {
    id: 1038,
    shape: "circle",
    coords: [573, 321, 10],
    preFillColor: "blue",
    assetId: 1038,
  },
];
class FloorView extends FilterFunctions {
  assetService = new AssetService();
  plantService = new PlantService();
  remoteMonitoringService = new RemoteMonitoringHomeService();
  state = {
    plantId: undefined,
    map: {
      name: "generated",
      areas: mapper,
    },
  };

  getData = (plantId) => {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.getAssetList(plantId);
    Promise.all([
      this.assetService.list({ plantId: plantId }),
      this.plantService.retrieve(plantId),
      this.remoteMonitoringService.getCustomerSummary({
        customerId: plantId,
      }),
    ])
      .then((response) => {
        this.setState((state) => ({
          ...state,
          plantId: plantId,
          assetList: response[0].data,
          plant: response[1].data,
          asset:
            response[2].data.length > 0 ? response[2].data[0]?.asset ?? [] : [],
        }));
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };

  getAssetList(plantId) {
    this.assetService.list({ plantId: plantId }).then((response) => {
      this.setState((state) => ({
        ...state,
        map: {
          name: "generated",
          areas: mapper.map((e) => {
            let asset = response.data?.find((el) => el.assetId == e.id);
            let color = "blue";
            let parameter = asset?.parameters.find(
              (e) => e.displayName == "Smoke Detector"
            );
            if (
              parameter?.parameterValue == "Fault" ||
              String(parameter?.parameterValue) == "Fault" ||
              parameter?.parameterValue?.includes("Fault")
            ) {
              color = "red";
            }

            return {
              ...e,
              preFillColor: color,
            };
          }),
        },
      }));
    });
  }

  componentDidMount() {
    this.getCustomerList();
    this.getContinentList();
    this.setState((state) => ({ ...state, isLoading: true }));
    let plantId = this.props.searchParams.get("plantId");
    if (plantId) {
      this.props.form.setFieldValue("customerId", Number(plantId));
      this.getData(plantId);
    }
  }
  handleClick = (area, index, event) => {
    console.log(area);
  };
  onImageClick = (event) => {
    // this.setState((state) => {
    //   let map = state.map;
    //   let x = event.nativeEvent.layerX;
    //   let y = event.nativeEvent.layerY;
    //   map.areas.push({
    //     id: Date.now(),
    //     shape: "circle",
    //     coords: [x, y, 10],
    //     preFillColor: "red",
    //   });
    //   console.log(JSON.stringify(map));
    //   return { ...state, map: map };
    // });
  };
  render() {
    const getMode = (x) => {
      let mode = 1;
      if (x.fireAlarm) mode = 3;
      else if (x.pumpAlarm) mode = 2;
      else mode = 1;
      return mode;
    };
    const data = this.state.plant ?? {};

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

        render: (value, record) => {
          return (
            <Link to={`../monitoring?assetId=${record.assetId}`}>{value}</Link>
          );
        },
      },
      {
        title: "Connection Status",
        dataIndex: "connectionStatus",
        key: "connectionStatus",
        sorter: (a, b) =>
          Number(a.connectionStatus ?? 0) - Number(b.connectionStatus ?? 0),

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
        align: "center",
        width: 150,
        sorter: (a, b) =>
          Number(a.runningStatus ?? 0) - Number(b.runningStatus ?? 0),
        render: (value) => {
          return <OnOffComponent value={value} />;
        },
      },
      {
        title: "Alert",
        dataIndex: "alertStatus",
        key: "alertStatus",
        align: "center",
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
                <img src="/siren.gif" style={{ width: "20px" }} />
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
      <Page
        title={
          <Row align="middle" gutter={10}>
            <Col>{data?.customerName}</Col>
            <Col>
              {data?.hazardousMaterial && (
                <Image src="/warning.gif" preview={false} width="40px" />
              )}
            </Col>
          </Row>
        }
        filter={
          <Form
            size="small"
            // onFinish={this.search}
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
            <Form.Item name="floorId" initialValue={1} style={style.formItem}>
              <Select
                showArrow={false}
                showSearch
                loading={this.state.isCustomerListLoading}
                placeholder="Floor"
              >
                <Select.Option value={1}>Ground Floor</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        }
      >
        <Spin spinning={this.state.isLoading}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              {data?.customerName && (
                <Title level={2}>{data?.customerName} - Ground Floor</Title>
              )}
            </Col>

            <Col sm={12} xs={24}>
              <Card bodyStyle={{ overflow: "auto" }}>
                <ImageMapper
                  onImageClick={this.onImageClick}
                  src={Floor}
                  width={500}
                  imgWidth={940}
                  onClick={this.handleClick}
                  map={this.state.map}
                />
              </Card>
            </Col>
            <Col sm={12} xs={24}>
              <Card>
                <Table
                  columns={columns}
                  dataSource={this.state.asset}
                  size="small"
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>
        </Spin>
      </Page>
    );
  }
}

export default withForm(withRouter(FloorView));
