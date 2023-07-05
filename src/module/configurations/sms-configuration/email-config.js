import MailConfigurationService from "../../../services/mail-configuration-service";
import SmsConfigurationService from "../../../services/sms-configuration-service";
import PageList from "../../../utils/page/page-list";
import Page from "../../../utils/page/page";
import {
  Table,
  Steps,
  Card,
  Col,
  Row,
  Typography,
  notification,
  Form,
  message,
  InputNumber,
  Button,
  Radio,
  Select,
  Input,
  Checkbox,
  Space,
} from "antd";

import TextArea from "antd/es/input/TextArea";
import { withForm } from "../../../utils/with-form";
import { withAuthorization } from "../../../utils/with-authorization";
//import { useState } from "react";
const { Text, Link } = Typography;
const { Step } = Steps;

class MailConfiguration extends PageList {
  constructor(props) {
    super(props);
    this.state = {
      mailFormDisabled: true, // Separate formDisabled state for mail configuration
      smsFormDisabled: true, // Separate formDisabled state for SMS configuration
      // ... existing state variables
    };
  }
  service = new MailConfigurationService();
  smsservice = new SmsConfigurationService();
  closePopup = (data = false) => {
    this.props.form.resetFields();
    this.props.close(data);
    this.setState({ formDisabled: true });
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     formDisabled: true,
  //     // ...existing state variables
  //   };
  // }
  
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(true);
    notification.success({
      message: "Success",
      description: "Mail configured successfully",
      duration: 2,
    });
  }

  patchForm(data) {
    if (this.props.form) {
      console.log(data);
      this.props.form.setFieldsValue({...data});

      // setTimeout(() => {
      //   this.triggerInitialChange();
      // }, 500);
    }
  }

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      enableTLS: false,
      authentication: false,
    }));
    this.service.list({ active: true }).then((response) => {
      this.patchForm(response.data[0])
      this.setState((state) => ({ ...state, mailId: response.data }));
     

      this.smsservice.list({ active: true }).then((response) => {
       this.patchForm(response.data[0])
        this.setState((state) => ({ ...state, smsId: response.data }));
        
      });
    });
  }

  saveFn(data) {
    if (this.props.id || this.props.params?.id) {
      if (this.props.id) return this.service.update(data, this.props.id);
      else return this.service.update(data, this.props.params.id);
    }
    return this.service.add(data);
  }
  saveFun(data) {
    if (this.props.id || this.props.params?.id) {
      if (this.props.id) return this.smsservice.update(data, this.props.id);
      else return this.smsservice.update(data, this.props.params.id);
    }
    return this.smsservice.add(data);
  }
  setCheckAuthentication = (e) => {
    this.setState({ authentication: e.target.checked });
  };

  setCheckEnableTLS = (e) => {
    this.setState({ enableTLS: e.target.checked });
  };

  onSubmit = (data) => {
    console.log("button clicked", data);
    this.setState((state) => ({ ...state, isLoading: true }));
    this.saveFn(data)
      .then((response) => {
        if (response.data.success) {
          message.success(response.data.message);
          this.props.next();
        } else message.error(response.data.message);
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        this.setState({ ...this.state, isLoading: false });
      });
  };

  onSubmit1 = (data) => {
    console.log("button clicked", data);
    this.setState((state) => ({ ...state, isLoading: true }));
    this.saveFun(data)
      .then((response) => {
        if (response.data.success) {
          message.success(response.data.message);
          this.props.next();
        } else message.error(response.data.message);
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        this.setState({ ...this.state, isLoading: false });
      });
  };

  title = "SMS Configuration";

  render() {
    return (
      <Page title={this.title}>
      
            <Card title="Mail Configuration" extra={<>
             {this.props.update && <Button
                    type="primary"
                      htmlType="submit"
                      onClick={() =>
                        this.setState({ mailFormDisabled: !this.state.mailFormDisabled })
                      }
                    >
                      
                      {this.state.mailFormDisabled ? 'Update' : 'Cancel'}
                    </Button>}
            </>
            }>
            <Row justify={"space-between"}>
                  <Col>
                    
                  </Col>
                </Row>
            
              <Form
                size="small"
                form={this.props.form}
                className="form-horizontal"
                colon={false}
                labelCol={{ sm: 16, xs: 24 }}
                wrapperCol={{ sm: 16, xs: 24 }}
                labelAlign="left"
                layout="horizontal"
                onFinish={this.onSubmit}
                //disabled={this.state.formDisabled}
                disabled={this.state.mailFormDisabled}

                
              >
                <Row gutter={[20,20]} justify="space-between">
                  <Col sm={16} xs={24}>
                    <Form.Item name="mailId" hidden>
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="smtpServer"
                      label="SMTP Server"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the SmtpServer Name!",
                        },
                      ]}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Input style={{ width: "250%" }}  />
                    </Form.Item>
                    <Form.Item
                      name="smtpPort"
                      label="SMTP Port"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the SMTP port!",
                        },
                      ]}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Input style={{ width: "250%" }}  />
                    </Form.Item>
                    <Form.Item
                      name="userName"
                      label="Account User"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the UserName!",
                        },
                      ]}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Input style={{ width: "250%" }}  />
                    </Form.Item>
                    <Form.Item
                      label=" Account Password"
                      name="accountPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the Account Password!",
                        },
                      ]}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Input style={{ width: "250%" }}  />
                    </Form.Item>

                    <Form.Item
                      name="authentication"
                      label="Authentication"
                      initialValue={false}
                      valuePropName="checked"
                    >
                      <Checkbox
                        onChange={this.setCheckAuthentication}
                        checked={this.state.authentication}
                      />
                    </Form.Item>

                    <Form.Item
                      name="enableTLS"
                      label="Enable TLS"
                      initialValue={false}
                      valuePropName="checked"
                    >
                      <Checkbox
                        onChange={this.setCheckEnableTLS}
                        checked={this.state.enableTLS}
                      />
                    </Form.Item>

                    <Form.Item name="active" label="Status" initialValue={true} wrapperCol={{ span: 24 }}>
                      <Radio.Group>
                        <Space direction="horizontal">
                            <Radio value={true}>Active</Radio>
                            
                            <Radio value={false}>InActive</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify={"end"}>
                  <Col>
                    <Button
                      type="primary"
                      htmlType="mail"

                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
       
      </Page>
    );
  }
}

export default  (withForm((MailConfiguration)));