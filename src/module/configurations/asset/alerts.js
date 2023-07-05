import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
// import axios from "axios";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, message, Modal } from "antd";
import {
  DownloadOutlined,
  UploadOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import AlertForm from "./alerts-form";
import { Col, Button, Row, Space } from "antd";
import AssetAlertsService from "../../../services/asset-alerts-service";
import AssetService from "../../../services/asset-service";
import { rootUrl } from "../../../helpers/url";
import Upload from "antd/es/upload/Upload";
import UploadTemplate from "./alert-upload-form";
import UploadDownloadService from "../../../services/upload-download-service";
import axios from "axios";
class Alerts extends PageList {
  service = new AssetAlertsService();
  assetService = new AssetService();
  alertUploadService = new UploadDownloadService();
  componentDidMount() {
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    Promise.all([this.assetService.retrieve(this.props.assetId)])
      .then((response) => {
        this.setState((state) => ({
          ...state,
          parameters: response[0].data.parameters,
          rows: this.handleData(response[0].data.alerts),
        }));
      })
      .catch((error) => {
        console.log(error);
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
    super.list({ assetId: this.props.assetId });
  }
  getPopup = () => {
    this.setState((state)=>({...state,popupOpen:true}))
  }
  handleDownload = () => {
 
    const url =  `${rootUrl}/download/assetAlerts/excel?assetId=${this.props.assetId}`;
     console.log(url);
   
    this.alertUploadService.download(url).then((response)=>{ 
        const urlBlob = window.URL.createObjectURL(response.data);
        const a = document.createElement("a");
        a.href = urlBlob;
        a.download = "asset-alerts.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);})
  };

  handleTemplateDownload = () => {
    let url;
    url = `${rootUrl}/template/assetAlert-template`;
    const fileName = "assetAlert-template.csv";

    this.alertUploadService
      .download(url)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
        // Handle the error, display a message to the user, etc.
      });
  };
  alertUpload = () => {
    var assetId = this.props.assetId;
    this.list({ assetId });
  };
  handleUpdateTable = () => {
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    // Promise.all([this.assetService.retrieve(this.props.assetId)])
    // .then((response)=>{
    //   this.setState((state) => ({...this.state,rows:response[0].data}))
    // })
    this.setState((state) => ({
      ...state,
      isLoading: false,
    }));
  };

  render() {
    console.log(
      "ret",
      this.assetService.retrieve(this.props.assetId).then((response) => {
        console.log("res", response[0].data);
      })
    );
    return (
      <div>
        <Modal
          open={this.state.popupOpen}
          onCancel={() => {
            this.setState((state) => ({ ...state, popup: false }));
          }}
        >
          <Upload
            beforeUpload={(file) => {
              return false;
            }}
            fileList={null}
            accept={".csv"}
            onChange={this.alertUpload}
          >
            <Button icon={<UploadOutlined />}></Button>
          </Upload>
        </Modal>
        <Row justify="end">
          <Col lg={1}>
            <Button
              icon={<FileExcelOutlined />}
              onClick={this.handleTemplateDownload}
            ></Button>
          </Col>
          <Col lg={1}>
            {/* <Button icon={<UploadOutlined />} ></Button> */}
            <UploadTemplate
              assetId={this.props.assetId}
              list={this.alertUpload}
            />
          </Col>
          <Col lg={1}>
            <Button
              icon={<DownloadOutlined />}
              onClick={this.handleDownload}
            ></Button>
          </Col>
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
          assetId={this.props.assetId}
          {...this.state.popup}
          close={this.onClose}
        />
        <br />
        <Row gutter={20} justify="space-between">
          <Col sm={12} md={6} lg={6} xs={12}>
            <Button onClick={this.back}>Back</Button>
          </Col>
          <Col>
            <Space>
              <Button type="primary" onClick={this.next}>
                Next
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Alerts;
