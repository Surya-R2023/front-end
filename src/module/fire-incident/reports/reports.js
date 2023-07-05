import { Button, Form, message, Select, Space, Table } from "antd";
import moment from "moment";
import ContinentService from "../../../services/continent-service";
import CountryService from "../../../services/country-service";
import ReportService from "../../../services/fire-incident-services/report-service";
import Page from "../../../utils/page/page";
import { withRouter } from "../../../utils/with-router";
import FilterFunctions from "../../remote-monitoring/common/filter-functions";
import {
  SearchOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import DateFilter from "../../remote-monitoring/common/date-filter";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx/xlsx.mjs";
const setData = {};

const style = {
  formItem: {
    minWidth: "120px",
  },
};
const columnPdf = [
  {
    key: "assetId",
    label: "S.No",
    title: "S.No",
  },
  {
    key: "workOrderNumbe",
    label: "WorkOrderNumbe",
    title: "WorkOrderNumbe",
  },
  {
    key: "date",
    label: "Date",
    title: "Date",
  },
  {
    key: "description",
    label: "Description",
    title: "Description",
  },

  {
    key: "rca",
    label: "RCA",
    title: "RCA",
  },
  {
    key: "pa",
    label: "PA",
    title: "PA",
  },
  {
    key: "resolutionTime",
    label: "Resolution Time",
    title: "Resolution Time",
  },
  {
    key: "resolvedBy",
    label: "Resolved By",
    title: "Resolved By",
  },
];
class Reports extends FilterFunctions {
  filterfunctionsservice = new FilterFunctions();
  title = "Resolution Work Order Report";

  continentService = new ContinentService();
  countryService = new CountryService();
  reportService = new ReportService();
  componentDidMount() {
    this.getContinentList();
    this.getCustomerList();
    this.getAssetList();
  }

  search = (data) => {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.reportService
      .getResolutionWorkOrder(data)
      .then((response) => {
        this.setState((state) => ({ ...state, data: response.data }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };

  columns = [
    {
      title: "S.No",
      key: "assetId",
      dataIndex: "assetId",
      width: "50px",
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: "workOrderNumber",
      key: "workOrderNumber",
      title: "Work Order No",
      align: "left",
      width: "140px",
      // sorter: (a, b) => a.workOrderNumber.localeCompare(b.workOrderNumber),
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      width: "100px",
      align: "left",
      render: (value) => {
        return value ? moment(value).format("DD-MM-YYYY") : "-";
      },
    },

    {
      dataIndex: "description",
      key: "description",
      title: "Description",
      align: "left",
      width: "300px",
    },
    {
      dataIndex: "rca",
      key: "rca",
      title: "RCA",
      width: "200px",
    },
    {
      dataIndex: "ca",
      key: "ca",
      title: "CA",
      width: "200px",
    },
    {
      dataIndex: "pa",
      key: "pa",
      title: "PA",
      width: "200px",
    },

    {
      dataIndex: "resolutionTime",
      key: "resolutionTime",
      title: "Resolved Time",
      align: "left",
      width: "100px",
    },
    {
      dataIndex: "resolvedBy",
      key: "resolvedBy",
      title: "Resolved By",
      align: "left",
      width: "100px",
    },
  ];
  exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Fire Incident  Report", 20, 10);
    doc.autoTable({
      columns: columnPdf.map((col) => ({ ...col, dataKey: col.key })),
      body: this.state.rows.map((e, i) => ({ ...e, sno: i + 1 })),
    });
    doc.save("Fire Incident  Report.pdf");
  };

  exportExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(this.state.rows);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Fire Incident  Report");
    XLSX.writeFile(workBook, "Fire Incident  Report.xlsx");
  };
  render() {
    return (
      <Page
        title={this.title}
        filter={
          <Form
            onFinish={this.search}
            size="small"
            layout="inline"
            initialValues={{ mode: 2, status: 5 }}
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
                showSearch
                onChange={this.getCustomerList}
                loading={this.state.isStateListLoading}
                placeholder="State"
                allowClear
                options={this.state.stateList}
              ></Select>
            </Form.Item>
            <Form.Item name="customerId" style={style.formItem}>
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
            <Form.Item name="status" style={style.formItem}>
              <Select placeholder="Status" allowClear>
                <Select.Option value={5}>Completed</Select.Option>
                <Select.Option value={4}>Rejected</Select.Option>
              </Select>
            </Form.Item>
            <DateFilter />
            <Space>
              <Button type="primary" htmlType="submit">
                <SearchOutlined /> Go
              </Button>
              <Button type="primary" onClick={() => this.exportPDF()}>
                <FilePdfOutlined />
              </Button>
              <Button type="primary" onClick={() => this.exportExcel()}>
                <FileExcelOutlined />
              </Button>
            </Space>
          </Form>
        }
      >
        <Table
          scroll={{ x: 1080 }}
          tableLayout="fixed"
          rowKey="resolutionWorkorderId"
          loading={this.state.isLoading}
          dataSource={this.state.data}
          columns={this.columns}
          size="middle"
          pagination={false}
          bordered
        />
      </Page>
    );
  }
}

export default withRouter(Reports);
