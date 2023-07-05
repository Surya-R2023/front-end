import {
  CalendarOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Select,
  Spin,
  Typography,
  Space,
  Avatar,
  Table,
  message,
  Input,
} from "antd";
import { Link } from "react-router-dom";
import TimeSeriesGraph from "../../../component/TimeSeriesGraph";
import Page from "../../../utils/page/page";
import { withForm } from "../../../utils/with-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterFunctions from "../../remote-monitoring/common/filter-functions";
import ContinentService from "../../../services/continent-service";
import CountryService from "../../../services/country-service";
import DateFilter from "../../remote-monitoring/common/date-filter";
import EnergyLiveMonitoringService from "../../../services/energy-live-service";
import { dateFormat } from "../../../helpers/date-format";
import moment from "moment";
import { withRouter } from "../../../utils/with-router";
const style = {
  formItem: {
    minWidth: "120px",
  },
};
const { Text, Title } = Typography;
class EnergyDashboard extends FilterFunctions {
  state = { isLoading: false };
  service = new EnergyLiveMonitoringService();
  filterfunctionsservice = new FilterFunctions();
  continentService = new ContinentService();
  countryService = new CountryService();

  componentDidMount() {
    this.getContinentList();
    this.getCustomerList();
    this.getAssetList();
    let assetId = this.props.searchParams.get("assetId");

    if (assetId) {
      setTimeout(() => {
        this.props.form?.setFieldValue("assetId", Number(assetId));
        this.props.form?.submit();
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
  search = (data = {}) => {
    this.setState((state) => ({ ...state, isLoading: true }));
    let obj = { ...data };
    if (obj.mode === 5) {
      obj.fromDate = moment(data.dateRange[0]).format("YYYY-MM-DD");
      obj.toDate = moment(data.dateRange[1]).format("YYYY-MM-DD");
    }
    delete obj.dateRange;
    Promise.all([
      this.service.getTotal(data),
      this.service.getCumulativeEnergy(data),
    ])
      .then((response) => {
        this.setState((state) => ({
          ...state,
          energyTable: response[1].data?.rows?.map((e) => ({
            date: e.date,
            energyConsumption: e.consumption,
            monthConsumption: e.monthConsumption,
            cumulativeEnergy: e.cumulative,
          })),
          todaysEnergyConsumption: response[0].data.TodaysEnergyConsumption,
          monthsEnergyConsumption: response[0].data.MonthsEnergyConsumption,
          cumulativeEnergy: response[0].data.CumulativeEnergy,
          energyConsumption: [
            {
              name: "Consumption",
              data: response[1].data?.rows?.map((e) => ({
                x: e.date,
                y: e.consumption,
              })),
            },
          ],
        }));
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };
  columns = [
    {
      dataIndex: "date",
      key: "date",
      title: "Date",
      align: "left",
      render: (value) => {
        return dateFormat(value);
      },
    },
    {
      dataIndex: "energyConsumption",
      key: "energyconsumption",
      title: "Energy Consumption (KWh)",
      align: "center",
      render: (value) => {
        return value.toFixed(2);
      },
    },
    {
      dataIndex: "monthConsumption",
      key: "month consumption",
      title: "MonthConsumption (kWh)",
      align: "center",
      render: (value) => {
        return value.toFixed(2);
      },
    },
    {
      dataIndex: "cumulativeEnergy",
      key: "cumulative energy",
      title: "Cumulative Energy (KWh)",
      align: "center",
      render: (value) => {
        return value.toFixed(2);
      },
    },
  ];

  render() {
    return (
      <Page
        title="Energy Consumption"
        filter={
          <Form
            size="small"
            onFinish={this.search}
            form={this.props.form}
            initialValues={{ mode: 2 }}
            layout="inline"
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
            <Form.Item name="customer" style={style.formItem}>
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
            <DateFilter />
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                Go
              </Button>
              <Link to="../live-monitoring">
                <Button
                  type="primary"
                  icon={<FontAwesomeIcon icon="fa-solid fa-chart-line" />}
                >
                  &nbsp; Live
                </Button>
              </Link>
            </Space>
          </Form>
        }
      >
        <Spin spinning={this.state.isLoading}>
          <Row gutter={[10, 10]}>
            <Col sm={8} md={7} lg={6}>
              <Space
                size={10}
                direction="vertical"
                // size="middle"
                style={{
                  display: "flex",
                }}
              >
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
                        icon={<CalendarOutlined />}
                      />
                    }
                    title={
                      <Title level={2} style={{ marginBottom: 0 }}>
                        {Number(
                          this.state.todaysEnergyConsumption ?? 0
                        )?.toFixed(2)}{" "}
                        KWh
                      </Title>
                    }
                    description="Today's Consumption"
                  ></Card.Meta>
                </Card>
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
                        icon={<CalendarOutlined />}
                      />
                    }
                    title={
                      <Title level={2} style={{ marginBottom: 0 }}>
                        {Number(
                          this.state.todaysEnergyConsumption ?? 0
                        )?.toFixed(2)}{" "}
                        KWh
                      </Title>
                    }
                    description="Month Consumption"
                  ></Card.Meta>
                </Card>
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
                        icon={<CalendarOutlined />}
                      />
                    }
                    title={
                      <Title level={2} style={{ marginBottom: 0 }}>
                        {Number(this.state.cumulativeEnergy ?? 0)?.toFixed(2)}{" "}
                        KWh
                      </Title>
                    }
                    description="Cumulative Consumption"
                  ></Card.Meta>
                </Card>
              </Space>
            </Col>

            <Col sm={16} md={17} lg={18}>
              <Card
                bodyStyle={{ padding: 0, height: "355px", overflow: "hidden" }}
              >
                <Table
                  scroll={{ y: "260px" }}
                  dataSource={this.state.energyTable}
                  columns={this.columns}
                  size="small"
                />
              </Card>
            </Col>
            <Col sm={24}>
              <Card title="Energy Consumption">
                <TimeSeriesGraph
                  hideLabel={true}
                  height={225}
                  series={this.state.energyConsumption}
                />
              </Card>
            </Col>
          </Row>
        </Spin>
      </Page>
    );
  }
}

export default withRouter(withForm(EnergyDashboard));
