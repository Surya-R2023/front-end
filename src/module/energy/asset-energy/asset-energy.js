import {
  AppstoreOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Radio, Col, Row, Select, Spin, } from "antd";
import { Link } from "react-router-dom";
import ContinentService from "../../../services/continent-service";
import EnergyLiveMonitoringService from "../../../services/energy-live-service";

import Page from "../../../utils/page/page";
import PageList from "../../../utils/page/page-list";
import { withForm } from "../../../utils/with-form";
import { withRouter } from "../../../utils/with-router";
import CardView from "./card-view";
import ListView from "./list-view";

const { Option } = Select;
const style = {
  formItem: {
    minWidth: "120px",
  },
};
class EnergyList extends PageList {
  state = { layout: "Grid" };
   service = new EnergyLiveMonitoringService();
  title = "Energy List";

  componentDidMount() {
    super.componentDidMount();
    this.service.list().then((response) => {
      this.setState((state) => ({ ...state, energy: response.data }));
      
      // this.setState((state) => ({
      //   ...state,
      //   overallenergy: [
      //     {
      //       assetName: response[3].data.assetName,
      //       energyMeterReading: response[3].data.energyMeterReading,
      //       monthConsumption: response[3].data.monthConsumption,
      //       consumption: response[3].data.consumption,
      //       cumulative:response[3].data.cumulative,
      //     },]}))

    });

    // let plantId = this.props.searchParams.get("plantId");
    // if (plantId) {
    //   this.props.form?.setFieldValue("plantId", Number(plantId));
    //   this.props.form?.submit();
    // }
  }
  toggleView = (e) => {
    this.setState((state) => ({ ...state, layout: e.target.value }));
  };
  onSubmit = (value) => {
    this.list(value);
  };
  render() {
    return (
      <Page
        title={this.title}
        //  filter={
        //   <Form form={this.props.form} layout="inline" onFinish={this.onSubmit}>
        //     <Form.Item name="plantId" style={style.formItem}>
        //       <Select placeholder="Customer" showSearch allowClear>
        //         {this.state.customer?.map((e) => (
        //           <Option key={`customer${e.customerId}`} value={e.customerId}>
        //             {e.customerName}
        //           </Option>
        //         ))}
        //       </Select>
        //     </Form.Item>

        //     <Form.Item style={style.formItem}>
        //       <Select placeholder="Floor" showSearch allowClear>
        //         <Option>Floor 1</Option>
        //       </Select>
        //     </Form.Item>

        //     <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
        //       Go
        //     </Button>
        //   </Form>
        // }
      >
        <Row justify="end" gutter={[10, 10]}>
          <Col>
            <Radio.Group
              value={this.state.layout}
              buttonStyle="solid"
              onChange={this.toggleView}
            >
              <Radio.Button value="Grid">
                <AppstoreOutlined />
              </Radio.Button>
              <Radio.Button value="List">
                <MenuOutlined />
              </Radio.Button>
            </Radio.Group>
          </Col>
          <Col span={24}>
            {this.state.layout == "List" ? (
              <ListView {...this.state} />
            ) : (
              <CardView {...this.state} />
            )}
          </Col>
        </Row>
      </Page>
    );
  }
}

export default withRouter(withForm(EnergyList));
