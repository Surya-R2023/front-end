import PageList from "../../../utils/page/page-list";
import Page from "../../../utils/page/page";
import {
  Avatar,
  Button,
  message,
  Space,
  Table,
  Tag,
  Dropdown,
  Row,
} from "antd";
import { connect } from "react-redux";
import { dateFormat } from "../../../helpers/date-format";
import { remoteAsset } from "../../../helpers/url";
import AlertsService from "../../../services/alerts-service";
import { withRouter } from "../../../utils/with-router";
import { Link } from "react-router-dom";
import React, { createRef } from "react";
import moment from "moment";
import jsPDF from "jspdf";
import { DownloadOutlined } from "@ant-design/icons";
import { rootUrl } from "../../../helpers/url";
import "jspdf-autotable";
import * as XLSX from "xlsx/xlsx.mjs";
import UploadDownloadService from "../../../services/upload-download-service";
const style = {
  formItem: {
    minWidth: "120px",
  },
};

class AlertList extends PageList {
  componentDidMount() {}
  service = new AlertsService();
  downloadservice = new UploadDownloadService();
  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }

  renderStatus = (v) => {
    let color, value;
    switch (v) {
      case 0:
        color = "blue";
        value = "Opened";
        break;
      case 2:
        value = "Resolved";
        color = "cyan";
        break;
      case 5:
        value = "Completed";
        color = "green";
        break;
      case 3:
        value = "Verified";
        color = "purple";
        break;
      case 1:
        value = "Assigned";
        color = "magenta";
        break;
      case 4:
        value = "Rejected";
        color = "red";
        break;
      default:
        color = "gold";
        break;
    }

    return value ? <Tag color={color}>{value}</Tag> : "-";
  };
  list = (value = {}) => {
    let obj = { ...value };
    if (obj.mode === 5) {
      obj.fromDate = moment(value.dateRange[0]).format("YYYY-MM-DD");
      obj.toDate = moment(value.dateRange[1]).format("YYYY-MM-DD");
    }
    // if (obj.mode === undefined) obj.mode = 2;
    delete obj.dateRange;
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    this.service
      .report(obj)
      .then((response) => {
        this.setState((state) => ({
          ...state,
          parameters: response.data,
          rows: response.data,
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
  };

  title = "Alert List";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      headerAlign: "center",
      title: "S.No",
      align: "left",
      width: "50px",
    },
    {
      dataIndex: "imageUrl",
      key: "imageUrl",
      title: "",
      width: "60px",
      align: "center",
      render: (value) => {
        return <Avatar src={remoteAsset(value)} shape="square" />;
      },
    },
    {
      dataIndex: "customerName",
      key: "customerName",
      title: "Project Location",
      width: "200px",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      dataIndex: "alertTime",
      key: "alertTime",
      title: "Alarm Occurance Time",
      render: (value) => {
        return value ? dateFormat(value, "DD-MM-YYYY h:mm:ss A") : "-";
      },
      width: "200px",
      sorter: (a, b) =>
        new Date(a.alertTime).getTime() - new Date(b.alertTime).getTime(),
    },
    {
      dataIndex: "confirmationTime",
      key: "confirmationTime",
      title: "Alarm Confirmation Time",
      render: (value) => {
        return value ? dateFormat(value, "DD-MM-YYYY h:mm:ss A") : "-";
      },
      width: "200px",
      sorter: (a, b) =>
        new Date(a.confirmationTime).getTime() -
        new Date(b.confirmationTime).getTime(),
    },
    {
      dataIndex: "cdLandlineNo",
      key: "cdLandlineNo",
      title: "Civil Defence",
      colSpan: 2,
      width: "120px",
    },
    {
      dataIndex: "cdMobileNo",
      key: "cdMobileNo",
      title: "Civil Defence Mobile",
      colSpan: 0,
      width: "120px",
    },
    {
      dataIndex: "buildingLandlineNo",
      key: "buildingLandlineNo",
      title: "Building Landline No",
      width: "160px",
    },
    {
      dataIndex: "contactPerson1Name",
      key: "contactPerson1Name",
      title: "Contact Person 1",
      colSpan: 2,
      width: "150px",
    },
    {
      dataIndex: "contactPerson1Number",
      key: "contactPerson1Number",
      title: "Contact Person 1 Number",
      colSpan: 0,
      width: "120px",
    },
    {
      dataIndex: "contactPerson2Name",
      key: "contactPerson2Name",
      title: "Contact Person 2",
      colSpan: 2,
      width: "150px",
    },
    {
      dataIndex: "contactPerson2Number",
      key: "contactPerson2Number",
      title: "Contact Person 2 Number",
      colSpan: 0,
      width: "120px",
    },

    {
      dataIndex: "workOrderId",
      key: "workOrderId",
      title: "Work Order",
      colSpan: 2,
      width: "100px",
      render: (value, record, index) => {
        return (
          <Link to={`/fire-incident/resolution-work-order/update/${value}`}>
            {record.workOrderNo}
          </Link>
        );
      },
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      width: "100px",
      colSpan: 0,
      render: this.renderStatus,
    },

    {
      dataIndex: "alertId",
      key: "alertId",
      title: "Action",
      align: "center",
      fixed: "right",
      width: "180px",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.confirmation ?? 0 - b.confirmation ?? 0,
      render: (value, record, index) => {
        return (
          <>
            {record?.confirmation == null ? (
              <Space>
                <Button
                  size="small"
                  className="no button"
                  onClick={() => this.fireAlarm(value)}
                >
                  Fire Alarm
                </Button>
                <Button
                  size="small"
                  className="yes button"
                  onClick={() => this.falseAlarm(value)}
                >
                  False Alarm
                </Button>
              </Space>
            ) : (
              <Space>
                <Button size="small" className="no button" disabled>
                  Fire Alarm
                </Button>
                <Button size="small" className="yes button" disabled>
                  False Alarm
                </Button>
              </Space>
            )}
          </>
        );
      },
    },
  ];

  assetAlertColumn = [
    {
      dataIndex: "sno",
      key: "sno",
      headerAlign: "center",
      title: "S.No",
      align: "left",
      width: "50px",
    },
    {
      dataIndex: "imageUrl",
      key: "imageUrl",
      title: "",
      width: "60px",
      align: "center",
      render: (value) => {
        return <Avatar src={remoteAsset(value)} shape="square" />;
      },
    },
    {
      dataIndex: "customerName",
      key: "customerName",
      title: "Project Location",
      width: "200px",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    // {
    //   title: "Asset  Details",
    //   key: "assetDisplayStatus",
    //   render: (text, record) => {
    //     const assetDisplayValueList = record.assetDisplayValueList?.find(
    //       displayValue => displayValue.value.toLowerCase() === record.value.toLowerCase()
    //     );
    //     const displayValue = assetDisplayValueList ? assetDisplayValueList?.displayValue : 'No display value ';
    //     const status = record.status ? "On" : "Off";
    //     return `${record.assetName} - ${displayValue} - ${status}`;
    //   },
    //   width: 400,
    //   align:"center",
    // },
    // {
    //   title: "Asset Name - Display Value - Status",
    //   key: "assetDisplayStatus",
    //   render: (text, record) => {
    //     const assetDisplayValueList = record.assetDisplayValueList?.find(
    //       displayValue => displayValue.value.toLowerCase() === record.value.toLowerCase()
    //     );
    //     const displayValue = assetDisplayValueList ? assetDisplayValueList.displayValue : "-";
    //     const assetName = record.assetName || "-";
    //     const status = record.status ? "On" : "Off";
    //     return `${assetName} - ${displayValue} - ${status}`;
    //   },
    // },
    
    // {
    //   dataIndex: "assetName",
    //   key: "assetName",
    //   title: "Asset Name",
    //   width: "200px",
    //   sorter: (a, b) => a.assetName.localeCompare(b.assetName),
    // },
    // {
    //   dataIndex: "description",
    //   key: "description",
    //   title: "Alarm Name",
    //   width: "200px",
    //   sorter: (a, b) => a.description.localeCompare(b.description),
    // },
    {
      dataIndex: "alertTime",
      key: "alertTime",
      title: "Alarm Occurance Time",
      render: (value) => {
        return value ? dateFormat(value, "DD-MM-YYYY h:mm:ss A") : "-";
      },
      width: "200px",
      sorter: (a, b) =>
        new Date(a.alertTime).getTime() - new Date(b.alertTime).getTime(),
    },
    {
      title:"Alarm Details",
      key: "assetDisplayStatus",
      render: (text, record) => {
        const assetDisplayValueList = record.assetDisplayValueList?.find(
          displayValue => displayValue.value.toLowerCase() === record.value.toLowerCase()
        );
        const displayValue = assetDisplayValueList ? assetDisplayValueList?.displayValue : ' - ';
        const assetName = record.assetName || "-";
        const parameterName = record.parameterName || "-";
        return `${assetName} - ${parameterName} - ${displayValue}`;
      },
      width: 300,
      align:"center",
    },
    {
      dataIndex: "buildingLandlineNo",
      key: "buildingLandlineNo",
      title: "Building Landline No",
      width: "160px",
    },
    {
      dataIndex: "workOrderId",
      key: "workOrderId",
      title: "Work Order",
      colSpan: 2,
      width: "100px",
      render: (value, record, index) => {
        return (
          <Link
            to={`/preventive-maintenance/resolution-work-order/update/${value}`}
          >
            {record.workOrderNo}
          </Link>
        );
      },
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      width: "100px",
      colSpan: 0,
      render: this.renderStatus,
    },
  ];
  acknowledge = (id) => {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.service
      .acknowledgement(id)
      .then((response) => {
        message.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };
  falseAlarm = (id) => {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.service
      .confirmation(id, 2)
      .then((response) => {
        message.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };
  fireAlarm = (id) => {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.service
      .confirmation(id, 1)
      .then((response) => {
        message.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };
  getName = (id) => {
    let e = this.state.alert?.find((e) => e.alertId == id);
    return e ? e.S.No : "";
  };
  constructor(props) {
    super(props);
    this.ref = createRef();
    // this.ref1 = createRef();
  }
  exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: this.ref.current.querySelector("table") });
    doc.save(" Reports.pdf");
  };

  exportXLS = () => {
    const workSheet = XLSX.utils.table_to_sheet(
      this.ref.current.querySelector("table")
    );
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Reports");
    XLSX.writeFile(workBook, "Reports.xlsx");
  };
  exportCSV = () => {
    const workSheet = XLSX.utils.table_to_sheet(
      this.ref.current.querySelector("table")
    );
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Reports");
    XLSX.writeFile(workBook, "Report.csv");
  };

  exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: this.ref.current.querySelector("table") });
    doc.save("Reports.pdf");
  };

  exportXLS = () => {
    const workSheet = XLSX.utils.table_to_sheet(
      this.ref.current.querySelector("table")
    );
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Reports");
    XLSX.writeFile(workBook, "Reports.xlsx");
  };
  exportCSV = () => {
    const workSheet = XLSX.utils.table_to_sheet(
      this.ref.current.querySelector("table")
    );
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Reports");
    XLSX.writeFile(workBook, "Report.csv");
  };

  handleDownload = () => {
    // const downloadUrl = `${rootUrl}/download/assetAlert/pdf?mode=`;
    // window.open(downloadUrl);

    // try {
    let url = `${rootUrl}/download/recentAssetAlerts/pdf`;
    // if (this.state.mode === 5) {
    //   url = `${rootUrl}/download/assetAlertsReport/pdf?mode=5&fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`;
    // } else {
    //   url = `${rootUrl}/download/assetAlertsReport/pdf?mode=${this.state.mode}`;
    // }
    // axios
    //   .get(url, {
    //     responseType: "blob",
    //   })
    this.downloadservice.download(url).then((response) => {
      const urlBlob = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = "Recent Alerts.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };
  submitForm = (value) => {
    this.list(value);
  };

  render() {
    const items = [
      {
        label: <a onClick={() => this.exportCSV()}>CSV Export</a>,
        key: "item-1",
      },
      {
        label: <a onClick={() => this.exportPDF()}>PDF Export</a>,
        key: "item-2",
      },
      {
        label: <a onClick={() => this.exportXLS()}>XLS Export</a>,
        key: "item-3",
      },
    ];
    return (
      <Page title={this.title}>
        <Row gutter={15} justify="end">
          {/* <Dropdown menu={{ items }}>
            <Button type="primary">Export</Button>
          </Dropdown> */}
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.handleDownload}
            icon={<DownloadOutlined />}
          >
            Download
          </Button>
        </Row>
        <br></br>
        {this.state.mode === "fire" ? (
          <Table
            ref={this.ref}
            id="table"
            bordered
            tableLayout="fixed"
            rowKey="alertId"
            pagination={{
              showSizeChanger: true,

              showQuickJumper: true,

              size: "default",
            }}
            loading={this.state.isLoading}
            scroll={{ x: 1080 }}
            dataSource={this.state.fireAlertsList?.map((e, i) => ({
              ...e,
              sno: i + 1,
            }))}
            columns={this.columns}
            size="middle"
          />
        ) : (
          <Table
            ref={this.ref}
            id="table"
            bordered
            tableLayout="fixed"
            rowKey="alertId"
            pagination={{
              showSizeChanger: true,

              showQuickJumper: true,

              size: "default",
            }}
            loading={this.state.isLoading}
            scroll={{ x: 1080 }}
            dataSource={this.state.assetAlertsList?.map((e, i) => ({
              ...e,
              sno: i + 1,
            }))}
            columns={this.assetAlertColumn}
            size="middle"
          />
        )}

        {/* <StateForm {...this.state.popup} close={this.onClose} /> */}
      </Page>
    );
  }
}
const mapStateToProps = (state) => {
  return (
    {
      fireAlertsList: state.loggedReducer.fireAlertsList,
      assetAlertsList: state.loggedReducer.pumpAlertsList,
    } ?? {}
  );
};
export default connect(mapStateToProps, {})(withRouter(AlertList));
