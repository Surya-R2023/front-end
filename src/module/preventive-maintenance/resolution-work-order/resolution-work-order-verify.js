import {
  Button,
  Col,
  message,
  Row,
  Space,
  Spin,
  Typography,
  Avatar,
  Table,
} from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import WorkorderResolutionService from "../../../services/preventive-maintenance-services/workorder-resolution-service";
import WorkOrderVerifyService from "../../../services/preventive-maintenance-services/workorder-verify-service";
import CorrectiveActionSuggestionService from "../../../services/spare-parts-services/corrective-action-suggestion-service";
import EnquireService from "../../../services/spare-parts-services/enquire-service";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import { withForm } from "../../../utils/with-form";
import { useState, useEffect } from "react";
import { fallback, remoteAsset } from "../../../helpers/url";

class ResolutionWorkOrderVerify extends PageForm {
  service = new WorkorderResolutionService();
  verifyservice = new WorkOrderVerifyService();
  enquireservice = new EnquireService();
  suggestionconfigurationservice = new CorrectiveActionSuggestionService();

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

    Promise.all([
      this.service.retrieve(id),
      this.enquireservice.list({ resolutionWorkOrderId: id }),
    ]).then((response) => {
      this.setState({
        ...this.state,
        data: response[0].data,
        productdetails: response[1].data,
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
          this.props.prev();
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
                <td>R.No</td>
                <td>{this.state.data?.rwoNumber}</td>
              </tr>
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
            {/* <Typography.Title level={5}>Spare Details</Typography.Title>
            <Spare data={this.state.productdetails ?? []} /> */}
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
function Spare(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.data?.map((e) => e.product));
  }, [props.data]);
  const columns = [
    {
      dataIndex: "imageUrl",
      key: "imageUrl",
      title: "Image",
      width: "100px",
      align: "center",
      render: (value) => {
        return <Avatar src={remoteAsset(value)} shape="square" />;
      },
    },

    {
      dataIndex: "productName",
      key: "productName",
      title: "Product Name",
      align: "left",
      render: (value, record) => {
        return (
          <>
            <div>{value}</div>
            <small>{record.description}</small>
          </>
        );
      },
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
  ];
  return (
    <Table
      size="small"
      rowKey="productId"
      columns={columns}
      dataSource={data}
    />
  );
}
export default withForm(ResolutionWorkOrderVerify);
