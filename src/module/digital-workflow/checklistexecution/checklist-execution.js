import PageList from "../../../utils/page/page-list";
import Page from "../../../utils/page/page";
import { Table } from "antd";
import { Button, Row, Form, Select } from "antd";
import PageForm from "../../../utils/page/page-form";
import moment from "moment";
import AssetService from "../../../services/asset-service";
import CheckListExecutionService from "../../../services/checklistexecution-service";
import { Link } from "react-router-dom";
import { PlayCircleOutlined, SearchOutlined } from "@ant-design/icons";
import FilterFunctions from "../../remote-monitoring/common/filter-functions";
const style = {
  formItem: {
    minWidth: "120px",
  },
};
class CheckListExecution extends FilterFunctions {
  assetservice = new AssetService();
  service = new CheckListExecutionService();
  // componentDidMount() {
  //   super.componentDidMount();
  //   this.assetService.list().then(response => {
  //     this.setState((state, props) => ({
  //       ...state,
  //       asset: response.data
  //     }))
  //   })
  // }
  componentDidMount() {
    this.getContinentList();
    this.getCustomerList();
    this.getCountryList();
    this.getStateList();
    this.getAssetList();
    super.componentDidMount();
  }
  service = new CheckListExecutionService();
  title = "Checklist Execution";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 20,
      align: "left",
    },

    {
      dataIndex: "startDate",
      title: "Start Date",
      // dataIndex:"startDate",
      key: "startDate",
      render: (value) => {
        return value ? moment(value).format("DD-MM-YYYY") : "-";
      },
    },

    // {
    //   dataIndex: "endDate",
    //   title: "End Date",
    //   key: "endDate",
    //   render: (value) => {
    //     return value ? moment(value).format("DD-MM-YYYY") : "-";
    //   },
    // },

    {
      dataIndex: "description",
      key: "description",
      title: "Description",
    },

    {
      dataIndex: "asset",
      key: "asset",
      title: "Asset",
      render: (value) => {
        return value.assetName;
      },
    },

    {
      dataIndex: "status",
      key: "status",
      title: "Status",
    },
    {
      dataIndex: "checkListExecutionId",
      key: "checkListExecutionId",
      title: "Action",
      width: 160,
      align: "center",
      render: (value) => {
        return (
          <>
            <Link to={`update/${value}`}>
              <Button type="primary">Open</Button>
            </Link>
          </>
        );
      },
    },
  ];

  submitForm = (value) => {
    this.list(value);
  };

  render() {
    return (
      <Page
        title={this.title}
        filter={
          <Form   size="small" layout="inline" onFinish={this.submitForm}>
            <Form.Item name="regionId" style={style.formItem}>
              <Select
                onChange={this.getCountryList}
                loading={this.state.isContinentListLoading}
                showSearch
                placeholder="Region"
                options={this.state.continentList}
              ></Select>
            </Form.Item>
            <Form.Item name="countryId" style={style.formItem}>
              <Select
                onChange={this.getStateList}
                showSearch
                loading={this.state.isCountryListLoading}
                placeholder="Country"
                allowClear
                options={this.state.countryList}
              ></Select>
            </Form.Item>
            <Form.Item name="stateId" style={style.formItem}>
              <Select
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
                onChange={this.getData}
                showSearch
                loading={this.state.isAssetListLoading}
                placeholder="Asset"
                allowClear
                options={this.state.assetList}
              ></Select>
            </Form.Item>
            <Form.Item name="status" style={style.formItem}>
              <Select placeholder="Status" allowClear>
                <Select.Option value="Scheduled">Scheduled</Select.Option>
                <Select.Option value="InProgress">In-Progress</Select.Option>
                <Select.Option value="Closed">Closed</Select.Option>
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              <SearchOutlined /> Go
            </Button>
          </Form>
        }
      >
        <Table
          rowKey="checkListExecutionId"
          scroll={{ x: 980 }}
          loading={this.state.isLoading}
          dataSource={this.state.rows}
          columns={this.columns}
          size="middle"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            size: "default",
          }}
        />
      </Page>
    );
  }
}

export default CheckListExecution;
