import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Row, Select, Spin } from "antd";
import BarGraph from "../../../component/BarGraph";
import Pie from "../../../component/Pie";
import TimeSeriesGraph from "../../../component/TimeSeriesGraph";
import WorkFlowHomeService from "../../../services/workflow-home-service";
import Page from "../../../utils/page/page";
import { withForm } from "../../../utils/with-form";
import FilterFunctions from "../../remote-monitoring/common/filter-functions";

const style = {
  formItem: {
    minWidth: "120px",
  },
};
class MainDashboard extends FilterFunctions {
  state = { isLoading: false };
  service = new WorkFlowHomeService();
  componentDidMount() {
    this.getContinentList();
  }

  onFinish = (value) => {
    this.setState((state) => ({ ...state, isLoading: true }));
    Promise.all([
      this.service.ageingOfTicket(value),
      this.service.executionStatus(value),
      this.service.repeatedAbnormality(value),
      this.service.ticketCount(value),
      this.service.ticketStatus(value),
    ])
      .then((response) => {
        this.setState((state) => ({
          ...state,
          ageingOfTicket: response[0].data,
          executionStatus: response[1].data,
          ticketCount: [
            {
              name: "Ticket Count",
              data: response[3].data,
            },
          ],
          repeatedAbnormality: [
            {
              name: "Checks",
              data: response[2].data,
            },
          ],
          ticketStatus: response[4].data,
        }));
        // console.log(response);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  };
  render() {
    return (
      <Page
        title="Dashboard"
        filter={
          <Form   size="small" onFinish={this.onFinish} form={this.props.form} layout="inline">
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
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Go
            </Button>
          </Form>
        }
      >
        <Spin spinning={this.state.isLoading}>
          <Row gutter={[10, 10]}>
            <Col sm={12}>
              <Card title="Overall Ticket Count">
                <TimeSeriesGraph
                  type="line"
                  height={250}
                  series={this.state.ticketCount}
                />
                {/* <TicketCount /> */}
              </Card>
            </Col>
            <Col sm={12}>
              <Card title="Repeated Abnormality">
                <BarGraph
                  hideLabel={true}
                  height={250}
                  series={this.state.repeatedAbnormality}
                />
              </Card>
            </Col>
            <Col sm={8}>
              <Card title="Execution Status">
                <Pie series={this.state.executionStatus ?? []} />
              </Card>
            </Col>
            <Col sm={8}>
              <Card title="Ticket Status">
                <Pie series={this.state.ticketStatus ?? []} />
              </Card>
            </Col>

            <Col sm={8}>
              <Card title="Ageing of Ticket">
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
