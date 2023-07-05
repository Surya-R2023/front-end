import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Form, Row, Col, Select, Space } from "antd";
import moment from "moment";
import React, { createRef } from "react";
import Page from "../../../utils/page/page";
import { withForm } from "../../../utils/with-form";
import DateFilter from "../common/date-filter";
import FilterFunctions from "../common/filter-functions";
import ParameterGraph from "../parameter-graph/parameter-graph";
import ParameterGraphService from "../services/parameter-graph-service";
const style = {
  formItem: {
    minWidth: "120px",
    maxWidth: "120px",
  },
};
class ParameterReport extends FilterFunctions {
  service = new ParameterGraphService();
  constructor(props) {
    super(props);
  }
  state = { form: {}, isLoading: false, rows: [] };
  componentDidMount() {
    this.getContinentList();
    this.getAssetList();
  }

  onFinish = (value) => {
    this.setState((state) => ({ ...state, isLoading: true, rows: [] }));
    Promise.all([
      this.service.parameterReport(value),
      this.assetService.retrieve(value.assetId),
    ])
      .then((response) => {
        this.setState((state) => ({
          ...state,
          assetId: value.assetId,
          rows: response[0].data.rows,
          parameters: response[1].data.parameters,
        }));
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };
  callbackAsset(data) {
    if (data.length > 0) {
      this.props.form.setFieldValue("assetId", data[0].assetId);
      this.props.form.submit();
    }
  }
  render() {
    console.log(
      "rows",
      this.state.rows,
      "parameters from rep",
      this.state.parameters
    );
    return (
      <Page
        title="Parameter Graph"
        filter={
          <Form
            size="small"
            style={{ alignItems: "baseline" }}
            onFinish={this.onFinish}
            form={this.props.form}
            layout="inline"
            initialValues={{ mode: 2 }}
          >
            <Form.Item
              name="region"
              style={style.formItem}
              // rules={[{ required: true, message: "Please select region" }]}
            >
              <Select
                required
                onChange={this.getCountryList}
                loading={this.state.isContinentListLoading}
                showSearch
                placeholder="Region"
                options={this.state.continentList}
              ></Select>
            </Form.Item>
            <Form.Item
              name="country"
              style={style.formItem}
              // rules={[{ required: true, message: "Please select country" }]}
            >
              <Select
                required
                onChange={this.getStateList}
                showSearch
                loading={this.state.isCountryListLoading}
                placeholder="Country"
                allowClear
                options={this.state.countryList}
              ></Select>
            </Form.Item>
            <Form.Item
              name="state"
              style={style.formItem}
              // rules={[{ required: true, message: "Please select state" }]}
            >
              <Select
                required
                onChange={this.getCustomerList}
                showSearch
                loading={this.state.isStateListLoading}
                placeholder="State"
                allowClear
                options={this.state.stateList}
              ></Select>
            </Form.Item>
            <Form.Item
              name="customer"
              style={style.formItem}
              // rules={[{ required: true, message: "Please select customer" }]}
            >
              <Select
                required
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
              rules={[{ required: true, message: "Please select Asset" }]}
            >
              <Select
                showSearch
                loading={this.state.isAssetListLoading}
                placeholder="Asset"
                allowClear
                options={this.state.assetList}
              ></Select>
            </Form.Item>
            <Space>
              <DateFilter />

              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                Go
              </Button>
            </Space>
          </Form>
        }
      >
        <Row gutter={[10, 10]}>
          {[1, 2].map((e) => (
            <Col md={24} sm={24}>
              <Card className="rounded" loading={this.state.isLoading}>
                <ParameterGraph
                  response={this.state.rows}
                  assetId={this.state.assetId}
                  parameters={this.state.parameters?.map((e) => ({
                    ...e,
                    parameterKey: e.parameterKey?.toLowerCase(),
                  }))}
                  bordered={false}
                  height="300px"
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Page>
    );
  }
}

export default withForm(ParameterReport);
