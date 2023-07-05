import DateFilter from "../../remote-monitoring/common/date-filter";
import { SearchOutlined } from "@ant-design/icons";
// import PageList from "../../../utils/page/page-list";
import Page from "../../../utils/page/page";
import {
  Avatar,
  Button,
  message,
  Space,
  Table,
  Tag,
  Form,
  Select,
  Row,
  Col,
} from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { dateFormat } from "../../../helpers/date-format";
import { remoteAsset } from "../../../helpers/url";
import AlertsService from "../../../services/alerts-service";
import { withRouter } from "../../../utils/with-router";
import { Link } from "react-router-dom";
import FilterFunctions from "../common/filter-functions";
import { DownloadOutlined } from "@ant-design/icons";
// import moment from "moment";
import { rootUrl } from "../../../helpers/url";
import dayjs from "dayjs";
import HttpClient from "../../../services/http";
import UploadDownloadService from "../../../services/upload-download-service";
const style = {
  formItem: {
    minWidth: "120px",
  },
};
class Reports extends FilterFunctions {
  constructor(props) {
    super(props);
    this.state = {
      mode: 4,
      fromDate: null,
      toDate: null,
      assetId: null,
    };
  }
  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }
  componentDidMount() {
    this.getContinentList();
    this.getAssetList();
  }
  service = new AlertsService();
  downloadservice = new UploadDownloadService();

  onFinish = (value = {}) => {
    this.setState((state) => ({ ...state, isLoading: true }));
    let obj = { ...value };
    if (obj.mode === 5) {
      obj.fromDate = dayjs(value.dateRange[0]).format("YYYY-MM-DD");
      obj.toDate = dayjs(value.dateRange[1]).format("YYYY-MM-DD");
      this.setState({ fromDate: obj.fromDate, toDate: obj.toDate });
    }
    console.log("objobj", obj, "mode", obj.mode);
    // this.handleDownload(obj);
    this.setState({ mode: obj.mode });
    this.setState({ assetId: obj.assetId });
    // if (obj.mode === undefined) obj.mode = 2;
    delete obj.dateRange;
    this.service
      .report(obj)
      .then((response) => {
        this.setState((state) => ({
          ...state,
          data: response.data,
        }));
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };

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
      title: "Site",
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
      dataIndex: "assetName",
      key: "assetName",
      title: "Asset Name",
      width: "150px",
      sorter: (a, b) => a.assetName.localeCompare(b.assetName),
    },
    {
      dataIndex: "parameterName",
      key: "parameterName",
      title: "Parameter Name",

      width: "180px",
      // align: "center",
      render: (value) => {
        // let split = value.split("-");
        // return split[1];
        return value;
      },

      // sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      dataIndex: "description",
      key: "description",
      title: "Status / Alarm",
      width: "80px",
      align: "center",
      // render: (value) => {
      //   return value ? "On" : "Off";
      // },

      // sorter: (a, b) => a.customerName.localeCompare(b.customerName),
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
      title: "Alert Occurance Time",
      render: (value) => {
        return value ? dateFormat(value, "DD-MM-YYYY h:mm:ss A") : "-";
      },
      width: "200px",
      sorter: (a, b) =>
        new Date(a.alertTime).getTime() - new Date(b.alertTime).getTime(),
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

  handleDownload = () => {
    // try {
    let url;
    if (this.state.mode === 5) {
      url = `${rootUrl}/download/assetAlertsReport/pdf?mode=5&fromDate=${this.state.fromDate}&toDate=${this.state.toDate}`;
    } else {
      url = `${rootUrl}/download/assetAlertsReport/pdf?mode=${this.state.mode}`;
    }

    this.downloadservice.download(url).then((response) => {
      const urlBlob = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = "report.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  render() {
    return (
      <Page
        title={this.title}
        filter={
          <Form
            onFinish={this.onFinish}
            form={this.props.form}
            layout="inline"
            initialValues={{ mode: 2 }}
            preserve={true}
            size="small"
          >
            <Form.Item name="region" style={style.formItem}>
              <Select
                onChange={this.getCountryList}
                loading={this.state.isContinentListLoading}
                showSearch
                placeholder="Region"
                options={this.state.continentList}
              ></Select>
            </Form.Item>
            <Form.Item name="country" style={style.formItem}>
              <Select
                onChange={this.getStateList}
                showSearch
                loading={this.state.isCountryListLoading}
                placeholder="Country"
                allowClear
                options={this.state.countryList}
              ></Select>
            </Form.Item>
            <Form.Item name="state" style={style.formItem}>
              <Select
                onChange={this.getCustomerList}
                showSearch
                loading={this.state.isStateListLoading}
                placeholder="State"
                allowClear
                options={this.state.stateList}
              ></Select>
            </Form.Item>
            <Form.Item name="plantId" style={style.formItem}>
              <Select
                onChange={this.getAssetList}
                showSearch
                loading={this.state.isCustomerListLoading}
                placeholder="Customer"
                allowClear
                options={this.state.customerList}
              ></Select>
            </Form.Item>
            <Form.Item name="assetId" style={style.formItem}>
              <Select
                showSearch
                loading={this.state.isAssetListLoading}
                placeholder="Asset"
                allowClear
                options={this.state.assetList}
              ></Select>
            </Form.Item>
            <DateFilter />
            <Form.Item>
              <Row gutter={15}>
                <Col>
                  <Button
                    type="default"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  >
                    Go
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleDownload}
                    icon={<DownloadOutlined />}
                  >
                    Download
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        }
      >
        {/* <>
          <Button
            type="primary"
            onClick={this.handleDownload}
            icon={<DownloadOutlined />}
          >
            Download
          </Button>
        </> */}
        {this.state.mode === "fire" ? (
          <Table
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
            dataSource={
              //   this.state.assetAlertsList?.map((e, i) => ({
              //   ...e,
              //   sno: i + 1,
              // }))
              this.state.data?.map((e, i) => ({
                ...e,
                sno: i + 1,
              }))
            }
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
export default connect(mapStateToProps, {})(withRouter(Reports));
