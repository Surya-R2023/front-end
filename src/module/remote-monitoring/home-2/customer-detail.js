import React, { setState } from "react";
import {
  Row,
  Col,
  Image,
  message,
  Spin,
  Descriptions,
  Space,
  Tooltip,
} from "antd";
import { Card } from "antd";
import { Drawer, Button } from "antd";
import PlantService from "../../../services/plant-service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { remoteAsset } from "../../../helpers/url";
class CustomerDetail extends React.Component {
  service = new PlantService();
  state = { isLoading: false, data: {} };
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps);
    // console.log(prevProps.id, this.props.id);
    // if (prevProps.id !== this.props.id) {
    // if (this.props.id) this.getData(this.props.id);
    // }
  }
  componentDidMount() {
    this.getData(this.props.id);
  }
  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }
  getData(id) {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.service
      .retrieve(id)
      .then((response) => {
        this.setState((state) => ({ ...state, data: response.data }));
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  }
  render() {
    const { data } = this.state;
    return (
      <Spin spinning={this.state.isLoading}>
        <Row gutter={[10, 10]}>
          <Col span="24">
            <div style={{ textAlign: "right" }}>
              <Space>
                <Link to={`../asset-list?plantId=${data.customerId}`}>
                  <Tooltip title="Asset">
                    <Button
                      type="primary"
                      icon={<FontAwesomeIcon icon="fa-solid fa-list" />}
                    />
                  </Tooltip>
                </Link>
                <Link to={`../building-view?plantId=${data.customerId}`}>
                  <Tooltip title="Building">
                    <Button
                      type="primary"
                      icon={<FontAwesomeIcon icon="fa-solid fa-building" />}
                    />
                  </Tooltip>
                </Link>
              </Space>
            </div>
          </Col>
          <Col span="24">
            <Image
              preview={false}
              width="100%"
              src={remoteAsset(data.imageUrl)}
            />
          </Col>
          <Col span="24">
            <Descriptions column={1} labelStyle={{ fontWeight: 600 }}>
              <Descriptions.Item label="Customer Name">
                {data?.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="Descriptions">
                {data?.description}
              </Descriptions.Item>
              <Descriptions.Item label="Building Category">
                {data?.buildingCategory}
              </Descriptions.Item>
              <Descriptions.Item label="Building Landline No">
                {data?.buildingLandlineNo}
              </Descriptions.Item>
              <Descriptions.Item label="Latitude">
                {data?.latitude}
              </Descriptions.Item>
              <Descriptions.Item label="Longitude">
                {data?.longitude}
              </Descriptions.Item>
              <Descriptions.Item label="Hazardous Material">
                {data.hazardousMaterial ? "Yes" : "No"}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Spin>
    );
  }
}

export default CustomerDetail;
