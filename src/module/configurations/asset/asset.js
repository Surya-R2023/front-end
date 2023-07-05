import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, Badge, Button, Modal, message, Avatar,Row } from "antd";
import { Link } from "react-router-dom";
import AssetService from "../../../services/asset-service";
import OrganisationService from "../../../services/organisation-service";
import Page from "../../../utils/page/page";
import PlantService from "../../../services/plant-service";
import { QrcodeOutlined } from "@ant-design/icons";
import QRCodeForm from "../qr-code-form/qr-code-form";
import React from "react";
import { withAuthorization } from "../../../utils/with-authorization";
import AppHierarchyService from "../../../services/app-hierarchy-service";
import { remoteAsset } from "../../../helpers/url";
class Asset extends PageList {
  service = new AssetService();
  organisationServicervice = new OrganisationService();
  customerService = new PlantService();
  appHierarchyService = new AppHierarchyService();

  componentDidMount() {
    Promise.all([this.appHierarchyService.list()]).then((response) => {
      this.setState((state) => ({
        ...state,
        appHeirarchyData: response[0].data,
      }));
    });

    super.componentDidMount();
  }

  constructor(props) {
    super(props);
    this.qrRef = React.createRef();
  }

  title = "Asset";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 0,
    },
    {
      dataIndex: "imagePath",
      key: "imagePath",
      title: "Image",
      width: "100px",
      align: "center",
      render: (value) => {
        console.log("value", value);
        return <Avatar src={remoteAsset(value)} shape="square" />;
        // return <Avatar   src={`${publicUrl}/assetImages/${this.state?.imageUrl}`} shape="square" />;
      },
    },
    {
      dataIndex: "assetName",
      key: "assetName",
      title: "Asset Name",
      sorter: (a, b) => a.assetName.localeCompare(b.assetName),
      colSpan: 1,
    },

    // {
    //   dataIndex: "customer",
    //   key: "customer",
    //   title: "Project Location",
    //   // sorter: (a, b) => a.customer.localeCompare(b.customer),
    //   render: (value) => {
    //     return value?.customerName;
    //   },
    //   // sorter: (a, b) => a.customer.localeCompare(b.customer),
    //   colSpan: 1,
    // },
    {
      dataIndex: "ahid",
      key: "ahid",
      title: "Site",
      render: (value) => {
        const appheir = this.state.appHeirarchyData?.find(
          (e) => e.ahid === value
        );
        return appheir ? appheir.ahname : null;
      },
    },
    // {
    //   dataIndex: "organisation",
    //   key: "organisation",
    //   title: "Organisation",
    //   // sorter: (a, b) => a.organisation.localeCompare(b.organisation),
    //   render: (value) => {
    //     return value?.organisationName;
    //   },
    //   colSpan: 1,
    // },
    {
      dataIndex: "published",
      key: "published",
      title: "Mode",
      // sorter: (a, b) => a.published.localeCompare(b.published),
      render: (value) => {
        return value ? "Published" : "Draft";
      },
      colSpan: 1,
    },
    {
      dataIndex: "active",
      key: "active",
      title: "Status",
      render: (value) => {
        return value ? "Active" : "In-active";
      },
      colSpan: 1,
    },
    // {
    //   dataIndex: "parameters",
    //   key: "parameters",
    //   title: "Connection Status",
    //   render: (value, record, index) => {
    //     let val = value.find(
    //       (e) => e.displayName?.toLowerCase() === "connection status"
    //     );
    //     return val?.parameterValue?.toLowerCase() === "true" ? (
    //       <Badge color="green" text="Online" />
    //     ) : (
    //       <Badge color="red" text="Offline" />
    //     );
    //   },
    // },
    {
      dataIndex: "assetId",
      key: "assetId",
      title: "Action",
      width: 160,
      align: "center",
      render: (value, record, index) => {
        return (
          <>
            {this.props.qrcode && (
              <Button
                onClick={() => this.generateQR(value)}
                icon={<QrcodeOutlined />}
                type="text"
              ></Button>
            )}
            {this.props.view && (
              <Link to={`view/${value}`}>
                <ViewButton />
              </Link>
            )}
            {this.props.edit && (
              <Link to={`update/${value}`}>
                <EditButton />
              </Link>
            )}
            {this.props.delete && (
              <DeleteButton onClick={() => this.delete(value)} />
            )}
          </>
        );
      },
    },
  ];
  generateQR = (id) => {
    let link = `${window.location.protocol}//${window.location.host}/product/verification/${id}`;
    this.setState((state) => ({ ...state, openQr: true, qrLink: link }));
  };
  closeQR = () => {
    this.setState((state) => ({ ...state, openQr: false, qrLink: null }));
  };
  downloadQR = () => {
    this.qrRef.current.downloadQRCode();
    // console.log(this.qrRef.current.downloadQRCode());
    // this.qrRef.downloadQRCode()
  };

  render() {
    return (
      <Page
        title={this.title}
        // action={
        //   <>
        //     {this.props.add && (
        //       <Link to="add">
        //         <AddButton />
        //       </Link>
        //     )}
        //   </>
        // }
      >
        <br></br>
        <Row justify="end">
        {this.props.add && (
          <Link to="add">
            <AddButton />
          </Link>
        )}
        </Row>
        <br></br>
        <Table
          scroll={{ x: 980 }}
          rowKey="assetId"
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

        <Modal
          title="QR Code"
          open={this.state?.openQr ?? false}
          onCancel={this.closeQR}
          onOk={this.downloadQR}
          destroyOnClose
          okText="Download"
        >
          <QRCodeForm ref={this.qrRef} link={this.state.qrLink} />
        </Modal>
      </Page>
    );
  }
}

export default withAuthorization(Asset);
