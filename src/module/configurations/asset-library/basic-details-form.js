import React, { useEffect, useState } from "react";
import PageForm from "../../../utils/page/page-form";
import {
  Col,
  Button,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Space,
  Radio,
} from "antd";
import OrganisationService from "../../../services/organisation-service";
import AssetLibraryService from "../../../services/asset-library-service";
import { removeSpaceAndSpecialChar } from "../../../services/validation";

const { Option } = Select;

const FormComponent = (props) => {
  const [form] = Form.useForm();
  const [organisation, setOrganisation] = useState([]);

  useEffect(() => {
    onFill();
  }, [props.initialValues]);
  useEffect(() => {
    let organisationService = new OrganisationService();
    organisationService.list({ active: true }).then((response) => {
      setOrganisation(response.data);
    });
  }, []);
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue(props.initialValues);
  };
  return (
    <Form
      // className="form-horizontal"
      size="small"
      colon={false}
      form={form}
      // labelCol={{ sm: 4, xs: 24 }}
      // wrapperCol={{ sm: 6, xs: 24 }}
      // labelAlign="left"
      layout="vertical"
      {...props}
    >
      <Row gutter={[20, 20]}>
        <Col sm={12} xs={24}>
          <Form.Item name="assetLibraryId" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="assetLibraryName"
            label="Asset Library Name"
            rules={[
              {
                required: true,
                message: "Please input the Asset Library Name",
              },
            ]}
          >
            <Input
              autoFocus
              minLength={4}
              maxLength={200}
              onKeyDown={removeSpaceAndSpecialChar}
            />
          </Form.Item>

          <Form.Item
            label="Organisation"
            name="organisationId"
            rules={[
              {
                required: true,
                message: "Please select organisation ",
              },
            ]}
          >
            <Select>
              {organisation?.map((e) => (
                <Option key={`org${e.organisationId}`} value={e.organisationId}>
                  {e.organisationName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Asset Category"
            name="assetCategory"
            rules={[
              {
                required: true,
                message: "Please select asset category ",
              },
            ]}
          >
            <Select>
              <Select.Option value="Energy Meter">Energy Meter</Select.Option>
              <Select.Option value="Other Assets">Other Assets</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col sm={12} xs={24}>
          <Form.Item label="Description" name="description">
            <Input.TextArea maxLength={200} rows={5} />
          </Form.Item>
          <Form.Item name="active" label="Status" initialValue={true}>
            <Radio.Group>
              <Radio value={true}>Active</Radio>
              <Radio value={false}>In-active</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      {/* <Form.Item 
          wrapperCol={{
            offset: 3,
            span: 8,
          }}
         >
            <Button type="primary" htmlType="submit">Next</Button>
        </Form.Item> */}
      <Row justify="end">
        <Col>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

class AssetLibraryBasicDetails extends PageForm {
  service = new AssetLibraryService();

  closePopup = (id) => {
    this.props.next(id);
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(data.data.assetLibraryId);
  }
  saveFn(data) {
    if (this.props.id) return this.service.patch(data, this.props.id);
    return this.service.add(data);
  }
  render() {
    return (
      <Spin spinning={!!this.state.isLoading}>
        <FormComponent
          key={this.props?.id}
          onFinish={this.onFinish}
          initialValues={this.state.initialValues}
          disabled={this.state?.disabled}
        />
      </Spin>
    );
  }
}

export default AssetLibraryBasicDetails;
