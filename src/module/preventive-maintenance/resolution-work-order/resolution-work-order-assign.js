import {
  Button,
  Col,
  DatePicker,
  Descriptions,
  Form,
  Row,
  Select,
  Spin,
  Card,
} from "antd";
import { default as Moment, default as moment } from "moment";
import dayjs from "dayjs";
import React from "react";
import UserService from "../../../services/user-service";
import WorkOrderAssignService from "../../../services/preventive-maintenance-services/workorder-assign-service";
import WorkOrderResolutionService from "../../../services/preventive-maintenance-services/workorder-resolution-service";
import PageForm from "../../../utils/page/page-form";
import { withForm } from "../../../utils/with-form";
import { withRouter } from "../../../utils/with-router";

const { Option } = Select;

class ResolutionWorkOrderAssign extends PageForm {
  service = new WorkOrderResolutionService();
  assignservice = new WorkOrderAssignService();
  userService = new UserService();

  saveFn(data) {
    return this.assignservice.add({
      ...data,
      resolutionWorkOrderId: this.props.id,
    });
  }
  onSuccess(data) {
    super.onSuccess(data);
    this.props.next();
  }
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Descriptions
              column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
              //bordered
              // layout="vertical"
              size="default"
              labelStyle={{ fontWeight: "bold" }}
            >
              <Descriptions.Item key="l1" label="Description">
                {this.state.initialValues?.description}
              </Descriptions.Item>
              <Descriptions.Item key="l2" label="Asset Name">
                {this.state.initialValues?.asset?.assetName}
              </Descriptions.Item>
              <Descriptions.Item key="l3" label="Scheduled Date">
                {Moment(this.state.initialValues?.startDate).format(
                  "DD-MM-YYYY"
                )}
              </Descriptions.Item>
              <Descriptions.Item key="l4" label="Status">
                {this.service.status(this.state.initialValues?.status)}
              </Descriptions.Item>
              {/* <Descriptions.Item key="l5" label="Initiated By">
                {this.state.initialValues?.initiatedBy?.userName}
              </Descriptions.Item> */}
            </Descriptions>
          </Col>
          {/* <Col span={12}>
            <table className="display-table">
              <tr>
                <td>Work Order Description</td>
                <td>{this.state.data?.description}</td>
              </tr>

              <tr>
                <td>Asset Name</td>
                <td>{this.state.data?.asset?.assetName}</td>
              </tr>
            </table>
          </Col>
          <Col span={12}>
            <table className="display-table">
              <tr>
                <td>Start Date</td>
                <td>
                  {moment(this.state.data?.startDate).format("DD-MM-YYYY")}
                </td>
              </tr>

              <tr>
                <td>Initiated By</td>
                <td>{this.state.data?.initiatedBy?.userName}</td>
              </tr>
            </table>
          </Col> */}
          <Col span={24}>
            <div className="details">
              <Form
                size="small"
                labelAlign="left"
                colon={false}
                layout="vertical"
                form={this.props.form}
                onFinish={this.onFinish}
              >
                <Row gutter={[10, 10]}>
                  <Col sm={8}>
                    <Form.Item
                      name="assignedToId"
                      label="Assigned to"
                      rules={[
                        {
                          required: true,
                          message: "Please select the above field!",
                        },
                      ]}
                    >
                      <Select>
                        {this.state.user?.map((e) => (
                          <Option key={`User${e.userId}`} value={e.userId}>
                            {e.userName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={8}>
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
                  </Col>
                  <Col sm={8}>
                    <Form.Item
                      name="dueDate"
                      label="Due date"
                      rules={[
                        {
                          required: true,
                          message: "Please select Due Date!",
                        },
                      ]}
                    >
                      {/* <DatePicker
                        style={{ width: "100%" }}
                        format="DD-MM-YYYY"
                      /> */}
                      <DatePicker
                        defaultValue={moment()}
                        style={{ width: "100%" }}
                        format={"DD-MM-YYYY"}
                        disabledDate={(current) => {
                          return current && current < moment().add(0, "days");
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col>{/* <Button htmlType="submit">CANCEL</Button> */}</Col>
                  <Col>
                    <Button type="primary" htmlType="submit">
                      Next
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Spin>
    );
  }
  patchForm(data) {
    this.props.form.setFieldsValue({
      priority: data.priority,
      assignedToId: data.assignedToId,
      dueDate: data.dueDate ? dayjs(data.dueDate) : null,
    });
  }

  componentDidMount() {
    this.userService.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, user: response.data }));
    });

    super.componentDidMount();
  }
}

export default withForm(withRouter(ResolutionWorkOrderAssign));
