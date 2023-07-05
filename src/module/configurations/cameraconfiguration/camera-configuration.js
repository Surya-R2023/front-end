import CameraService from "../../../services/camera-service";
import FloorService from "../../../services/floor-service";
import PlantService from "../../../services/plant-service";
import React, { useEffect } from "react";
import { Button, Form, Input, Select, Spin, Radio, Row, Col } from "antd";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import { withForm } from "../../../utils/with-form";

const { Option } = Select;

class CameraConfiguration extends PageForm {
  state = { isLoading: false };
  service = new CameraService();
  floorservice = new FloorService();
  plantservice = new PlantService();

  closePopup = (data = false) => {
    this.props.form.resetFields();
    this.props.close(data);
  };

  onSuccess(data) {
    super.onSuccess(data);
  }

  componentDidMount() {
    this.service.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, camera: response.data }));
    });
    this.floorservice.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, floor: response.data }));
    });
    this.plantservice.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, customer: response.data }));
    });
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
              label="Camera Name"
              name="cameraName"
              rules={[
                { required: true, message: "Please enter your Camera Name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Camera Url "
              name="cameraUrl"
              rules={[
                {
                  required: true,
                  message: "Please enter your Camera Url !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Task Type "
              name="taskType"
              rules={[
                { required: true, message: "Please enter your Task Type !" },
              ]}
            >
              <Select
                options={[
                  {
                    value: "taskType",
                    label: "Task Type",
                  },
                ]}
              />
            </Form.Item>

            {/* <Form.Item
              label="Plant"
              name="customerName"
              rules={[{ required: true, message: "Please enter your Plant!" }]}
            >
              <Select>
                {this.state.customer?.map((e) => (
                  <Option key={`customer${e.customerId}`} value={e.customerId}>
                    {e.customerName}
                  </Option>
                ))}
              </Select>
            </Form.Item> */}

            {/* <Form.Item
              label="Floor"
              name="floorName"
              rules={[{ required: true, message: "Please enter your Floor!" }]}
            >
              <Select>
                {this.state.floor?.map((e) => (
                  <Option key={`floor${e.floorId}`} value={e.floorId}>
                    {e.floorName}
                  </Option>
                ))}
              </Select>
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

export default withForm(CameraConfiguration);
