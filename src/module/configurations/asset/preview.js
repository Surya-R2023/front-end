import {
  Button,
  Col,
  Image,
  Row,
  Spin,
  Table,
  Typography,
  message,
  Tag,
  Collapse,
} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Page from "../../../utils/page/page";
import React from "react";
import AssetAlertsService from "../../../services/asset-alerts-service";
import AssetLibraryService from "../../../services/asset-library-service";
import AssetParametersService from "../../../services/asset-parameters-service";
import AssetService from "../../../services/asset-service";
import PlantService from "../../../services/plant-service";
import { withRouter } from "../../../utils/with-router";
import {
  ListViewButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import { UnorderedListOutlined } from "@ant-design/icons";
import { publicUrl } from "../../../helpers/url";
const { Panel } = Collapse;
const { Title } = Typography;
const { Column } = Table;

class Preview extends React.Component {
  state = {};
  service = new AssetService();
  parameterService = new AssetParametersService();
  alertService = new AssetAlertsService();
  assetLibraryService = new AssetLibraryService();
  plantservice = new PlantService();
  display() {
    return (
      <div className="preview">
        <Spin spinning={this.state.isLoading}>
          <Row gutter={[10, 50]}>
            {/* <Col span={24}>
            <h3>Basic Details</h3>
          </Col> */}
            <Col sm={24} xs={24}>
              <Typography.Title level={5}>Basic Details</Typography.Title>

              <table className="display-table">
                <tbody>
                  <tr>
                    <td>Asset Image</td>
                    {/* <td>:</td> */}
                    <td>
                      <Image
                        width={100}
                        src={`${publicUrl}/Images/${this.state.data?.imagePath}`}
                        fallback="data:image/png;base64,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"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Asset Name</td>
                    {/* <td>:</td> */}
                    <td>{this.state.data?.assetName}</td>
                  </tr>
                  <tr>
                    <td>Organisation</td>
                    {/* <td>:</td> */}
                    <td>{this.state.data?.appHierarchy?.ahname}</td>
                  </tr>
                  {/* <tr>
                    <td>Asset Library</td> */}
                    {/* <td>:</td> */}
                    {/* <td>{this.state.data?.assetLibrary?.assetLibraryName}</td>
                  </tr> */}
                  {/* <tr>
                    <td>Organisation</td> */}
                    {/* <td>:</td> */}
                    {/* <td>{this.state.data?.organisation?.organisationName}</td>
                  </tr> */}

                  {/* <tr>
                    <td>Customer</td> */}
                    {/* <td>:</td> */}
                    {/* <td>{this.state.data?.customer?.customerName}</td>
                  </tr> */}
                  {/* <tr>
                    <td>Latitude</td> */}
                    {/* <td>:</td> */}
                    {/* <td>{this.state.data?.latitude}</td>
                  </tr> */}
                  {/* <tr>
                    <td>Longitude</td> */}
                    {/* <td>:</td> */}
                    {/* <td>{this.state.data?.longitude}</td>
                  </tr> */}
                  {/* <tr>
                    <td>Connectivity Protocol</td> */}
                    {/* <td>:</td> */}
                    {/* <td>{this.state.data?.connectivityProtocol}</td>
                  </tr> */}
                  {/* <tr>
                    <td>MQTT Name</td> */}
                    {/* <td>:</td> */}
                    {/* <td>{this.state.data?.mqttConfig?.mqttName}</td>
                  </tr>
                  <tr>
                    <td>Connectivity Protocol</td>
                    {/* <td>:</td> */}
                    {/* <td>{this.state.data?.topicName}</td>
                  </tr>  */}
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
                </tbody>
              </table>
            </Col>

            {/* <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
            >
              <Panel header="Parameter" key="1">
                <Col sm={24} xs={24}>
                  <Typography.Title level={5}>Parameter</Typography.Title>
                  <Table
                    // scroll={{ y: "350px" }}
                    size="middle"
                    dataSource={this.state.data?.parameters}
                    pagination={false}
                    tableLayout="fixed"
                  >
                    {/* <Column title="SNo" dataIndex="sno" key="sno" /> */}
                    {/* <Column
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
                    <Column
                      title="Value"
                      dataIndex="parameterValue"
                      key="parameterValue"
                    />
                  </Table>
                </Col>
              </Panel> */}
            {/* </Collapse>  */}

            {/* <Collapse
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
                    // scroll={{ y: "350px" }}
                    size="middle"
                    dataSource={this.state.data?.alerts}
                    pagination={false}
                    tableLayout="fixed"
                  >
                    <Column
                      title="Parameter Name"
                      dataIndex="parameterName"
                      key="parameterName"
                      width="194px"
                    />
                    <Column
                      title="Alert Name"
                      dataIndex="alertName"
                      key="alertName"
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
            </Collapse> */}
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
    return this.props?.mode == "View" ? (
      <Page
        title="Asset Preview"
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
      .publish(this.props.assetId)
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
    if (this.props.assetId) {
      this.onRetrieve(this.props.assetId);
    } else this.onRetrieve(this.props.params.id);
  }
}

export default withRouter(Preview);
