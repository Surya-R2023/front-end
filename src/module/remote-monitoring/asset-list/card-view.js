import {
  Avatar,
  Badge,
  Card,
  Col,
  Descriptions,
  Image,
  Row,
  Spin,
  Space,
  List,
} from "antd";
import { withForm } from "../../../utils/with-form";
import { MdWifi, MdWifiOff } from "react-icons/md";
import OnOffComponent from "../../../utils/on-off-component";
import { Link } from "react-router-dom";
import { Component } from "react";
import { Typography } from "antd";
import { remoteAsset } from "../../../helpers/url";

const { Text, Title } = Typography;
const { Meta } = Card;
class CardView extends Component {
  state = { isLoading: false, rows: [] };
  constructor(props) {
    super(props);
  }
  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }

  render() {
    const { data } = this.state;
    return (
      <Spin spinning={this.state.isLoading}>
        <Row gutter={[10, 10]}>
          {this.state.rows?.map((e) => (
            <Col sm={12} md={8} lg={8} xs={24}>
              <Link to={`../monitoring?assetId=${e.assetId}`}>
                <Card size="small" hoverable>
                  
                  <Space  >
                    <Avatar
                      style={{
                        backgroundColor: e.assetLibrary.connected
                          ? "green"
                          : "grey",
                        lineHeight: "35px",
                        marginLeft:"300px",
                        
                      }}
                      icon={
                        e.assetLibrary.connected ? <MdWifi /> : <MdWifiOff />
                      } />
                    <OnOffComponent
                      value={e.assetLibrary.connected ? "Online" : "Offline"}/>
                      
                  </Space>
                  
                  <List
                    // bordered={true}
                    size="small"
                    dataSource={[
                      {
                        label: e.assetName,
                        avatar: (
                          <Avatar
                            shape="square"
                            src={remoteAsset(e.imagePath)}
                          />
                        ),

                        // value: e.energyMeterReading,
                      },
                      {
                        label: "Asset Library",
                        value: e.assetLibrary.assetLibraryName,
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
