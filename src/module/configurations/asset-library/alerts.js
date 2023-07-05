import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, message, Modal } from "antd";
import AlertForm from "./alerts-form";
import { Col, Button, Row, Space } from "antd";
import AssetAlertsService from "../../../services/asset-alerts-service";
import AssetService from "../../../services/asset-service";
import AssetLibraryService from "../../../services/asset-library-service";
import AssetLibraryAlertsService from "../../../services/asset-library-alerts-service";
class Alerts extends PageList {
  service = new AssetLibraryAlertsService();
  assetLibraryService = new AssetLibraryService();

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    Promise.all([this.assetLibraryService.retrieve(this.props.assetLibraryId)])
      .then((response) => {
        this.setState((state) => ({
          ...state,
          parameters: response[0].data.parameters,
          rows: this.handleData(response[0].data.alerts),
        }));
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        this.setState((state) => ({
          ...state,
          isLoading: false,
        }));
      });
  }

  getParameterDisplayName = (key) => {
    let p = this.state.parameters.find((e) => e.parameterKey === key);
    return p?.displayName;
  };

  title = "Alert";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      headerAlign: "center",
      title: "S.No",
    },
    {
      dataIndex: "alertName",
      key: "alertName",
      title: "Alert Name",
      align: "left",
      width: "200px",
      sorter: (a, b) => a.alertName.localeCompare(b.alertName),
    },
    {
      dataIndex: "parameterName",
      key: "parameterName",
      title: "Parameter Name",
      align: "left",
      sorter: (a, b) => a.parameterName.localeCompare(b.parameterName),
      render: (value) => {
        return this.getParameterDisplayName(value);
      },
    },
    {
      dataIndex: "alarmType",
      key: "alarmType",
      title: "Alert Type",
      align: "left",
      render: (value) => {
        switch (value) {
          case 1:
            return "Fire Alarm";
            break;
          case 2:
            return "Asset Alert";
            break;
          default:
            return "Notification Only";
            break;
        }
      },
    },
    {
      dataIndex: "priority",
      key: "priority",
      title: "Priority",
      align: "right",
      key: "priority",
      sorter: (a, b) => a.priority.localeCompare(b.priority),
    },

    {
      dataIndex: "alertId",
      key: "alertId",
      title: "Action",
      width: 160,
      align: "center",
      render: (value, record, index) => {
        return (
          <>
            <ViewButton onClick={() => this.view(value)} />
            <EditButton onClick={() => this.edit(value)} />
            <DeleteButton onClick={() => this.delete(value)} />
          </>
        );
      },
    },
  ];
  next = () => {
    this.props.next();
  };
  back = () => {
    this.props.prev();
  };
  list() {
    super.list({ assetLibraryId: this.props.assetLibraryId });
  }

  render() {
    return (
      <div>
        <Row justify="end">
          <AddButton onClick={() => this.add()} />
        </Row>
        <br></br>
        <Table
          rowKey="alertId"
          pagination={{
            showSizeChanger: true,

            showQuickJumper: true,

            size: "default",
          }}
          loading={this.state.isLoading}
          dataSource={this.state.rows}
          columns={this.columns}
          size="middle"
        />
        <AlertForm
          assetLibraryId={this.props.assetLibraryId}
          {...this.state.popup}
          close={this.onClose}
        />
        <br />
        <Row gutter={20} justify="space-between">
          <Col sm={12} md={6} lg={6} xs={12}>
            <Button onClick={this.back}>Back</Button>
          </Col>
          <Col>
            
              <Button type="primary" onClick={this.next}>
                Next
              </Button>
          
          </Col>
        </Row>
      </div>
    );
  }
}

export default Alerts;
