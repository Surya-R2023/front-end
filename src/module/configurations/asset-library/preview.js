import { Card, message, Spin } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Page from "../../../utils/page/page";
import {
  Table,
  Row,
  Col,
  Button,
  Typography,
  Descriptions,
  Collapse,
} from "antd";
import AssetLibraryService from "../../../services/asset-library-service";
import AssetLibraryParametersService from "../../../services/asset-library-parameters-service";
import AssetLibraryServiceBasicDetails from "../../../services/asset-library-service";
import AssetLibraryAlertsService from "../../../services/asset-library-alerts-service";
import { withRouter } from "../../../utils/with-router";
import { CaretRightOutlined } from "@ant-design/icons";
import {
  ListViewButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
const { Column } = Table;
const { Panel } = Collapse;

const parameterData = [
  {
    dataIndex: "sno",
    key: "sno",
    title: "S.No",
    align: "left",
    width: 0,
  },
  {
    dataIndex: "parameterName",
    key: "parameterName",
    title: "Parameter Name",
    align: "left",
  },
  {
    dataIndex: "unit",
    key: "unit",
    title: "Unit",
    align: "left",
  },
  {
    dataIndex: "dataType",
    key: "dataType",
    title: "Data Type",
    align: "left",
  },
];

const alertData = [
  {
    dataIndex: "sno",
    key: "sno",
    headerAlign: "center",
    title: "S.No",
    align: "right",
  },
  {
    dataIndex: "alertName",
    key: "alertName",
    title: "Alert Name",
    align: "left",
  },
  {
    dataIndex: "parameterName",
    key: "parameterName",
    title: "Parameter Name",
    align: "left",
  },
  {
    dataIndex: "alertType",
    key: "alertType",
    title: "Alert Type",
    align: "left",
  },
  {
    dataIndex: "defaultValue",
    key: "defaultValue",
    title: "Default Value",
    align: "left",
  },
];

const cardstyle = {
  width: "360px",
  height: "280px",
  borderRadius: "16px",
  marginRight: "24px",
};

class Preview extends React.Component {
  state = {};
  service = new AssetLibraryService();
  parameterService = new AssetLibraryParametersService();
  alertService = new AssetLibraryAlertsService();
  display() {
    return (
      <div className="preview">
        <Spin spinning={this.state.isLoading}>
          <Row gutter={[10, 50]}>
            <Col sm={24}>
              <Typography.Title level={5}>Basic Details</Typography.Title>
              <table className="display-table">
                <tr>
                  <td>Asset Library Name</td>
                  {/* <td>:</td> */}
                  <td>{this.state.data?.assetLibraryName}</td>
                </tr>
                <tr>
                  <td>Organisation</td>
                  {/* <td>:</td> */}
                  <td>{this.state.data?.organisation?.organisationName}</td>
                </tr>
                <tr>
                  <td>Asset Category</td>
                  {/* <td>:</td> */}
                  <td>{this.state.data?.assetCategory}</td>
                </tr>

                <tr>
                  <td>Description</td>
                  {/* <td>:</td> */}
                  <td>{this.state.data?.description}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  {/* <td>:</td> */}
                  <td>{this.state.data?.active ? "Active" : "In-Active"}</td>
                </tr>
                <tr>
                  <td>Mode</td>
                  {/* <td>:</td> */}
                  <td>{this.state.data?.publish ? "Published" : "Draft"}</td>
                </tr>
              </table>
            </Col>

            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
            >
              <Panel header="Parameter" width="100%" key="1">
                <Col sm={24} xs={24}>
                  <Typography.Title level={5}>Parameter</Typography.Title>
                  <Table
                    scroll={{ y: "350px" }}
                    size="small"
                    dataSource={this.state.data?.parameters}
                    pagination={false}
                    tableLayout="fixed"
                  >
                    <Column
                      title="Parameter Name"
                      dataIndex="parameterKey"
                      key="parameterKey"
                    />
                    <Column
                      title="Display Name"
                      dataIndex="displayName"
                      key="displayName"
                    />
                    <Column title="Unit" dataIndex="unit" key="unit" />

                    <Column
                      title="Data Type"
                      dataIndex="dataType"
                      key="dataType"
                    />
                    <Column
                      title="Default Value"
                      dataIndex="defaultValue"
                      key="defaultValue"
                    />
                  </Table>
                </Col>
              </Panel>
            </Collapse>

            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
            >
              <Panel header="Alert" width="100%" key="2">
                <Col span={24}>
                  <Typography.Title level={5}>Alert</Typography.Title>
                  <Table
                    scroll={{ y: "350px" }}
                    size="small"
                    dataSource={this.state.data?.alerts}
                    pagination={false}
                    tableLayout="fixed"
                  >
                    <Column
                      title="Alert Name"
                      dataIndex="alertName"
                      key="alertName"
                      width="194px"
                    />
                    <Column
                      title="Parameter Name"
                      dataIndex="parameterName"
                      key="parameterName"
                      width="194px"
                    />

                    <Column
                      title="Alert Type"
                      dataIndex="alertType"
                      key="alertType"
                    />
                    <Column
                      title="Priority"
                      dataIndex="priority"
                      key="priority"
                    />
                    <Column title="Min" dataIndex="min" key="min" />
                    <Column title="Max" dataIndex="max" key="max" />
                    <Column
                      title="Default Value"
                      dataIndex="value"
                      key="value"
                    />
                  </Table>
                </Col>
              </Panel>
            </Collapse>
            {this.props.mode != "View" && (
              <Col span={24}>
                <Row justify="space-between">
                  <Col>
                    <Button onClick={this.back}>Back</Button>
                  </Col>
                  <Col>
                    <Button type="primary" onClick={this.next}>
                      Finish
                    </Button>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Spin>
      </div>
    );
  }
  render() {
    return this.props.mode == "View" ? (
      <Page
        title="Asset Library Preview"
        action={
          <>
            <Link to="../">
              <ListViewButton />
            </Link>
          </>
        }
      >
        {this.display()}
      </Page>
    ) : (
      this.display()
    );
  }
  next = () => {
    this.setState({ ...this.state, isLoading: true });
    this.service
      .publish(this.props.assetLibraryId)
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
        this.setState({ ...this.state, isLoading: false });
      });
  };
  back = () => {
    this.props.prev();
  };
  componentDidMount() {
    if (this.props.assetLibraryId) {
      this.onRetrieve(this.props.assetLibraryId);
    } else this.onRetrieve(this.props.params.id);
  }
  onRetrieve(id) {
    this.setState({ ...this.state, isLoading: true });

    Promise.all([this.service.retrieve(id)]).then((response) => {
      this.setState({
        ...this.state,
        data: {
          ...response[0].data,
        },
        isLoading: false,
      });
    });
  }
}

export default withRouter(Preview);
