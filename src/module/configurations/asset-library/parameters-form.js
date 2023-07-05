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
  InputNumber,
  DatePicker,
  Space,
} from "antd";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import { removeSpaceAndSpecialChar } from "../../../services/validation";
import { withForm } from "../../../utils/with-form";
import AssetLibraryParametersService from "../../../services/asset-library-parameters-service";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;

class ParametersForm extends PageForm {
  service = new AssetLibraryParametersService();
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
  isInputValue = (value) => {
    this.setState((state) => ({ ...state, dataType: value }));
    this.props.form.setFieldValue("defaultValue", null);
    this.props.form.setFieldValue("assetDisplayValue", []);
    if (value === "BOOLEAN") {
      this.props.form.setFieldValue("assetDisplayValue", [
        {
          value: "True",
          displayValue: "",
        },
        {
          value: "False",
          displayValue: "",
        },
      ]);
    }
  };
  render() {
    const dataType = this.props.form?.getFieldValue("dataType");
    return (
      <Popups
        footer={[
          <Row justify="space-between">
            <Col>
              {(this.props.mode === "Add" || this.props.mode === "Update") && (
                <Button key="close" onClick={this.closePopup}>
                  Cancel
                </Button>
              )}
            </Col>

            <Col>
              {(this.props.mode === "Add" || this.props.mode === "Update") && (
                <Button
                  key="submit"
                  type="primary"
                  onClick={this.props.form.submit}
                  htmlType="submit"
                >
                  {this.props.mode === "Add" ? "Save" : "Update"}
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
            // className="form-horizontal"
            layout="vertical"
            form={this.props.form}
            labelAlign="left"
            onFinish={this.onFinish}
            disabled={this.props.disabled}
          >
            <Row gutter={10}>
              <Col sm={12} xs={24}>
                <Form.Item name="parameterId" hidden>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Parameter Key"
                  name="parameterKey"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Parameter Key!",
                    },
                  ]}
                >
                  <Input
                    maxLength={200}
                    onKeyDown={removeSpaceAndSpecialChar}
                    autoFocus
                    readOnly={this.props.mode === "Update" ? true : false}
                  />
                </Form.Item>
              </Col>
              <Col sm={12} xs={24}>
                <Form.Item
                  label="Display Name"
                  name="displayName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Parameter Display Name!",
                    },
                  ]}
                >
                  <Input maxLength={200} />
                </Form.Item>
              </Col>
              <Col sm={24} xs={24}>
                <Form.Item label="Description" name="description">
                  <TextArea rows={2} maxLength={60} />
                </Form.Item>
              </Col>
              <Col sm={24} xs={24}>
                <Form.Item
                  label="Component"
                  name="componentId"
                  // rules={[{ required: true, message: "Please enter Component name!" }]}
                >
                  <Select>
                    {this.state.component?.map((e) => (
                      <Option
                        key={`component${e.componentId}`}
                        value={e.componentId}
                      >
                        {e.componentName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col sm={8} xs={24}>
                <Form.Item
                  label="Unit"
                  name="unit"
                  rules={[
                    { required: false, message: "Please enter the unit" },
                  ]}
                >
                  <Input maxLength={200} />
                </Form.Item>
              </Col>
              <Col sm={8} xs={24}>
                <Form.Item
                  label="Order No"
                  name="orderNo"
                  rules={[
                    { required: true, message: "Please enter the orderNo" },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col sm={8} xs={24}>
                <Form.Item
                  label="Data Type"
                  name="dataType"
                  rules={[{ required: true, message: "Please enter the unit" }]}
                >
                  <Select onChange={this.isInputValue}>
                    <Option value="STRING">STRING</Option>
                    <Option value="BOOLEAN">BOOLEAN</Option>
                    <Option value="NUMBER">NUMBER</Option>
                    <Option value="DATETIME">DATETIME</Option>
                  </Select>
                </Form.Item>
                {}
              </Col>
              {dataType === "NUMBER" && (
                <>
                  <Col sm={8} xs={24}>
                    <Form.Item
                      label="Min"
                      name="min"
                      rules={[
                        { required: true, message: "Please enter the min" },
                      ]}
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col sm={8} xs={24}>
                    <Form.Item
                      label="Max"
                      name="max"
                      rules={[
                        { required: true, message: "Please enter the max" },
                      ]}
                    >
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col sm={8} xs={24}>
                    <Form.Item label="Default Value" name="defaultValue">
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </>
              )}
              {dataType === "BOOLEAN" && (
                <Col sm={24} xs={24}>
                  <Form.Item label="Default Value" name="defaultValue">
                    <Select placeholder="Value">
                      <Option value="True" key="True">
                        True
                      </Option>
                      <Option value="False" key="False">
                        False
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              )}
              {dataType === "STRING" && (
                <Col sm={24} xs={24}>
                  <Form.Item label="Default Value" name="defaultValue">
                    <Input />
                  </Form.Item>
                </Col>
              )}
              {dataType === "DATETIME" && (
                <Col sm={24} xs={24}>
                  <Form.Item label="Default Value" name="defaultValue">
                    <DatePicker
                      style={{
                        width: 130,
                      }}
                    />
                  </Form.Item>
                </Col>
              )}
              <Col sm={24} xs={24}>
                {dataType === "BOOLEAN" || dataType === "NUMBER" ? (
                  <Form.List name="assetDisplayValue">
                    {(fields, { add, remove }) => (
                      <>
                        {fields?.map((field, i) => (
                          <Form.Item label={i === 0 ? "Display Value" : ""}>
                            <Row align="bottom" gutter={10} key={field.key}>
                              <Col span={10}>
                                <Form.Item
                                  style={{ margin: 0 }}
                                  {...field}
                                  label="Value"
                                  name={[field.name, "value"]}
                                >
                                  <Input readOnly={dataType === "BOOLEAN"} />
                                </Form.Item>
                              </Col>
                              <Col span={10}>
                                <Form.Item
                                  style={{ margin: 0 }}
                                  {...field}
                                  name={[field.name, "displayValue"]}
                                  label="Display Value"
                                  //  style={{marginLeft:"130px"}}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={4}>
                                <Button
                                  type="text"
                                  disabled={dataType === "BOOLEAN"}
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => remove(field.name)}
                                />
                              </Col>
                            </Row>
                          </Form.Item>
                        ))}
                        {dataType !== "BOOLEAN" && (
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Value
                            </Button>
                          </Form.Item>
                        )}
                      </>
                    )}
                  </Form.List>
                ) : null}
              </Col>

              <Col sm={12} xs={24}>
                <Form.Item name="active" label="Status" initialValue={true}>
                  <Radio.Group>
                    <Radio value={true}>Active</Radio>
                    <Radio value={false}>In-active</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Popups>
    );
  }
}

export default withForm(ParametersForm);
