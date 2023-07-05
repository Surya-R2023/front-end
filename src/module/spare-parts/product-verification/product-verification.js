import {
  BarChartOutlined,
  DownloadOutlined,
  EyeFilled,
  FileExclamationOutlined,
} from "@ant-design/icons";
import { Card, Col, Image, Layout, Row, Tag, Typography } from "antd";
import moment from "moment";
import { Component } from "react";
import { primary } from "../../../helpers/color";
import { fallback, remoteAsset } from "../../../helpers/url";
import AssetService from "../../../services/asset-service";
import { withRouter } from "../../../utils/with-router";
import FilterFunctions from "../../remote-monitoring/common/filter-functions";
const { Text, Title } = Typography;
const { Header, Content, Footer } = Layout;
class ProductVerification extends Component {
  state = { isLoading: false };
  service = new AssetService();
  componentDidMount() {
    this.service.retrieve(this.props.params?.id).then((response) => {
      this.setState((state) => ({ ...state, data: response.data }));
    });
  }

  render() {
    // console.log(this.state.data?.status);
    return (
      <Layout>
        <Header
          style={{
            backgroundColor: primary,
            position: "sticky",
            top: 0,
            // border: 0,
            // boxShadow: "none",
          }}
        >
          <Image
            src="/white-logo.png"
            preview={false}
            style={{ margin: "auto", maxWidth: "150px" }}
          />
        </Header>
        <Content style={{ padding: "10px" }}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Title level={5} style={{ marginBottom: 0 }}>
                PRODUCT VERIFICATION
              </Title>
            </Col>
            <Col span={24}>
              <Card style={{ textAlign: "center" }}>
                <Image
                  width="100%"
                  preview={false}
                  src={remoteAsset(this.state.data?.imagePath)}
                  fallback={fallback}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Title level={5} style={{ textAlign: "center" }}>
                {this.state.data?.assetName}
              </Title>
              <Text strong type="danger">
                <FileExclamationOutlined /> &nbsp; PRODUCT DETAILS
              </Text>
              <table className="product-verification">
                <tr key="pdtname">
                  <td width="150px">Product Name</td>
                  <td>{this.state.data?.assetName}</td>
                </tr>
                <tr key="cmmd">
                  <td>Commissioned Date</td>
                  <td>
                    {this.state.data?.commissionedDate
                      ? moment(this.state.data?.commissionedDate).format(
                          "DD-MM-YYYY"
                        )
                      : ""}
                  </td>
                </tr>
                <tr key="wwtd">
                  <td width="110px">Warranty Till Date</td>
                  <td>
                    {this.state.data?.warrantyTillDate
                      ? moment(this.state.data?.warrantyTillDate).format(
                          "DD-MM-YYYY"
                        )
                      : ""}
                  </td>
                </tr>
                <tr key="wstatus">
                  <td>Warranty Status</td>
                  <td>
                    {this.state.data?.warrantyTillDate &&
                    moment(this.state.data?.warrantyTillDate).isAfter(
                      moment()
                    ) ? (
                      <Tag style={{ background: "green", color: "#ffffff" }}>
                        Active
                      </Tag>
                    ) : (
                      <Tag style={{ background: "red", color: "#ffffff" }}>
                        Expired
                      </Tag>
                    )}
                  </td>
                </tr>
              </table>

              <Text strong type="danger">
                <BarChartOutlined /> &nbsp; REPORTS
              </Text>
              <table className="product-verification">
                {this.state.data?.productFiles?.map((e) => (
                  <tr>
                    <td width="80%">{e.title}</td>
                    <td align="center">
                      {!!e.view && (
                        <a target="_blank" href={remoteAsset(e.fileName)}>
                          <EyeFilled style={{ color: "#FF0000" }} />
                        </a>
                      )}
                    </td>
                    <td align="center">
                      {!!e.download && (
                        <a
                          download={this.state.data?.assetName + e.fileName}
                          href={remoteAsset(e.fileName)}
                        >
                          <DownloadOutlined style={{ color: "#00D100" }} />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </table>
            </Col>
          </Row>
        </Content>
        <Footer
          style={{
            padding: "10px",

            color: "rgb(174 174 174)",
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <span>&copy; {moment().format("YYYY")} Powered By</span>

          <img
            src="/byteFactory.png"
            alt="logo"
            style={{ maxWidth: "120px" }}
          />
        </Footer>
      </Layout>
    );
  }
}

export default withRouter(ProductVerification);
