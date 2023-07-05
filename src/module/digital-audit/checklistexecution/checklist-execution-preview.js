import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import {
  message,
  Button,
  Col,
  Descriptions,
  Input,
  Row,
  Spin,
  Tag,
} from "antd";
import Moment from "moment";
import { Component } from "react";
import CheckTypeService from "../../../services/audit-services/check-type-service";
import CheckListExecutionService from "../../../services/audit-services/checklist-execution-service";
import PageList from "../../../utils/page/page-list";
import { withRouter } from "../../../utils/with-router";
const { TextArea } = Input;
class CheckListExecutionPreview extends Component {
  service = new CheckListExecutionService();
  checkTypeService = new CheckTypeService();
  state = {};

  title = "CheckList";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 20,
      align: "Left",
    },

    {
      dataIndex: "description",
      key: "description",
      title: "Check Description",
    },
    {
      dataIndex: "priority",
      key: "priority",
      title: "Priority",
    },

    {
      dataIndex: "status",
      key: "status",
      title: "Status",
    },
    {
      dataIndex: "remark",
      key: "remark",
      title: "Remarks",
    },
  ];
  onRetrieve(id) {
    this.setState({ ...this.state, isLoading: true });

    Promise.all([this.checkTypeService.list(), this.service.retrieve(id)]).then(
      (response) => {
        this.setState({
          ...this.state,
          checkType: response[0].data?.reduce((c, e) => {
            c[e.checkTypeId] = e.checkTypeName;
            return c;
          }, {}),
          data: response[1].data,
          tickets: response[1].data.checks?.filter((e) => e.status == "NO"),
          noTickets: response[1].data.checks?.filter((e) => e.status != "NO"),
          isLoading: false,
        });
      }
    );
  }

  componentDidMount() {
    if (this.props.params.id) {
      this.setState((state) => ({
        ...state,
        checkListExecutionId: this.props.params.id,
      }));
      this.onRetrieve(this.props.params.id);
    }
  }
  finish = () => {
    this.setState({ ...this.state, isLoading: true });
    this.service
      .update({ status: "Closed" }, this.props.params.id)
      .then((response) => {
        if (response.data) {
          message.success(response.data.message);
          this.props.navigate("../");
        } else message.error(response.data.message);
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        this.setState({ ...this.state, isLoading: false });
      });
  };
  statusDisp = (status) => {
    switch (status) {
      case "YES":
        return (
          <span style={{ fontWeight: 600, color: "green" }}>{status}</span>
        );
        break;
      case "NO":
        return <span style={{ fontWeight: 600, color: "red" }}>{status}</span>;
        break;
      default:
        return <span style={{ fontWeight: 600, color: "blue" }}>{status}</span>;
        break;
    }
  };
  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Row gutter={[10, 10]}>
          <Col sm={24}>
            <Descriptions
              column={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
              // bordered
              // layout="vertical"

              labelStyle={{ fontWeight: "bold" }}
            >
              <Descriptions.Item key="l1" label="Check List Description">
                {this.state.data?.description}
              </Descriptions.Item>
              <Descriptions.Item key="l2" label="Asset Name">
                {this.state.data?.asset?.assetName}
              </Descriptions.Item>
              <Descriptions.Item key="l3" label="Scheduled Date">
                {Moment(this.state.data?.startDate).format("DD-MM-YYYY")}
              </Descriptions.Item>
              <Descriptions.Item key="l4" label="Status">
                {this.state.data?.status}
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col sm={24}>
            <br />
            <br />
            <table className="table table-stripped">
              <thead>
                {this.state.tickets?.length > 0 && (
                  <tr>
                    <th width="5%">S.No</th>
                    <th>Description</th>
                    <th width="10%">Status</th>
                    <th width="30%">Remark</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {this.state.tickets?.map((e, i) => (
                  <tr key={`clechId${e.checkListExecutionChecksId}`}>
                    <td>{i + 1}</td>
                    <td>
                      {e.checkDescription} <br />
                      {e.checkListExecutionCheckType?.map((e) => (
                        <Tag color="magenta">
                          {this.state.checkType[e.checkTypeId]}
                        </Tag>
                      ))}
                    </td>
                    <td align="center">{this.statusDisp(e.status)}</td>
                    <td>{e.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="table table-stripped">
              <tbody>
                {this.state.tickets?.length > 0 && (
                  <tr
                    style={{
                      fontWeight: "700",
                      color: "red",
                      border: 0,
                      background: "#ffffff",
                    }}
                  >
                    <td
                      colspan="4"
                      align="right"
                      style={{
                        border: 0,
                      }}
                    >
                      <i>
                        Note : Tickets will be generated for the above checks.
                      </i>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <table className="table table-stripped">
              <thead>
                {this.state.noTickets?.length > 0 && (
                  <tr>
                    <th width="5%">S.No</th>
                    <th>Description</th>
                    <th width="10%">Status</th>
                    <th width="30%">Remark</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {this.state.noTickets?.map((e, i) => (
                  <tr key={`clechId${e.checkListExecutionChecksId}`}>
                    <td>{i + 1}</td>
                    <td>
                      {e.checkDescription} <br />
                      {e.checkListExecutionCheckType?.map((e) => (
                        <Tag color="blue">
                          {this.state.checkType[e.checkTypeId]}
                        </Tag>
                      ))}
                    </td>
                    <td align="center">{this.statusDisp(e.status)}</td>
                    <td>{e.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
          {this.state.data?.status != "Closed" && (
            <Col span={24}>
              <Row justify="space-between">
                <Col>
                  <Button onClick={this.props.prev}>Back</Button>
                </Col>
                <Col>
                  <Button type="primary" onClick={this.finish}>
                    Raise Ticket(s)
                  </Button>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Spin>
    );
  }
}
export default withRouter(CheckListExecutionPreview);
