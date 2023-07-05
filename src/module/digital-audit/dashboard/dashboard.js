import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row, Select, Spin, Input } from "antd";
import BarGraph from "../../../component/BarGraph";
import Pie from "../../../component/Pie";
import TimeSeriesGraph from "../../../component/TimeSeriesGraph";
import DashboardService from "../../../services/audit-services/dashboard-service";
import Page from "../../../utils/page/page";
import { withForm } from "../../../utils/with-form";
import FilterFunctions from "../../remote-monitoring/common/filter-functions";
import DateFilter from "../../remote-monitoring/common/date-filter";
import { TfiNewWindow } from "react-icons/tfi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiBoxList } from "react-icons/ci";
import { BsUiChecks, BsListTask } from "react-icons/bs";
import { MdRemoveDone, MdDoneAll } from "react-icons/md";
import TileCardTwo from "../../../component/tile-card-two";
import moment from "moment";
import TileCardOne from "../../../component/tile-card-one";
import { Link } from "react-router-dom";
const style = {
  formItem: {
    minWidth: "120px",
  },
};
class MainDashboard extends FilterFunctions {
  state = { isLoading: false };
  service = new DashboardService();
  componentDidMount() {
    this.getContinentList();
    this.getAssetList();
    this.props.form.submit();
  }

  onFinish = (value = {}) => {
    this.setState((state) => ({ ...state, isLoading: true }));

    let obj = { ...value };
    if (obj.mode === 5) {
      obj.fromDate = moment(value.dateRange[0]).format("YYYY-MM-DD");
      obj.toDate = moment(value.dateRange[1]).format("YYYY-MM-DD");
    }
    delete obj.dateRange;
    this.service
      .dashboard(obj)
      .then((response) => {
        this.setState((state) => ({
          ...state,

          ageingOfTicket: response.data.ageingOfTicket,
          executionStatus: response.data.executionStatus,
          ticketCount: [
            {
              name: "Ticket Count",
              data: response.data.ticketCount,
            },
          ],
          repeatedAbnormality: [
            {
              name: "Checks",
              data: response.data.abnormality,
            },
          ],
          ticketStatus: response.data.ticketStatus,
        }));
        // console.log("response");
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };
  render() {
    const color = [
      "#2196f3",
      "#87d068",
      "purple",
      "orange",
      "red",
      "green",
      "purple",
    ];
    const total = this.state.ticketStatus?.reduce((c, e) => {
      console.log(e);
      c += Number(e.y);
      return c;
    }, 0);
    return (
      <Page
        title="Audit Dashboard"
        filter={
          <Form
            onFinish={this.onFinish}
            form={this.props.form}
            layout="inline"
            initialValues={{ mode: 2 }}
            preserve={true}
            size="small"
          >
            <Form.Item name="mode" initialValue={1} hidden>
              <Input />
            </Form.Item>
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
            <Form.Item name="machines" style={style.formItem}>
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
            <Button type="default" htmlType="submit" icon={<SearchOutlined />}>
              Go
            </Button>
          </Form>
        }
      >
        <Spin spinning={this.state.isLoading}>
          <Row gutter={[10, 10]}>
            {this.state.ticketStatus?.map((e, i) => {
              let index = i;
              let n = color.length;
              if (i >= n) {
                index = i % n;
              }
              const icon = [
                <TfiNewWindow />,
                <AiOutlineUserAdd />,
                <CiBoxList />,
                <BsUiChecks />,
                <MdRemoveDone />,
                <MdDoneAll />,
              ];
              return (
                <Col lg={4} md={8} sm={12} xs={24}>
                  <Link to={`../resolution-work-order?status=${i}`}>
                    <TileCardOne
                      label={e.x}
                      value={e.y}
                      color={color[index]}
                      icon={icon[index]}
                      percentage={(e.y / total) * 100}
                    />
                  </Link>
                </Col>
              );
            })}

            <Col sm={24} xs={24} md={12}>
              <Card title="Overall Work Order Count">
                <TimeSeriesGraph
                  type="line"
                  height={250}
                  series={this.state.ticketCount}
                />
                {/* <TicketCount /> */}
              </Card>
            </Col>
            <Col sm={24} xs={24} md={12}>
              <Card title="Repeated Abnormality">
                <BarGraph
                  hideLabel={true}
                  height={250}
                  series={this.state.repeatedAbnormality ?? []}
                />
              </Card>
            </Col>
            <Col sm={24} xs={24} md={12}>
              <Card title="Inspection Checklist Execution Status">
                <Pie series={this.state.executionStatus ?? []} />
              </Card>
            </Col>

            <Col sm={24} xs={24} md={12}>
              <Card title="Aging of Work Order">
                <Pie series={this.state.ageingOfTicket ?? []} />
              </Card>
            </Col>
          </Row>
        </Spin>
      </Page>
    );
  }
}

export default withForm(MainDashboard);
