// import PageList from "../../../utils/page/page-list";
import { Table, Button, Form, Select, Col, Row, Card } from "antd";

import { Link } from "react-router-dom";
import { withRouter } from "../../../utils/with-router";
import AssetService from "../../../services/asset-service";
import WorkorderResolutionService from "../../../services/audit-services/workorder-resolution-service";
import Page from "../../../utils/page/page";
import moment from "moment";
import {
  PlayCircleOutlined,
  FundViewOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import FilterFunctions from "../../remote-monitoring/common/filter-functions";
import PageList from "../../../utils/page/page-list";
import ResolutionWorkOrderVerify from "./resolution-work-order-verify";
import { withForm } from "../../../utils/with-form";

const style = {
  formItem: {
    minWidth: "120px",
  },
};

class ResolutionWorkOrder extends FilterFunctions {
  service = new WorkorderResolutionService();
  assetService = new AssetService();

  componentDidMount() {
    this.getContinentList();
    this.getCustomerList();
    this.getCountryList();
    this.getStateList();
    this.getAssetList();
    let status = this.props.searchParams.get("status");
    if (status) {
      setTimeout(() => {
        this.props.form?.setFieldValue("status", Number(status));
        this.props.form?.submit();
      }, 500);
    } else {
      super.componentDidMount();
    }
  }

  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      align: "left",
      width: 80,
    },
    {
      dataIndex: "rwoNumber",
      key: "rwoNumber",
      title: "WO Number",
      align: "left",
      width: 160,
    },
    {
      title: "Date",
      key: "startDate",
      dataIndex: "startDate",
      width: 100,
      render: (value) => {
        return value ? moment(value).format("DD-MM-YYYY") : "-";
      },
    },
    {
      dataIndex: "asset",
      key: "asset",
      title: "Asset Name",

      render: (value) => {
        return value?.assetName;
      },
    },
    {
      dataIndex: "description",
      key: "description",
      title: "Description",
    },

    {
      dataIndex: "priority",
      key: "priority",
      title: "Priority",
      align: "left",
      width: 100,
    },

    // {
    //   title: "Due Date",
    //   key: "dueDate",
    //   dataIndex: "dueDate",
    //   width: 100,
    //   render: (value) => {
    //     return value ? moment(value).format("DD-MM-YYYY") : "-";
    //   },
    // },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      width: 100,
      render: (value) => {
        return this.service.status(value);
      },
    },
    {
      dataIndex: "resolutionWorkOrderId",
      key: "resolutionWorkOrderId",
      title: "Action",
      width: 160,
      align: "center",
      render: (value, record, index) => {
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

  getData(assetId) {
    this.assetService
      .retrieve(assetId)
      .then((response) => {
        var self = this;
        if (response.data) {
          this.setState(
            (state) => ({
              ...state,
              isLoading: false,
              parameters: response.data.parameters,
              asset: response.data,
            }),
            () => {
              self.timeOut = setTimeout(() => {
                this._getData(assetId);
              }, 500);
            }
          );
        }
      })
      .catch((err) => {
        clearTimeout(this.timeOut);
      });
  }
  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }
  submitForm = (value) => {
    this.list(value);
  };

  render() {
    return (
      <Page
        title={this.title}
        filter={
          <Form
            form={this.props.form}
            size="small"
            layout="inline"
            onFinish={this.submitForm}
          >
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
            <Form.Item name="priority" style={style.formItem}>
              <Select placeholder="Priority" allowClear>
                <Select.Option value={0}>High</Select.Option>
                <Select.Option value={1}>Medium</Select.Option>
                <Select.Option value={2}>Low</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="status" style={style.formItem}>
              <Select placeholder="Status" allowClear>
                <Select.Option value={0}>Opened</Select.Option>
                <Select.Option value={1}>Assigned</Select.Option>
                <Select.Option value={2}>Resolved</Select.Option>
                <Select.Option value={3}>Verified</Select.Option>
                <Select.Option value={5}>Completed</Select.Option>
                <Select.Option value={4}>Rejected</Select.Option>
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
          rowKey="resolutionWorkOrderId"
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
        {this.state.popup?.open && (
          <ResolutionWorkOrderVerify
            {...this.state.popup}
            close={this.onClose}
          />
        )}
      </Page>
    );
  }
}

export default withForm(withRouter(ResolutionWorkOrder));
