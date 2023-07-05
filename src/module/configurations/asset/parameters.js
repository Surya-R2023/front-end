import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table } from "antd";
import ParameterForm from "./parameters-form";
import { Col, Button, Row, message } from "antd";
import UploadTemplate from "./parameter-upload-form";
import {
  DownloadOutlined,
  UploadOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import axios from "axios";
import AssetService from "../../../services/asset-service";
import { withRouter } from "../../../utils/with-router";
import Page from "../../../utils/page/page";
import AssetParametersService from "../../../services/asset-parameters-service";
import UploadDownloadService from "../../../services/upload-download-service";
import { rootUrl } from "../../../helpers/url";
// import ExcelUploadButton from "../../../utils/upload-button/excel-upload-button";
import Upload from "antd/es/upload/Upload";
class Parameters extends PageList {
  state = { fileList: [] };
  service = new AssetParametersService();
  parameterUploadService = new UploadDownloadService();
  title = "Parameter";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      align: "left",
    },
    {
      dataIndex: "displayName",
      key: "displayName",
      title: "Display Name",
      align: "left",
      sorter: (a, b) => a.displayName.localeCompare(b.displayName),
    },
    {
      dataIndex: "parameterKey",
      key: "parameterKey",
      title: "Parameter Name",
      align: "left",
      sorter: (a, b) => a.parameterKey.localeCompare(b.parameterKey),
    },

    {
      dataIndex: "dataType",
      key: "dataType",
      title: "Data Type",
      align: "left",
      sorter: (a, b) => a.dataType.localeCompare(b.dataType),
    },
    {
      dataIndex: "orderNo",
      key: "orderNo",
      title: "Order No",
      align: "left",
      sorter: (a, b) => a.orderNo ?? 0 - b.orderNo ?? 0,
      defaultSortOrder: "ascend",
    },
    // {
    //   dataIndex: "parameterValue",
    //   key: "parameterValue",
    //   title: "Value",
    //   align: "left",
    // },
    // {
    //   dataIndex: "active",
    //   key: "active",
    //   title: "Status",
    //   align: "left",
    //   render: (value) => {
    //     return !!value ? "Active" : "In-active";
    //   },
    // },
    {
      dataIndex: "parameterId",
      key: "parameterId",
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

handleDownload = () => {
 
  const url = `${rootUrl}/download/assetParameters/excel?assetId=${this.props.assetId}`;
  // console.log(url);
 
  this.parameterUploadService.download(url).then((response)=>{ 
      const urlBlob = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = "asset-parameter.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);})
};

  handleTemplateDownload = () => {
    
   
      let url;
      url = `${rootUrl}/template/assetParameter-template`;
       const fileName = 'assetParameter-template.csv';
    
      this.parameterUploadService .download(url) .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      
      });
    };
    
  
  parameterUpload = () => {
    var assetId = this.props.assetId;
    this.list({ assetId });
  };
  render() {
    console.log("fileList", this.state.fileList);
    return (
      <div>
        <Row justify="end">
          <Col lg={1}>
            <Button
              icon={<FileExcelOutlined />}
              onClick={this.handleTemplateDownload }
            ></Button>
          </Col>
          <Col lg={1}>
            <UploadTemplate
              assetId={this.props.assetId}
              list={this.parameterUpload}
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
          rowKey="assetparameterId"
          loading={this.state.isLoading}
          dataSource={this.state.rows}
          columns={this.columns}
          size="middle"
          pagination={{
            showSizeChanger: true,

            showQuickJumper: true,

            size: "default",
          }}
        />

        <ParameterForm
          assetId={this.props.assetId}
          {...this.state.popup}
          close={this.onClose}
        />
        <br></br>

        <Row justify="space-between">
          <Col>
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

export default withRouter(Parameters);
