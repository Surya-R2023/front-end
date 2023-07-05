import {
  SearchOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Form, Row, Select, Space, Table, Spin } from "antd";
import { dateFormat } from "../../../helpers/date-format";
import AlertReportService from "../../../services/alert-report-service";
import Page from "../../../utils/page/page";
import { withForm } from "../../../utils/with-form";
import DateFilter from "../common/date-filter";
import FilterFunctions from "../common/filter-functions";
// import { CSVLink } from "react-csv";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx/xlsx.mjs";

const style = {
  formItem: {
    minWidth: "120px",
    maxWidth: "120px",
  },
};

const columnPdf = [
  {
    key: "sno",
    label: "S.No",
    title: "S.No",
  },
  {
    key: "name",
    label: "Alert Name",
    title: "Alert Name",
  },
  {
    key: "alertType",
    label: "Type",
    title: "Type",
  },
  {
    key: "priority",
    label: "Priority",
    title: "Priority",
  },

  {
    key: "message",
    label: "Message",
    title: "Message",
  },
  {
    key: "timestamp",
    label: "Generated Time",
    title: "Generated Time",
  },
  {
    key: "resolutionTime",
    label: "Resolution Time",
    title: "Resolution Time",
  },
];
class AlertReport extends FilterFunctions {
  service = new AlertReportService();
  state = { form: {}, isLoading: false };

  componentDidMount() {
    this.getContinentList();
    this.getAssetList();
    this.props.form.submit();
  }

  onFinish = (value) => {
    let obj = { ...value };
    if (obj.mode === 5) {
      obj.fromDate = moment(value.dateRange[0]).format("YYYY-MM-DD");
      obj.toDate = moment(value.dateRange[1]).format("YYYY-MM-DD");
    }
    // if (obj.mode === undefined) obj.mode = 2;
    delete obj.dateRange;
    this.list(obj);
  };
  handleData(data) {
    return data.result;
  }
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      headerAlign: "center",
      title: "S.No",
      align: "left",
      width: "50px",
      render: (value, render, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Alert Name",
      width: "250px",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
      dataIndex: "alertType",
      key: "alertType",
      title: "Type",
      width: "80px",
      sorter: (a, b) => a.alertType.localeCompare(b.alertType),
    },

    {
      dataIndex: "priority",
      key: "priority",
      title: "Priority",
      width: "50px",
      sorter: (a, b) => a.priority - b.priority,
    },
    {
      dataIndex: "message",
      key: "message",
      title: "Message",
      width: "150px",
    },
    {
      dataIndex: "timestamp",
      key: "timestamp",
      title: "Generated Time",
      width: "150px",
      render: (value) => {
        return dateFormat(new Date(value), "DD-MM-YYYY hh:mm:ss A");
      },
      sorter: (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    },
    {
      dataIndex: "resolutionTime",
      key: "resolutionTime",
      title: "Resolution Time",
      align: "left",
      width: "120px",
      render: (value) => {
        return dateFormat(new Date(value), "DD-MM-YYYY hh:mm:ss A");
      },
      sorter: (a, b) =>
        new Date(a.resolutionTime).getTime() -
        new Date(b.resolutionTime).getTime(),
    },
  ];

  exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Alert  Report", 20, 10);
    doc.autoTable({
      columns: columnPdf.map((col) => ({ ...col, dataKey: col.key })),
      body: this.state.rows.map((e, i) => ({ ...e, sno: i + 1 })),
    });
    doc.save("AlertReport.pdf");
  };

  exportExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(this.state.rows);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Reports");
    XLSX.writeFile(workBook, "AlertReport.xlsx");
  };

  exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Asset  Report", 20, 10);
    doc.autoTable({
      columns: columnPdf.map((col) => ({ ...col, dataKey: col.key })),
      body: this.state.rows.map((e, i) => ({ ...e, sno: i + 1 })),
    });
    doc.save("Report.pdf");
  };

  exportExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(this.state.rows);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Reports");
    XLSX.writeFile(workBook, "Reports.xlsx");
  };

  render() {
    // console.log(this.state.rows)
    // console.log(this.state.rows)
    return (
      <Page
        title="Alert Report"
        filter={
          <Form
            size="small"
            style={{ alignItems: "baseline" }}
            onFinish={this.onFinish}
            form={this.props.form}
            layout="inline"
            initialValues={{ mode: 2 }}
            // initialValues={{ mode: 2, status: 5 }}
            // initialValues={{ mode: 2, status: 5 }}
          >
            <Form.Item name="region" style={style.formItem}>
              <Select
                required
                onChange={this.getCountryList}
                loading={this.state.isContinentListLoading}
                showSearch
                placeholder="Region"
                options={this.state.continentList}
              ></Select>
            </Form.Item>
            <Form.Item name="country" style={style.formItem}>
              <Select
                required
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
                required
                onChange={this.getCustomerList}
                showSearch
                loading={this.state.isStateListLoading}
                placeholder="State"
                allowClear
                options={this.state.stateList}
              ></Select>
            </Form.Item>
            <Form.Item name="customer" style={style.formItem}>
              <Select
                required
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

            <Space>
              <Button type="primary" htmlType="submit">
                <SearchOutlined /> Go
              </Button>

              <Button onClick={() => this.exportPDF()}>
                <FilePdfOutlined />
              </Button>

              <Button onClick={() => this.exportExcel()}>
                <FileExcelOutlined />
              </Button>
            </Space>
          </Form>
        }
      >
        <Table
          bordered
          tableLayout="fixed"
          rowKey="assetId"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            size: "default",
          }}
          loading={this.state.isLoading}
          scroll={{ x: 980 }}
          dataSource={this.state.rows}
          columns={this.columns}
          size="middle"
        />
      </Page>
    );
  }
}

export default withForm(AlertReport);
