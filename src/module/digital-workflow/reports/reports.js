import { Button, Form, message, Select, Table } from "antd";
import moment from "moment";
import ContinentService from "../../../services/continent-service";
import CountryService from "../../../services/country-service";
import ReportService from "../../../services/report-service";
import Page from "../../../utils/page/page";
import { withRouter } from "../../../utils/with-router";
import FilterFunctions from "../../remote-monitoring/common/filter-functions";
import { SearchOutlined } from "@ant-design/icons";
const setData = {};

const style = {
  formItem: {
    minWidth: "120px",
  },
};

class Reports extends FilterFunctions {
  filterfunctionsservice = new FilterFunctions();
  title = "Resolution Work Order Report";

  continentService = new ContinentService();
  countryService = new CountryService();
  reportService = new ReportService();
  componentDidMount() {
    this.getContinentList();
    this.getCustomerList();
    this.getAssetList();
  }

  search = (data) => {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.reportService
      .getResolutionWorkOrder(data)
      .then((response) => {
        this.setState((state) => ({ ...state, data: response.data }));
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
      title: "S.No",
      key: "assetId",
      dataIndex: "assetId",
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: "workOrderNo",
      key: "workOrderNo",
      title: "Work Order NO",
      align: "left",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      width: 100,
      align: "left",
      render: (value) => {
        return value ? moment(value).format("DD-MM-YYYY") : "-";
      },
    },
    // {
    //   dataIndex: "assetId",
    //   key: "assetId",
    //   title: "Asset Id",
    //   align: "center",
    // },

    {
      dataIndex: "description",
      key: "description",
      title: "Description",
      align: "left",
    },
    {
      dataIndex: "rca",
      key: "rca",
      title: "RCA",
    },
    {
      dataIndex: "ca",
      key: "ca",
      title: "CA",
    },
    {
      dataIndex: "pa",
      key: "pa",
      title: "PA",
    },
    {
      dataIndex: "resolutionTime",
      key: "resolutionTime",
      title: "Resolved Time",
      align: "left",
    },
    {
      dataIndex: "resolvedBy",
      key: "resolvedBy",
      title: "Resolved By",
      align: "left",
      width: 160,
    },
  ];

  render() {
    return (
      <Page
        title={this.title}
        filter={
          <Form
            size="small"
            onFinish={this.search}
            layout="inline"
            initialValues={{ mode: 2 }}
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
                showSearch
                onChange={this.getCustomerList}
                loading={this.state.isStateListLoading}
                placeholder="State"
                allowClear
                options={this.state.stateList}
              ></Select>
            </Form.Item>
            <Form.Item name="customerId" style={style.formItem}>
              <Select
                onChange={this.getAssetList}
                showSearch
                loading={this.state.isCustomerListLoading}
                placeholder="Customer"
                allowClear
                options={this.state.customerList}
              ></Select>
            </Form.Item>
            <Form.Item name="assetId" style={style.formItem}>
              <Select
                showSearch
                loading={this.state.isAssetListLoading}
                placeholder="Asset"
                allowClear
                options={this.state.assetList}
              ></Select>
            </Form.Item>
            <Form.Item name="status" style={style.formItem}>
              <Select placeholder="Status" allowClear>
                <Select.Option value={0}>Opened</Select.Option>
                <Select.Option value={1}>Assigned</Select.Option>
                <Select.Option value={2}>Resolved</Select.Option>
                <Select.Option value={3}>Verify</Select.Option>
                <Select.Option value={4}>Rejected</Select.Option>
                <Select.Option value={5}>Approved</Select.Option>
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              <SearchOutlined /> Go
            </Button>
          </Form>
        }
      >
        <Table
          scroll={{ x: 980 }}
          rowKey="assetId"
          loading={this.state.isLoading}
          dataSource={this.state.data}
          columns={this.columns}
          size="middle"
          pagination={false}
          bordered
        />
      </Page>
    );
  }
}

export default withRouter(Reports);
