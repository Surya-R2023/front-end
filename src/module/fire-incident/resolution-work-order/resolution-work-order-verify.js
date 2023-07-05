import { Button, Col, message, Row, Space, Spin, Typography } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import WorkorderResolutionService from "../../../services/fire-incident-services/workorder-resolution-service";
import WorkOrderVerifyService from "../../../services/fire-incident-services/workorder-verify-service";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import { withForm } from "../../../utils/with-form";

class ResolutionWorkOrderVerify extends PageForm {
  service = new WorkorderResolutionService();
  verifyservice = new WorkOrderVerifyService();

  closePopup = (data = false) => {
    this.props.form.resetFields();
    this.props.close(data);
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(true);
  }

  saveFn(data) {
    return this.verifyservice.add(data);
  }
  onRetrieve(id) {
    this.setState({ ...this.state, isLoading: true });

    Promise.all([this.service.retrieve(id)]).then((response) => {
      this.setState({
        ...this.state,
        data: response[0].data,
        isLoading: false,
      });
    });
  }

  componentDidMount() {
    super.componentDidMount();
    this.onRetrieve(this.props.id);
  }

  approve = () => {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.service
      .approve({ resolutionWorkOrderId: this.props.id })
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
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };
  reject = () => {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.service
      .reject({ resolutionWorkOrderId: this.props.id })
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
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };
  closeWorkOrder = () => {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.service
      .closed({ resolutionWorkOrderId: this.props.id })
      .then((response) => {
        if (response.data.success) {
          message.success(response.data.message);
        } else message.error(response.data.message);
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };
  display() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Typography.Title level={5}>Ticket Details</Typography.Title>
            <table className="display-table">
              <tr>
                <td>Description</td>
                <td>{this.state.data?.description}</td>
              </tr>

              <tr>
                <td>Asset Name</td>
                <td>{this.state.data?.asset?.assetName}</td>
              </tr>
              <tr>
                <td>Start Date</td>
                <td>
                  {moment(this.state.data?.startDate).format("DD-MM-YYYY")}
                </td>
              </tr>
              <tr>
                <td>Due Date</td>
                <td>{moment(this.state.data?.dueDate).format("DD-MM-YYYY")}</td>
              </tr>
              {/* <tr>
                <td>Initiated By</td>
                <td>{this.state.data?.initiatedBy?.userName}</td>
              </tr> */}
              <tr>
                <td>Assigned To</td>
                <td>{this.state.data?.assignedTo?.userName}</td>
              </tr>
              <tr>
                <td>Priorty</td>
                <td>{this.state.data?.priority}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{this.service.status(this.state.data?.status)}</td>
              </tr>
            </table>
          </Col>
          <Col span={12}>
            <Typography.Title level={5}>Solution Details</Typography.Title>
            <table className="display-table">
              <tr>
                <td>RCA</td>
                <td>{this.state.data?.rca}</td>
              </tr>
              <tr>
                <td>CA</td>
                <td>{this.state.data?.ca}</td>
              </tr>
              <tr>
                <td>PA</td>
                <td>{this.state.data?.pa}</td>
              </tr>
            </table>
          </Col>
          <Col span={24}>
            <Row justify="space-between">
              <Col>
                {this.props.c < 4 ? (
                  <Button onClick={this.props.prev}>Back</Button>
                ) : (
                  <></>
                )}
              </Col>

              <Col>
                {this.props.c == 2 ? (
                  <Space>
                    <Button danger type="default" onClick={this.reject}>
                      Reject
                    </Button>
                    <Button type="primary" onClick={this.approve}>
                      Approve
                    </Button>
                  </Space>
                ) : (
                  <Link to="../">
                    <Button type="primary">Go To List</Button>
                  </Link>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    );
  }
  render() {
    return this.props.mode == "View" ? (
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
        {this.display()}
      </Popups>
    ) : (
      this.display()
    );
  }
}

export default withForm(ResolutionWorkOrderVerify);
