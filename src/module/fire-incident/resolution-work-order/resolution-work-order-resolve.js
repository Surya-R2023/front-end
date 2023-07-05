import PageForm from "../../../utils/page/page-form";
import { Button, Row, Col, Form, Descriptions, Input, Spin } from "antd";
import React from "react";
import WorkorderResolutionService from "../../../services/fire-incident-services/workorder-resolution-service";
import WorkOrderResolveService from "../../../services/fire-incident-services/workorder-resolve-service";
import moment from "moment";
import { withRouter } from "../../../utils/with-router";
import { withForm } from "../../../utils/with-form";

class ResolutionWorkOrderResolve extends PageForm {
  service = new WorkorderResolutionService();
  resolveservice = new WorkOrderResolveService();

  saveFn(data) {
    return this.resolveservice.add({
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
              // bordered
              // layout="vertical"

              labelStyle={{ fontWeight: "bold" }}
            >
              <Descriptions.Item key="l1" label="Description">
                {this.state.initialValues?.description}
              </Descriptions.Item>
              <Descriptions.Item key="l2" label="Asset Name">
                {this.state.initialValues?.asset?.assetName}
              </Descriptions.Item>
              {/* <Descriptions.Item key="l5" label="Initiated By">
                {this.state.initialValues?.initiatedBy?.userName}
              </Descriptions.Item> */}
              <Descriptions.Item key="l3" label="Scheduled Date">
                {moment(this.state.initialValues?.startDate).format(
                  "DD-MM-YYYY"
                )}
              </Descriptions.Item>
              <Descriptions.Item key="l8" label="Due Date">
                {moment(this.state.initialValues?.dueDate).format("DD-MM-YYYY")}
              </Descriptions.Item>

              <Descriptions.Item key="l6" label="Assigned To">
                {this.state.initialValues?.assignedTo?.userName}
              </Descriptions.Item>
              <Descriptions.Item key="l7" label="Priorty">
                {this.state.initialValues?.priority}
              </Descriptions.Item>
              <Descriptions.Item key="l4" label="Status">
                {this.service.status(this.state.initialValues?.status)}
              </Descriptions.Item>
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
            <tr>
              <td>Start Date</td>
              <td>{moment(this.state.data?.startDate).format("DD-MM-YYYY")}</td>
            </tr>
            <tr>
              <td>Due Date</td>
              <td>{moment(this.state.data?.dueDate).format("DD-MM-YYYY")}</td>
            </tr>
          </table>
        </Col>
        <Col span={12}>
          <table className="display-table">
            <tr>
              <td>Initiated By</td>
              <td>{this.state.data?.initiatedBy?.userName}</td>
            </tr>
            <tr>
              <td>Assigned By</td>
              <td>{this.state.data?.assignedTo?.userName}</td>
            </tr>
            <tr>
              <td>Priorty</td>
              <td>{this.state.data?.priority}</td>
            </tr>
          </table>
        </Col> */}
          <Col span={24}>
            <div className="details">
              <Form
                size="small"
                layout="vertical"
                labelCol={{ sm: 24, xs: 24 }}
                wrapperCol={{ sm: 24, xs: 24 }}
                onFinish={this.onFinish}
                form={this.props.form}
              >
                <Row gutter={[10, 10]}>
                  <Col span={8}>
                    <Form.Item
                      name="rca"
                      label="Root Cause Analysis"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the Root Cause!",
                        },
                      ]}
                    >
                      <Input.TextArea rows={6} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      name="ca"
                      label="Corrective Action"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the Corrective Action!",
                        },
                      ]}
                    >
                      <Input.TextArea rows={6} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="pa"
                      label="Preventive Action"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the Preventive Action!",
                        },
                      ]}
                    >
                      <Input.TextArea rows={6} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col>
                    <Button onClick={this.props.prev}>Back</Button>
                  </Col>
                  <Col>
                    <Button htmlType="submit" type="primary">
                      Send For Approval
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
}

export default withForm(ResolutionWorkOrderResolve);
