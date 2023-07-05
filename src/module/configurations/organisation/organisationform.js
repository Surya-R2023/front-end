import React, { useEffect, useState } from "react";
import OrganisationService from "../../../services/organisation-service";

import { Button, Form, Input, Select, Spin, Radio, Row, Col } from "antd";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import { withForm } from "../../../utils/with-form";
import { removeSpaceAndSpecialChar } from "../../../services/validation";
const { Option } = Select;

class OrganisationForm extends PageForm {
  service = new OrganisationService();
  closePopup = (status = false) => {
    this.props.form.resetFields();
    this.props.close(status);
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(true);
  }
  componentDidMount() {
    this.service.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, organisation: response.data }));
    });
    super.componentDidMount();
  }
  componentWillUnmount() {
    this.props.form.resetFields();
  }
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
           size="small"
            disabled={this.props.disabled}
            labelAlign="left"
            className="form-horizontal"
            colon={false}
            layout="horizontal"
            form={this.props.form}
            labelCol={{ sm: 8, xs: 24 }}
            wrapperCol={{ sm: 16, xs: 24 }}
            onFinish={this.onFinish}
          >
            <Form.Item hidden label="Organisation Id" name="organisationId">
              <Input />
            </Form.Item>
            <Form.Item
              label="Organisation Name"
              name="organisationName"
              rules={[
                {
                  required: true,
                  message: "Please input your organisation name!",
                },
              ]}
            >
              <Input autoFocus maxLength={20} />
            </Form.Item>
            <Form.Item label="Parent" name="parentId">
              <Select showSearch allowClear>
                {this.state.organisation?.map((e) => (
                  <Option
                    key={`Organisation${e.organisationId}`}
                    value={e.organisationId}
                  >
                    {e.organisationName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
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

export default withForm(OrganisationForm);
