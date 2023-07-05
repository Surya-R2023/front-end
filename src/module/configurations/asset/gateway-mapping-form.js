import { Button, Col, Form, Input, Row, Select, Spin } from "antd";
import React from "react";
import AssetService from "../../../services/asset-service";
import GatewayMappingService from "../../../services/gateway-mapping-service";
import PageForm from "../../../utils/page/page-form";
import { withForm } from "../../../utils/with-form";
const { TextArea } = Input;
const { Option } = Select;

// const FormComponent = (props) => {
//   const [form] = Form.useForm();
//   const [server, setServer] = useState([]);

//   useEffect(() => {
//     onFill();
//   }, [props.initialValues]);
//   useEffect(() => {
//     let serverService = new GatewayMappingService();

//     serverService.list({ active: true }).then((response) => {
//       setServer(response.data);
//     });
//   }, []);
//   const onReset = () => {
//     form.resetFields();
//   };
//   const onFill = () => {
//     form.setFieldsValue(props.initialValues);
//   };

//   return (

//   );
// };

class GatewayMappingForm extends PageForm {
  serverService = new GatewayMappingService();
  service = new AssetService();
  closePopup = () => {
    this.props.next();
  };
  saveFn(data) {
    if (this.props.assetId) return this.service.patch(data, this.props.assetId);
    return this.service.add(data);
  }
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup();
  }
  back = () => {
    this.props.prev();
  };
  componentDidMount() {
    this.serverService.list({ active: true }).then((response) => {
      this.setState((e) => ({ ...this.state, server: response.data }));
    });
    this.service.retrieve(this.props.assetId).then((response) => {
      let data = response.data;
      this.props.form.setFieldsValue({
        mqttConfigId: data.mqttConfigId,
        connectivityProtocol: data.connectivityProtocol,
        topicName: data.topicName,
      });
    });

    super.componentDidMount();
  }
  componentWillUnmount() {
    this.props.form.resetFields();
  }
  render() {
    return (
      <Spin spinning={!!this.state.isLoading}>
        <Form
          // className="form-horizontal"
          // colon={false}
          // labelCol={{ sm: 4, xs: 24 }}
          // wrapperCol={{ sm: 5, xs: 24 }}
          // labelAlign="left"
          size="small"
          layout="vertical"
          form={this.props.form}
          onFinish={this.onFinish}
        >
          <Row gutter={[20, 20]}>
            <Col sm={8} xs={24}>
              <Form.Item name="assetId" hidden>
                <Input />
              </Form.Item>
              <Form.Item
                label="Connectivity Protocol"
                name="connectivityProtocol"
                rules={[
                  { required: true, message: "Please select the gateway" },
                ]}
              >
                <Select value="MQTT">
                  <Option value="MQTT">MQTT</Option>
                  <Option value="Kepware" disabled>
                    Kepware
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col sm={8} xs={24}>
              <Form.Item
                label="Server"
                name="mqttConfigId"
                rules={[
                  { required: true, message: "Please select the gateway" },
                ]}
              >
                <Select>
                  {this.state.server?.map((e) => (
                    <Option key={`org${e.mqttConfigId}`} value={e.mqttConfigId}>
                      {e.serverName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={8} xs={24}>
              <Form.Item
                name="topicName"
                label="Topic Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the Topic",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20} justify="space-between">
            <Col>
              <Button onClick={this.back}>Back</Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
}

export default withForm(GatewayMappingForm);
