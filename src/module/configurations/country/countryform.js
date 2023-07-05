import CountryService from "../../../services/country-service";
import ContinentService from "../../../services/continent-service";
import React, { useEffect } from "react";

import { Button, Form, Input, Select, Spin, Radio, Row, Col } from "antd";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import { withForm } from "../../../utils/with-form";
const { Option } = Select;
class CountryForm extends PageForm {
  continentservice = new ContinentService();
  service = new CountryService();
  closePopup = (data = false) => {
    this.props.form.resetFields();
    this.props.close(data);
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(true);
  }

  componentDidMount() {
    this.continentservice.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, continent: response.data }));
    });
    super.componentDidMount();
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
            labelAlign="left"
            className="form-horizontal"
            colon={false}
            layout="horizontal"
            form={this.props.form}
            labelCol={{ sm: 8, xs: 24 }}
            wrapperCol={{ sm: 16, xs: 24 }}
            onFinish={this.onFinish}
            disabled={this.props.disabled}
          >
            <Form.Item
              label="Country Name"
              name="countryName"
              rules={[
                { required: true, message: "Please enter your country name!" },
              ]}
            >
              <Input  autoFocus/>
            </Form.Item>

            <Form.Item label="Country Id" name="countryId" hidden>
              <Select></Select>
            </Form.Item>

            <Form.Item
              label="Region"
              name="continentId"
              rules={[
                { required: true, message: "Please enter your Region !" },
              ]}
            >
              <Select>
                {this.state.continent?.map((e) => (
                  <Option
                    key={`continent${e.continentId}`}
                    value={e.continentId}
                  >
                    {e.continentName}
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

export default withForm(CountryForm);
