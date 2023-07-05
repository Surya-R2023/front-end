import React, { useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Radio,
  Spin,
  Row,
  Col,
  Upload,
} from "antd";
import PageForm from "../../../../utils/page/page-form";
import Popups from "../../../../utils/page/popups";
import CheckService from "../../../../services/preventive-maintenance-services/check-service";

import CheckTypeService from "../../../../services/preventive-maintenance-services/check-type-service";
import { withForm } from "../../../../utils/with-form";

const { Option } = Select;

class CheckForm extends PageForm {
  label = "Check";
  service = new CheckService();
  checktypeservice = new CheckTypeService();
  closePopup = (v = false) => {
    this.props.form.resetFields();
    this.props.close(v);
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(data.data);
  }

  componentDidMount() {
    this.checktypeservice.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, checkTypeName: response.data }));
    });
    super.componentDidMount();
  }

  render() {
    return (
      <Popups
        title={this.state?.title}
        open={this.state?.open}
        onCancel={this.closePopup}
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
      >
        <Spin spinning={!!this.state.isLoading}>
          <Form
            size="small"
            className="form-horizontal"
            layout="horizontal"
            form={this.props.form}
            labelAlign="left"
            colon={false}
            labelCol={{ sm: 8, xs: 24 }}
            wrapperCol={{ sm: 16, xs: 24 }}
            disabled={this.props.disabled}
            onFinish={this.onFinish}
          >
            <Form.Item name="checkId" hidden>
              <Input />
            </Form.Item>

            <Form.Item
              label={`${this.label} Name`}
              name="checkName"
              rules={[
                {
                  required: true,
                  message: "Please enter the Check Name!",
                },
              ]}
            >
              <Input maxLength={200} />
            </Form.Item>
            <Form.Item
              label={`${this.label} Type`}
              name="checkType"
              rules={[
                {
                  required: true,
                  message: "Please select the Check Type!",
                },
              ]}
            >
              <Select mode="multiple">
                {this.state.checkTypeName?.map((e) => (
                  <Option
                    key={`CheckType${e.checkTypeId}`}
                    value={e.checkTypeId}
                  >
                    {e.checkTypeName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please select the Check Type!",
                },
              ]}
            >
              <Input.TextArea maxLength={200} />
            </Form.Item>
            <Form.Item
              name="priority"
              label="Priority"
              rules={[
                {
                  required: true,
                  message: "Please select the Priority!",
                },
              ]}
            >
              <Select>
                <Option value="HIGH">High</Option>
                <Option value="MEDIUM">Medium</Option>
                <Option value="LOW">Low</Option>
              </Select>
            </Form.Item>

            {/* <Form.Item label="Check Image " name="imagePath">
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item> */}
            <Form.Item name="active" label="Status" initialValue={true}>
              <Radio.Group>
                <Radio value={true}>Active</Radio>
                <Radio value={false}>In-active</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Spin>
      </Popups>
    );
  }
}

export default withForm(CheckForm);
