import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";

import { Button, Form, Input, Select, Radio, Spin, Row, Col } from "antd";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import AssetLibraryAlertsService from "../../../services/asset-library-alerts-service";
import { withForm } from "../../../utils/with-form";

import { DatePicker, Checkbox } from "antd";
import moment from "moment";

import AssetLibraryService from "../../../services/asset-library-service";

const { Option } = Select;
const { TextArea } = Input;

// const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

class AlertsForm extends PageForm {
  service = new AssetLibraryAlertsService();
  assetLibraryService = new AssetLibraryService();
  closePopup = (v = false) => {
    this.props.form.resetFields();
    this.props.close(v);
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(true);
  }
  onFinish = (v) => {
    this.onSubmit({ assetLibraryId: this.props.assetLibraryId, ...v });
  };

  componentDidMount() {
    this.assetLibraryService
      .retrieve(this.props.assetLibraryId)
      .then((response) => {
        this.setState((state) => ({
          ...state,
          parameter: response.data?.parameters,
        }));
        super.componentDidMount();
      });
  }
  triggerInitialChange() {
    this.getParameter(this.props.form?.getFieldValue("parameterName"));
  }
  getParameter = (e) => {
    let parameter = e;
    let res = this.state.parameter.find((e) => e.parameterKey == parameter);
    this.setState((state) => ({ ...state, dataType: res.dataType }));
  };
  render() {
    return (
      <Popups
        footer={[
          <Row justify="space-between">
            <Col>
              {(this.props.mode == "Add" || this.props.mode == "Update") && (
                <Button key="close" onClick={this.closePopup}>
                  Cancel
                </Button>
              )}
            </Col>
            <Col>
              {(this.props.mode == "Add" || this.props.mode == "Update") && (
                <Button
                  key="submit"
                  type="primary"
                  onClick={this.props.form.submit}
                  htmlType="submit"
                >
                  {this.props.mode == "Add" ? "Save" : "Update"}
                </Button>
              )}
            </Col>
          </Row>,
        ]}
        title={this.state?.title}
        open={this.state?.open}
        onCancel={this.closePopup}
      >
        <Spin spinning={!!this.state.isLoading}>
          <Form
            layout="horizontal"
            form={this.props.form}
            labelAlign="left"
            onFinish={this.onFinish}
            className="form-horizontal"
            colon={false}
            labelCol={{ sm: 8, xs: 24 }}
            wrapperCol={{ sm: 16, xs: 24 }}
            disabled={this.props.disabled}
            initialValues={{ priority: 1 }}
          >
            <Form.Item name="alertId" hidden>
              <Input />
            </Form.Item>

            <Form.Item
              label="Alert Name"
              name="alertName"
              rules={[{ required: true, message: "Please input Alert Name!" }]}
            >
              <Input autoFocus />
            </Form.Item>
            <Form.Item label="Parameter Name" name="parameterName">
              <Select onChange={this.getParameter}>
                {this.state?.parameter?.map((e) => (
                  <Option key={`org${e.parameterId}`} value={e.parameterKey}>
                    {e.displayName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {this.state.dataType == "NUMBER" && (
              <>
                <Form.Item
                  label="Min"
                  name="min"
                  rules={[
                    {
                      required: true,
                      message: "Please select enter min value",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  label="Max"
                  name="max"
                  rules={[
                    {
                      required: true,
                      message: "Please select enter max value",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </>
            )}
            {/*   <>
                 <Form.Item
                label="Alert Type"
                name="alertType"
                rules={[{ required: true, message: "Please select the alert type" }]}
              >
                <Select showSearch>
                  <Option value="EqualTo">EqualTo</Option>
                  <Option value="NotEqualTo">NotEqualTo</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Value"
                name="value"
                rules={[{ required: true, message: "Please select the alert type" }]}
              >
                <Select showSearch>
                  <Option value="True">True</Option>
                  <Option value="False">False</Option>
                </Select>
              </Form.Item>
              </> */}
            {this.state.dataType == "STRING" ? (
              <>
                <Form.Item
                  label="Alert Type"
                  name="alertType"
                  rules={[
                    { required: true, message: "Please select the alert type" },
                  ]}
                >
                  <Select showSearch>
                    <Option value="EqualTo">EqualTo</Option>
                    <Option value="NotEqualTo">NotEqualTo</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Value"
                  name="value"
                  rules={[{ required: true, message: "Please input Value!" }]}
                >
                  <Input />
                </Form.Item>
              </>
            ) : null}
            {this.state.dataType == "BOOLEAN" ? (
              <>
                <Form.Item
                  label="Alert Type"
                  name="alertType"
                  rules={[
                    { required: true, message: "Please select the alert type" },
                  ]}
                >
                  <Select showSearch>
                    <Option value="EqualTo">EqualTo</Option>
                    <Option value="NotEqualTo">NotEqualTo</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Value"
                  name="value"
                  rules={[
                    { required: true, message: "Please select the alert type" },
                  ]}
                >
                  <Select showSearch>
                    <Option value="True">True</Option>
                    <Option value="False">False</Option>
                  </Select>
                </Form.Item>
              </>
            ) : null}
            {this.state.dataType == "DATETIME" ? (
              <>
                <Form.Item
                  label="Alert Type"
                  name="alertType"
                  rules={[
                    { required: true, message: "Please select the alert type" },
                  ]}
                >
                  <Select showSearch>
                    <Option value="EqualTo">EqualTo</Option>
                    <Option value="NotEqualTo">NotEqualTo</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Date" name="Date">
                  <DatePicker />
                </Form.Item>
              </>
            ) : null}

            <Form.Item label="Description" name="description">
              <TextArea rows={2} maxLength={20} />
            </Form.Item>
            <Form.Item
              label="Priority"
              name="priority"
              rules={[
                { required: true, message: "Please select the priority" },
              ]}
              hidden
            >
              <InputNumber min="1" max="10" defaultValue="1" />
            </Form.Item>

            <Form.Item
              label="Alarm Type"
              name="alarmType"
              rules={[
                { required: true, message: "Please select the alert type" },
              ]}
            >
              <Select showSearch>
                <Option value={1}>Fire Alarm</Option>
                <Option value={2}>Pump Alarm</Option>
                <Option value={3}>Notification Only</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Notification Type"
              name="notificationType"
              rules={[
                {
                  required: true,
                  message: "Please select the notification type",
                },
              ]}
            >
              <Checkbox.Group
                options={[
                  { label: "e-Mail", value: 1 },
                  { label: "SMS", value: 2 },
                ]}
              />
            </Form.Item>
          </Form>
        </Spin>
      </Popups>
    );
  }
}

export default withForm(AlertsForm);
