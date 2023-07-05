import {
  AppstoreOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Radio, Button, Col, Form, Row, Select, Spin, Table } from "antd";
import { Link } from "react-router-dom";
import AssetService from "../../../services/asset-service";
import PlantService from "../../../services/plant-service";
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
class AssetList extends PageList {
  state = { layout: "List" };
  service = new AssetService();
  plantservice = new PlantService();
  title = "Asset List";

  componentDidMount() {
    super.componentDidMount();
    this.plantservice.list().then((response) => {
      this.setState((state) => ({ ...state, customer: response.data }));
    });

    let plantId = this.props.searchParams.get("plantId");
    if (plantId) {
      this.props.form?.setFieldValue("plantId", Number(plantId));
      this.props.form?.submit();
    }
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
        filter={
          <Form
            size="small"
            form={this.props.form}
            layout="inline"
            onFinish={this.onSubmit}
          >
            <Form.Item name="plantId" style={style.formItem}>
              <Select placeholder="Customer" showSearch allowClear>
                {this.state.customer?.map((e) => (
                  <Option key={`customer${e.customerId}`} value={e.customerId}>
                    {e.customerName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item style={style.formItem}>
              <Select placeholder="Floor" showSearch allowClear>
                <Option>Floor 1</Option>
              </Select>
            </Form.Item>

            {/* <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
      /     Go
      //     </Button> */}
          </Form>
        }
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

export default withRouter(withForm(AssetList));
