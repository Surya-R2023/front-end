import React, { Component } from "react";
import ImageMapper from "react-image-mapper";
import { Col, Descriptions, Row, Spin, Card } from "antd";
import { withForm } from "../../../utils/with-form";
import Page from "../../../utils/page/page";
import PlantService from "../../../services/plant-service";
import { Link } from "react-router-dom";
import { withRouter } from "../../../utils/with-router";
import { mapKey } from "../../../helpers/url";
import { remoteAsset } from "../../../helpers/url";
import GoogleMapReact from "google-map-react";
import BuildingDetail from "../building-detail/building-detail";
class BuildingView extends Component {
  service = new PlantService();
  state = {
    plantId: undefined,
    map: {
      name: "generated",
      areas: [
        {
          id: "1",
          shape: "poly",
          coords: [
            209, 61, 209, 83, 246, 78, 419, 74, 426, 75, 429, 75, 428, 69, 427,
            46, 332, 49, 222, 58,
          ],
          preFillColor: "red",
        },
      ],
    },
  };
  onImageClick = (event) => {
    this.setState((state) => {
      let map = state.map;
      let coords = map.areas[0].coords;
      let x = event.nativeEvent.layerX;
      let y = event.nativeEvent.layerY;
      map.areas[0].coords.push(x, y);

      console.log(map);
      return { ...state, map: map };
    });
  };
  componentDidMount() {
    let plantId = this.props.searchParams.get("plantId");
    if (plantId) {
      this.setState((state) => ({ ...state, plantId: plantId }));
      this.getData(plantId);
    }
  }

  getData(id) {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.service.retrieve(id).then((response) => {
      this.setState((state) => ({
        ...state,
        data: response.data,
        isLoading: false,
      }));
    });
  }

  render() {
    const { data } = this.state;
    return (
      <Page title="Building View">
        <BuildingDetail />
        <Spin spinning={this.state.isLoading}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Card
                bodyStyle={{
                  maxHeight: "275px",
                  padding: "5px",
                  overflow: "auto",
                }}
              >
                <Descriptions
                  bordered
                  labelStyle={{ fontWeight: 600 }}
                  size="small"
                  column={{ xs: 1, sm: 2, md: 3, lg: 3 }}
                >
                  <Descriptions.Item label="Customer Name">
                    {data?.customerName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Contact Person 1">
                    {data?.contactPerson1Name}
                  </Descriptions.Item>

                  <Descriptions.Item label="Contact Person 2">
                    {data?.contactPerson2Name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Landline No.">
                    {data?.cdLandlineNo}
                  </Descriptions.Item>

                  <Descriptions.Item label="Civil Defence No.">
                    {data?.cdMobileNo}
                  </Descriptions.Item>
                  <Descriptions.Item label="Building Category">
                    {data?.buildingCategory}
                  </Descriptions.Item>

                  <Descriptions.Item label="No. of Residential">
                    {data?.noOfResidential}
                  </Descriptions.Item>
                  <Descriptions.Item label="Hazardous Material">
                    {data?.hazardousMaterial}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col sm={8}>
              <Card bodyStyle={{ height: "448px", padding: "5px" }}>
                <GoogleMapReact
                  center={{
                    lat: data?.latitude,
                    lng: data?.longitude,
                  }}
                  defaultCenter={{
                    lat: 10.99835602,
                    lng: 77.01502627,
                  }}
                  defaultZoom={18}
                  bootstrapURLKeys={{ key: mapKey }}
                  options={function (maps) {
                    return {
                      panControl: true,
                      mapTypeControl: true,
                      fullscreenControl: false,
                    };
                  }}
                >
                  {data && (
                    <div
                      width="32px"
                      lat={data.latitude}
                      lng={data.longitude}
                      title={data.customerName}
                    >
                      <img
                        src="http://maps.google.com/mapfiles/ms/micons/red.png"
                        style={{
                          width: "28px",
                          height: "28px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                </GoogleMapReact>
              </Card>
            </Col>
            {/* <Col sm={10}>
              <div style={{ float: "right" }}>
                <Link to={`../asset-list?plantId=${this.state?.plantId}`}>
                  <Tooltip title="Asset">
                    <Button type="primary">
                      <MenuOutlined />
                    </Button>
                  </Tooltip>
                </Link>
              </div>
            </Col> */}
            <Col span={24}>
              <Card
                bodyStyle={{
                  padding: "5px",
                  textAlign: "center",
                  overflow: "auto",
                }}
              >
                {/* <Link to={`../floor-view?plantId=${this.state?.plantId}`}> */}
                <ImageMapper
                  src={remoteAsset(data?.imageUrl)}
                  width={940}
                  imgWidth={940}
                  map={this.state.map}
                  onImageClick={this.onImageClick}
                />
                {/* </Link> */}
              </Card>
            </Col>
          </Row>
        </Spin>
      </Page>
    );
  }
}

export default withRouter(withForm(BuildingView));
