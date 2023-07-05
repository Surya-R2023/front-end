import { BsSpeedometer } from "react-icons/bs";
import { GiLightningFrequency } from "react-icons/gi";
import { SlEnergy } from "react-icons/sl";
import { TfiBolt } from "react-icons/tfi";

import { SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Spin,
  Table,
  Typography,
} from "antd";
import ContinentService from "../../../services/continent-service";
import CountryService from "../../../services/country-service";
import Page from "../../../utils/page/page";
import { withForm } from "../../../utils/with-form";
import FilterFunctions from "../../remote-monitoring/common/filter-functions";
import DateFilter from "../../remote-monitoring/common/date-filter";
import EnergyLiveMonitoringService from "../../../services/energy-live-service";
// import HorizontalGauge from 'react-horizontal-gauge';
// import AssetService from "../../../services/asset-service";
import TimeSeriesGraph from "../../../component/TimeSeriesGraph";
import ParameterGraphService from "../../remote-monitoring/services/parameter-graph-service";
import FormItem from "antd/es/form/FormItem";

const { Text, Title } = Typography;
const chartStyle = {
  height: 250,
};

const style = {
  formItem: {
    minWidth: "120px",
  },
};

class LiveMonitoring extends FilterFunctions {
  state = { value: [], isLoading: false };
  service = new EnergyLiveMonitoringService();
  filterfunctionsservice = new FilterFunctions();
  continentService = new ContinentService();
  countryService = new CountryService();
  newService = new ParameterGraphService();

  componentDidMount() {
    this.getContinentList();
    this.getCustomerList();
    this.getAssetList();
  }
  getAssetList(plantId) {
    this.setState((state, props) => ({
      ...state,
      isAssetListLoading: true,
      assetList: [],
    }));
    this.assetService
      .list({
        active: true,
        published: true,
        plantId: plantId,
        assetCategory: "Energy Meter",
      })
      .then((response) => {
        this.setState((state, props) => ({
          ...state,
          assetList: response.data?.map((e) => ({
            label: e.assetName,
            value: e.assetId,
          })),
        }));
      })
      .finally(() => {
        this.setState((state, props) => ({
          ...state,
          isAssetListLoading: false,
        }));
      });
  }

