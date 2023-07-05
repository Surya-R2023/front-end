import EmailService from "../../../services/email-service";
import React, { useEffect } from "react";
import { Button, Form, Input, Select, Spin, Radio, Row, Col, Layout, Card, } from "antd";
import PageForm from "../../../utils/page/page-form";
import Page from "../../../utils/page/page";
import Popups from "../../../utils/page/popups";
import { withForm } from "../../../utils/with-form";
import ButtonGroup from "antd/lib/button/button-group";
import { Checkbox } from 'antd';

const { Option } = Select;

class Email extends PageForm {
  service = new EmailService();

  render() {
    return (


      <Page title="Email & SMS Configuration">

        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>

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
                  label="SMTP Server"
                  name="smptServer"
                  rules={[
                    { required: true, },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label="SMTP Server Port" name="smptserverPort">
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email Account"
                  name="emailAccount"
                  rules={[
                    { required: true, message: "Please enter your Email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label="User Password" name="userpassword"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}>
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Radio.Group>
                    <Checkbox onChange={this.onChange}>Use SSL</Checkbox>
                    <Checkbox style={{ marginLeft: "200px" }} onChange={this.onChange}>Use TSL</Checkbox>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="Connection Timeout(ms)" name="connectionTimeout">

                  <Input />
                </Form.Item>

                <Form.Item label="Connection Timeout(ms)" name="connectionTimeout">
                  <Input />
                </Form.Item>


                <Form.Item label="Operation Timeout(ms)" name="operationTimeout">
                  <Input />
                </Form.Item>

                <Form.Item label="SOCKS Host" name="socksHost">
                  <Input />
                </Form.Item>

                <Form.Item label="SOCKS Port" name="socksPort">
                  <Input />
                </Form.Item>


                <ButtonGroup>
                  <Button style={{ marginLeft: "200px" }} key="submit"
                    type="primary"
                    onClick={this.props.form.submit}
                    htmlType="submit">Save</Button>

                  <Button style={{ marginLeft: "100px" }} key="submit"
                    type="primary"
                    onClick={this.props.form.submit}
                    htmlType="submit">Test</Button>
                </ButtonGroup>
              </Form>

            </Card>
          </Col>

          <Form
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
          <Col span={36}>
            <Card bordered={false}>
              <Col sm={36} md={36} lg={36} xs={24}>
                <Form.Item label="Auth Token" name="authToken">
                  <Input />
                </Form.Item>
                <Form.Item label="Caller Id" name="callerId">
                  <Input />
                </Form.Item>
                <Form.Item label="Account SID" name="accountSID">
                  <Input />
                </Form.Item>
                <Button style={{ marginLeft: "350px" }} key="submit"
                  type="primary"
                  onClick={this.props.form.submit}
                  htmlType="submit">Save</Button>
              </Col>
            </Card>
          </Col>
          </Form>
        </Row>
       
      </Page>

    );
  }
}

export default withForm(Email);
