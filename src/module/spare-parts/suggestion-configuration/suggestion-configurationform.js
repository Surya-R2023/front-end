import React, { useEffect } from "react";
//import suggestionconfiguration from "../../../services/spare-parts-services/suggestionconfiguration-configuration-service";
import {
  Button,
  Form,
  Input,
  Select,
  Spin,
  Radio,
  Row,
  Col,
  TreeSelect,
} from "antd";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import { withForm } from "../../../utils/with-form";
import ProductService from "../../../services/spare-parts-services/product-service";
import SuggestionConfigurationService from "../../../services/spare-parts-services/suggestionconfiguration-service";

const { Option } = Select;
class SuggestionConfigurationForm extends PageForm {
  //SuggestionConfigurationService = new SuggestionConfigurationService();
  productservice = new ProductService();
  service = new SuggestionConfigurationService();

  closePopup = (data = false) => {
    this.props.form.resetFields();
    this.props.close(data);
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(true);
  }

  componentDidMount() {
    this.productservice.list({ active: true }).then((response) => {
      this.setState((state) => ({
        ...state,
        product: response.data,
      }));
    });
    super.componentDidMount();
  }

  render() {
    //console.log(this.state.product)
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
            <Form.Item name="suggestionConfigurationId" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="Alert"
              name="alert"
              rules={[{ required: true, message: "Please enter state name!" }]}
            >
              <Input autoFocus maxLength={200} />
            </Form.Item>
            <Form.Item
              label="Check Point"
              name="checkPoint"
              rules={[{ required: true, message: "Please enter state name!" }]}
            >
              <Input maxLength={200} />
            </Form.Item>
            <Form.Item
              label="Corrective Action"
              name="correctiveAction"
              rules={[{ required: true, message: "Please enter state name!" }]}
            >
              <Input maxLength={200} />
            </Form.Item>

            <Form.Item
              //hidden
              label="Product"
              name="productId"
              rules={[{ required: true, message: "Please select product" }]}
            >
              <Select>
                {this.state.product?.map((e) => (
                  <Option key={`Product${e.productId}`} value={e.productId}>
                    {e.productName}
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

export default withForm(SuggestionConfigurationForm);
