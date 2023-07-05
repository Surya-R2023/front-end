import {
  Badge,
  Card,
  Col,
  Descriptions,
  Image,
  Avatar,
  Row,
  Spin,
  List,
} from "antd";
import { withForm } from "../../../utils/with-form";
import { Link } from "react-router-dom";
import { Component } from "react";
import { Divider, Typography } from "antd";
import { remoteAsset } from "../../../helpers/url";
const { Text, Title } = Typography;
const { Meta } = Card;

class CardView extends Component {
  state = { isLoading: false, rows: [] };
  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }

  render() {
    const { data } = this.state;
    return (
      <Spin spinning={this.state.isLoading}>
        <Row gutter={[20, 20]}>
          {this.state.rows?.map((e) => (
            <Col sm={12} md={8} lg={8} xs={24}>
              <Link to={`../energy-consumption?assetId=${e.assetId}`}>
                <Card size="small" hoverable>
                  <List
                    // bordered={true}
                    size="small"
                    dataSource={[
                      {
                        label: e.assetName,
                        avatar: (
                          <Avatar
                            shape="square"
                            src={remoteAsset(this.state.data?.imageUrl)}
                          />
                        ),
                        // value: e.energyMeterReading,
                      },
                      {
                        label: "Energy Meter Reading",
                        value: e.energyMeterReading,
                      },
                      {
                        label: `Today's Consumption`,
                        value: e.consumption,
                      },
                      {
                        label: "Month Consumption",
                        value: e.monthConsumption,
                      },
                    ]}
                    renderItem={(item) => (
                      <List.Item key={item.label} extra={item.value}>
                        <List.Item.Meta
                          avatar={item.avatar}
                          title={item.label}
                        />
                      </List.Item>
                    )}
                  />
                  {/* <Meta
                    avatar={
                      <Avatar
                        shape="square"
                        src={remoteAsset(this.state.data?.imageUrl)}
                      />
                    }
                    title={e.assetName}
                    description={
                      <List
                        style={{ width: "200px" }}
                        bordered={true}
                        size="small"
                        dataSource={[
                          {
                            label: "Energy Meter Reading",
                            value: e.energyMeterReading,
                          },
                          {
                            label: `Today's Consumption`,
                            value: e.consumption,
                          },
                          {
                            label: "Month Consumption",
                            value: e.monthConsumption,
                          },
                        ]}
                        renderItem={(item) => (
                          <List.Item key={item.label} extra={item.value}>
                            <List.Item.Meta
                              title={item.label}
                              
                            />
                          </List.Item>
                        )}
                      />
                    }
                  /> */}
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Spin>
    );
  }
}

export default withForm(CardView);