  search = (data) => {
    this.setState((state) => ({ ...state, isLoading: true }));
    Promise.all([this.service.getTotal(data), this.service.timeSeries(data)])
      .then((response) => {
        let obj = {
          c1: [],
          c2: [],
          c3: [],
          v1: [],
          v2: [],
          v3: [],
          l1: [],
          l2: [],
          l3: [],
          pf1: [],
          pf2: [],
          pf3: [],
        };
        for (let x of response[1].data?.rows) {
          let ts = new Date(x.timestamp);
          obj.c1.push({ x: ts, y: x.A1 });
          obj.c2.push({ x: ts, y: x.A2 });
          obj.c3.push({ x: ts, y: x.A3 });
          obj.v1.push({ x: ts, y: x.V1 });
          obj.v2.push({ x: ts, y: x.V2 });
          obj.v3.push({ x: ts, y: x.V3 });
          obj.l1.push({ x: ts, y: x.L1 });
          obj.l2.push({ x: ts, y: x.L2 });
          obj.l3.push({ x: ts, y: x.L3 });
          obj.pf1.push({ x: ts, y: x.PF1 });
          obj.pf2.push({ x: ts, y: x.PF2 });
          obj.pf3.push({ x: ts, y: x.PF3 });
        }
        this.setState((state) => ({
          ...state,
          overallvalue: [
            {
              phase: "Phase 1",
              current: response[0].data.A1,
              voltage: response[0].data.V1,
              load: response[0].data.L1,
              powerFactor: response[0].data.PF1,
            },

            {
              phase: "Phase 2",
              current: response[0].data.A2,
              voltage: response[0].data.V2,
              load: response[0].data.L2,
              powerFactor: response[0].data.PF2,
            },
            {
              phase: "Phase 3",
              current: response[0].data.A3,
              voltage: response[0].data.V3,
              load: response[0].data.L3,
              powerFactor: response[0].data.PF3,
            },
          ],
          meterReading: response[0].data.METER_READING,
          frequency: response[0].data.FREQUENCY,
          avgCurrent:
            (response[0].data.A1 + response[0].data.A2 + response[0].data.A3) /
            3,
          avgVoltage:
            (response[0].data.V1 + response[0].data.V2 + response[0].data.V3) /
            3,
          current: [
            {
              name: "Phase 1",
              data: obj.c1,
            },
            {
              name: "Phase 2",
              data: obj.c2,
            },
            {
              name: "Phase 3",
              data: obj.c3,
            },
          ],
          voltage: [
            {
              name: "Phase 1",
              data: obj.v1,
            },
            {
              name: "Phase 2",
              data: obj.v2,
            },
            {
              name: "Phase 3",
              data: obj.v3,
            },
          ],
          load: [
            {
              name: "Phase 1",
              data: obj.l1,
            },
            {
              name: "Phase 2",
              data: obj.l2,
            },
            {
              name: "Phase 3",
              data: obj.l3,
            },
          ],
          powerFactor: [
            {
              name: "Phase 1",
              data: obj.pf1,
            },
            {
              name: "Phase 2",
              data: obj.pf2,
            },
            {
              name: "Phase 3",
              data: obj.pf3,
            },
          ],
        }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };
  columns = [
    {
      dataIndex: "phase",
      key: "phase",
      title: "Phase",
      align: "left",
      render: (value) => {
        return value;
      },
    },
    {
      dataIndex: "current",
      key: "current",
      title: "Current (A)",
      align: "center",
      render: (value) => {
        return value;
      },
    },
    {
      dataIndex: "voltage",
      key: "voltage",
      title: "Voltage (V)",
      align: "center",
      render: (value) => {
        return value;
      },
    },
    {
      dataIndex: "load",
      key: "load",
      title: "Load",
      align: "center",
      render: (value) => {
        return value;
      },
    },
    {
      dataIndex: "powerFactor",
      key: "powerFactor",
      title: "Power Factor",
      align: "center",
      render: (value) => {
        return value;
      },
    },
  ];

  render() {
    return (
      <Page
        title="Live Monitoring"
        filter={
          <Form
            size="small"
            onFinish={this.search}
            form={this.props.form}
            layout="inline"
            initialValues={{ mode: 1 }}
          >
            <Form.Item name="region" style={style.formItem}>
              <Select
                onChange={this.getCountryList}
                loading={this.state.isContinentListLoading}
                showSearch
                placeholder="Region"
                options={this.state.continentList}
              ></Select>
            </Form.Item>
            <Form.Item name="country" style={style.formItem}>
              <Select
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
                onChange={this.getCustomerList}
                showSearch
                loading={this.state.isStateListLoading}
                placeholder="State"
                allowClear
                options={this.state.stateList}
              ></Select>
            </Form.Item>
            <Form.Item name="machines" style={style.formItem}>
              <Select
                onChange={this.getAssetList}
                showSearch
                loading={this.state.isCustomerListLoading}
                placeholder="Customer"
                allowClear
                options={this.state.customerList}
              ></Select>
            </Form.Item>
            <Form.Item
              name="assetId"
              style={style.formItem}
              rules={[
                { required: true, message: "Please select Energy Meter" },
              ]}
            >
              <Select
                showSearch
                loading={this.state.isAssetListLoading}
                placeholder="Energy Meter"
                allowClear
                options={this.state.assetList}
              ></Select>
            </Form.Item>
            <FormItem name="mode" hidden>
              <Input />
            </FormItem>
            {/* <Form.Item name="assetId" style={style.formItem}>
              <Select
                showSearch
                loading={this.state.isAssetListLoading}
                placeholder="Asset"
                allowClear
                options={this.state.assetList}
              ></Select>
            </Form.Item> */}
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Go
            </Button>
          </Form>
        }
      >
        <Spin spinning={this.state.isLoading}>
          <Row gutter={[10, 10]}>
            <Col sm={12}>
              <Row gutter={[10, 10]}>
                <Col sm={12}>
                  <Card>
                    <Card.Meta
                      avatar={
                        <Avatar
                          shape="square"
                          size={70}
                          style={{
                            backgroundColor: "#f56a00",
                            verticalAlign: "middle",
                          }}
                          icon={<TfiBolt />}
                        />
                      }
                      title={
                        <Title level={2} style={{ marginBottom: 0 }}>
                          {Number(this.state.avgCurrent ?? 0)?.toFixed(2)}
                        </Title>
                      }
                      description="Average Current"
                    ></Card.Meta>
                  </Card>
                </Col>
                <Col sm={12}>
                  <Card>
                    <Card.Meta
                      avatar={
                        <Avatar
                          shape="square"
                          size={70}
                          style={{
                            backgroundColor: "#7265e6",
                            verticalAlign: "middle",
                          }}
                          icon={<SlEnergy />}
                        />
                      }
                      title={
                        <Title level={2} style={{ marginBottom: 0 }}>
                          {Number(this.state.avgVoltage ?? 0)?.toFixed(2)}
                        </Title>
                      }
                      description="Average Voltage"
                    ></Card.Meta>
                  </Card>
                </Col>
                <Col sm={12}>
                  <Card>
                    <Card.Meta
                      avatar={
                        <Avatar
                          shape="square"
                          size={70}
                          style={{
                            backgroundColor: "#ffbf00",
                            verticalAlign: "middle",
                          }}
                          icon={<BsSpeedometer />}
                        />
                      }
                      title={
                        <Title level={2} style={{ marginBottom: 0 }}>
                          {Number(this.state.meterReading ?? 0)?.toFixed(2)}
                        </Title>
                      }
                      description="Meter Reading"
                    ></Card.Meta>
                  </Card>
                </Col>
                <Col sm={12}>
                  <Card>
                    <Card.Meta
                      avatar={
                        <Avatar
                          shape="square"
                          size={70}
                          style={{
                            backgroundColor: "#00a2ae",
                            verticalAlign: "middle",
                          }}
                          icon={<GiLightningFrequency />}
                        />
                      }
                      title={
                        <Title level={2} style={{ marginBottom: 0 }}>
                          {Number(this.state.frequency ?? 0)?.toFixed(2)}
                        </Title>
                      }
                      description="Frequency"
                    ></Card.Meta>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col sm={12}>
              <Card
                style={{ height: "235px", overflow: "hidden" }}
                bodyStyle={{ padding: "0" }}
              >
                <Table
                  rowKey="assetId"
                  dataSource={this.state.overallvalue}
                  columns={this.columns}
                  size="large"
                  pagination={false}
                />
              </Card>
            </Col>
            <Col sm={12}>
              <Card title="Current (A)">
                <TimeSeriesGraph
                  hideLabel={true}
                  height={250}
                  series={this.state.current}
                />
              </Card>
            </Col>
            <Col sm={12}>
              <Card title="Voltage (V)">
                <TimeSeriesGraph
                  hideLabel={true}
                  height={250}
                  series={this.state.voltage}
                />
              </Card>
            </Col>
            <Col sm={12}>
              <Card title="Load (kWH)">
                <TimeSeriesGraph
                  hideLabel={true}
                  height={250}
                  series={this.state.load}
                />
              </Card>
            </Col>
            <Col sm={12}>
              <Card title="Power Factor (kW)">
                <TimeSeriesGraph
                  hideLabel={true}
                  height={250}
                  series={this.state.powerFactor}
                />
              </Card>
            </Col>
          </Row>
        </Spin>
      </Page>
    );
  }
}

export default withForm(LiveMonitoring);
