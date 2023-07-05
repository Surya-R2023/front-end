import { FireFilled, WarningFilled } from "@ant-design/icons";
import {
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import axios from "axios";
import React from "react";
import { remoteAsset } from "../../../helpers/url";
import PlantService from "../../../services/plant-service";
import Page from "../../../utils/page/page";
import { withForm } from "../../../utils/with-form";
import { withRouter } from "../../../utils/with-router";
import FilterFunctions from "../common/filter-functions";
import Triga from "../triga/triga";
const { Text, Title } = Typography;
const style = {
  formItem: {
    minWidth: "150px",
  },
  online: { color: "green" },
  offline: { color: "grey" },
  alarm: { color: "orange" },
  disable: { color: "#dddddd", opacity: 0.5 },
  progressTable: {
    display: "flex",
    gap: "5px",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#f5f5f5",
    padding: "5px 10px",
  },
};
function Alert(props) {
  return (
    <div
      className="blink_me"
      style={{
        background: "red",
        position: "absolute",
        height: "25px",
        width: "25px",
        display: "inline-block",
        borderRadius: "50%",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...props.style,
      }}
    >
      <FireFilled />
    </div>
  );
}

function Warning(props) {
  return (
    <div
      className="blink_me"
      style={{
        background: "orange",
        position: "absolute",
        height: "25px",
        width: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        color: "#ffffff",

        ...props.style,
      }}
    >
      <WarningFilled />
    </div>
  );
}

function Light(props) {
  return (
    <div
      className="blink_me"
      style={{
        background: "red",
        position: "absolute",
        height: "25px",
        width: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        color: "#ffffff",

        ...props.style,
      }}
    ></div>
  );
}

const marks = [
  { id: "L1_D1", left: 270, top: 155, right: "auto" },
  { id: "L1_D2", left: 315, top: 155, right: "auto" },
  { id: "L1_D3", left: 358, top: 155, right: "auto" },
  { id: "L1_D4", left: 403, top: 155, right: "auto" },
  { id: "L1_D5", left: 570, top: 200, right: "auto" },
  { id: "L1_D6", left: 610, top: 200, right: "auto" },
  { id: "L1_D7", left: 650, top: 200, right: "auto" },
  { id: "L1_D8", left: 690, top: 200, right: "auto" },
  { id: "CommonFlashing", right: 90, top: 300, left: "auto" },
  { id: "CommonFlashing2", right: 115, top: 300, left: "auto" },
];

class BuildingView extends FilterFunctions {
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
            208, 135, 277, 139, 342, 140, 406, 141, 427, 140, 426, 170, 346,
            167, 259, 163, 207, 159,
          ],
          preFillColor: "red",
        },
      ],
    },
  };
  onImageClick = (event) => {
    let x = event.nativeEvent.layerX;
    let y = event.nativeEvent.layerY;
    console.log({ x, y });
    // this.setState((state) => {
    //   let map = state.map;
    //   let coords = map.areas[0].coords;
    //   let x = event.nativeEvent.layerX;
    //   let y = event.nativeEvent.layerY;
    //   map.areas[0].coords.push(x, y);
    //   console.log(JSON.stringify(map));
    //   return { ...state, map: map };
    // });
  };
  componentDidMount() {
    this.getContinentList();
    this.getCustomerList();
    let plantId = this.props.searchParams.get("plantId");
    if (plantId) {
      this.props.form.setFieldValue("customerId", Number(plantId));
      this.setState((state) => ({ ...state, plantId: plantId }));
      this.getData(plantId);
    }
  }
  handleClick = (area, index, event) => {
    this.props.navigate(
      `../floor-view?plantId=${this.state.plantId}&floorId=${area.id}`
    );
  };
  getData = async (id) => {
    await this.setState((state) => ({ ...state, isLoading: true }));
    let { data } = await this.service.retrieve(id);
    let isExists = await this.exists(remoteAsset(data?.imageUrl));
    await this.setState((state) => ({
      ...state,
      data: data,
      isExists: isExists,
      isLoading: false,
    }));
    // this.service.retrieve(id).then((response) => {

    //   this.setState((state) => ({
    //     ...state,
    //     data: response.data,
    //     isLoading: false,
    //   }));
    // });
  };

  async exists(url) {
    const result = await axios(url, { method: "HEAD" });
    return result.status == 200;
  }
  render() {
    const { data } = this.state;
    return (
      <Page
        title={
          <Row align="middle" gutter={10}>
            <Col>{data?.customerName}</Col>
            <Col>
              {data?.hazardousMaterial && (
                <Image src="/warning.gif" preview={false} width="40px" />
              )}
            </Col>
          </Row>
        }
        filter={
          <Form
            size="small"
            // onFinish={this.search}
            // onValuesChange={this.search}
            form={this.props.form}
            layout="inline"
            initialValues={{ mode: null }}
          >
            <Form.Item name="mode" hidden>
              <Input />
            </Form.Item>
            <Form.Item name="region" style={style.formItem}>
              <Select
                showArrow={false}
                showSearch={true}
                onChange={this.getCountryList}
                loading={this.state.isContinentListLoading}
                allowClear
                placeholder="Region"
                options={this.state.continentList}
              ></Select>
            </Form.Item>
            <Form.Item name="country" style={style.formItem}>
              <Select
                showArrow={false}
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
                showArrow={false}
                onChange={this.getCustomerList}
                showSearch
                loading={this.state.isStateListLoading}
                placeholder="State"
                allowClear
                options={this.state.stateList}
              ></Select>
            </Form.Item>
            <Form.Item name="customerId" style={style.formItem}>
              <Select
                showArrow={false}
                showSearch
                onChange={this.getData}
                loading={this.state.isCustomerListLoading}
                placeholder="Site"
                options={this.state.customerList}
              ></Select>
            </Form.Item>
          </Form>
        }
      >
        <Spin spinning={this.state.isLoading}>
          <Row align="middle" gutter={10}>
            <Col>
              <Title level={2}>{data?.customerName}</Title>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Triga data={data} />
            </Col>
            {this.state.isExists && (
              <Col span={24}>
                <Card
                  bodyStyle={{
                    padding: "5px",
                    textAlign: "center",
                    overflow: "auto",
                  }}
                >
                  {/* <Link to={`../floor-view?plantId=${this.state?.plantId}`}> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      background: "#333333",
                    }}
                  >
                    {/* <ImageMapper
                      src={remoteAsset(data?.imageUrl)}
                      width={940}
                      imgWidth={940}
                      map={this.state.map}
                      onImageClick={this.onImageClick}
                      onClick={this.handleClick}
                    /> */}
                  </div>
                  {/* </Link> */}
                </Card>
              </Col>
            )}

            {/* <Col sm={12}>
              <Row gutter={[10, 10]}>
                <Col sm={24}>
                  <BuildingDetailCard
                    title="Site"
                    icon={<HiOutlineBuildingOffice2 />}
                    color="green"
                    description={
                      <>
                        <Space
                          size={30}
                          
                          style={{ lineHeight: "10px", flexWrap: "wrap" }}
                        >
                          <Text>
                            <Space size={10} style={{ lineHeight: "10px" }}>
                              <BsTelephone />
                              <span>{data?.buildingLandlineNo}</span>
                            </Space>
                          </Text>
                          <Text>
                            <Space size={10} style={{ lineHeight: "10px" }}>
                              <MdOutlineCategory />
                              <span>{data?.buildingCategory}</span>
                            </Space>
                          </Text>
                          {data?.buildingCategory == "Residential" && (
                            <Text>
                              <Space size={10} style={{ lineHeight: "10px" }}>
                                <HiOutlineUserGroup />
                                <span>
                                  {data?.noOfResidential} Residentials
                                </span>
                              </Space>
                            </Text>
                          )}
                          {data?.hazardousMaterial && (
                            <Text type="danger">
                              <Space size={10} style={{ lineHeight: "10px" }}>
                                <MdWarning />
                                <span>Hazardous Material</span>
                              </Space>
                            </Text>
                          )}

                         
                        </Space>
                      </>
                    }
                  />
                </Col>
                <Col sm={12}>
                  <BuildingDetailCard
                    title="Contact Person 1"
                    icon={<MdOutlineContactPhone />}
                    color="red"
                    description={
                      <>
                        <Text>
                          <Space size={10} style={{ lineHeight: "10px" }}>
                            <BsTelephone />
                            <span>{data?.contactPerson1Number}</span>
                          </Space>
                        </Text>
                      </>
                    }
                    description2={
                      <Text type="secondary">
                        <Space size={10} style={{ lineHeight: "10px" }}>
                          <BsPerson />
                          <span>{data?.contactPerson1Name}</span>
                        </Space>
                      </Text>
                    }
                  />
                </Col>
                <Col sm={12}>
                  <BuildingDetailCard
                    title="Contact Person 2"
                    icon={<MdOutlineContactPhone />}
                    color="red"
                    description={
                      <>
                        <Text>
                          <Space size={10} style={{ lineHeight: "10px" }}>
                            <BsTelephone />
                            <span>{data?.contactPerson2Number}</span>
                          </Space>
                        </Text>
                      </>
                    }
                    description2={
                      <Text type="secondary">
                        <Space size={10} style={{ lineHeight: "10px" }}>
                          <BsPerson />
                          <span>{data?.contactPerson2Name}</span>
                        </Space>
                      </Text>
                    }
                  />
                </Col>

                <Col sm={24}>
                  <BuildingDetailCard
                    title="Civil Defence"
                    icon={<MdEmergency />}
                    color="#7265e6"
                    description={
                      <>
                        <Text>
                          <Space size={10} style={{ lineHeight: "10px" }}>
                            <BsTelephone />
                            <span>
                              {data?.cdMobileNo}, {data?.cdLandlineNo}
                            </span>
                          </Space>
                        </Text>
                      </>
                    }
                  />
                </Col>
              </Row>
            </Col> */}

            {/* <Col sm={12}>
              <Card bodyStyle={{ height: "422px", padding: "5px" }}>
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
                      mapTypeControl: false,
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
            </Col> */}
          </Row>
        </Spin>
      </Page>
    );
  }
}

export default withRouter(withForm(BuildingView));
