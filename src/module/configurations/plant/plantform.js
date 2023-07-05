import {
  Button,
  Form,
  Input,
  Spin,
  Select,
  Row,
  Tabs,
  Col,
  Upload,
  InputNumber,
  Card,
} from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

import React, { useState, useEffect } from "react";
import PlantService from "../../../services/plant-service";
import PageForm from "../../../utils/page/page-form";
import { Radio } from "antd";
import Page from "../../../utils/page/page";
import { withRouter } from "../../../utils/with-router";
import OrganisationService from "../../../services/organisation-service";
import { removeSpaceAndSpecialChar } from "../../../services/validation";
import { onlyNumber } from "../../../services/validation";
import ContinentService from "../../../services/continent-service";
import CountryService from "../../../services/country-service";
import StateService from "../../../services/state-service";
import { withForm } from "../../../utils/with-form";
import { convertToFormData } from "../../../services/utils";
import { remoteAsset } from "../../../helpers/url";
//import { MaskedInput } from "antd-mask-input";
import { Country, State, City }  from 'country-state-city';

const { TextArea } = Input;

const { Option } = Select;
const style = {
  formItem: {
    minWidth: "120px",
  },
};

class PlantForm extends PageForm {
  continentService = new ContinentService();
  countryService = new CountryService();
  stateService = new StateService();
  service = new PlantService();
  organisationService = new OrganisationService();
  plantService = new PlantService();
  closePopup = () => {
    this.props.navigate("../");
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup();
  }
  saveFn(data) {
    let formData = convertToFormData(data);
    if (this.state.fileList?.length > 0) {
      console.log(this.state.fileList);
      if (this.state.fileList[0].originFileObj) {
        formData.append("image", this.state.fileList[0]?.originFileObj);
      }
    }

    return super.saveFn(formData);
  }
  constructor() {
    super();
    this.getCountryList = this.getCountryList.bind(this);
    this.getStateList = this.getStateList.bind(this);
  }

  patchForm(data) {
    if (data.imageUrl) {
      let url = data.imageUrl;
      this.setState((state) => ({
        ...state,
        fileList: [
          {
            uid: "-1",
            name: url.substring(url.lastIndexOf("/") + 1),
            status: "done",
            thumbUrl: remoteAsset(url),
            url: remoteAsset(url),
          },
        ],
      }));
    }

    super.patchForm(data);
  }

  beforeUpload = (file, fileList) => {
    // console.log("bu", fileList);

    return false;
  };

  onChange = ({ fileList: newFileList }) => {
    // console.log("c", newFileList);
    this.setState((state) => ({ ...state, fileList: newFileList }));
  };
  onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  componentDidMount() {
    this.setState((state)=>({...state,
      regionCode:Country.getAllCountries(),
      regionCode2:Country.getAllCountries()
    }))
    super.componentDidMount();
    Promise.all([
      this.organisationService.list({ active: true }),
      this.plantService.list({ active: true }),
    ]).then((response) => {
      this.setState((state, props) => ({
        ...state,
        organisation: response[0].data,
        customer: response[0].data,
        activeKey: "1",
      }));
    });
    this.getContinentList();
    if (this.props.params.id) {
      this.onRetrieve(this.props.params.id);
      this.closePopup = () => this.props.navigate("../");
      if (this.props.mode == "Edit")
        this.setState((state) => ({ ...state, title: "Edit Customer" }));
      else if (this.props.mode == "View")
        this.setState((state) => ({
          ...state,
          title: "View Customer",
          disabled: true,
        }));
    } else {
      this.setState((state) => ({ ...state, title: "Add Customer" }));
    }
  }
  triggerInitialChange() {
    this.getCountryList(this.props.form.getFieldValue("continent"));
    this.getStateList(this.props.form.getFieldValue("country"));
  }

  onTabChange = (value) => {
    if (this.props.mode == "View") {
      this.setState({ ...this.state, activeKey: value });
    }
  };
  toggleDisable = (e) => {
    console.log("e",e);
    if (e.target.value === "Residents")
      this.setState((state, props) => ({ ...state, enableResidential: true }));
    else
      this.setState((state, props) => ({ ...state, enableResidential: false }));
  };
  next = () => {
    this.setState((state) => ({
      ...this.state,
      activeKey: String(Number(state.activeKey) + 1),
    }));
  };
  prev = () => {
    this.setState((state) => {
      if (Number(state.activeKey) > 1)
        return {
          ...this.state,
          activeKey: String(Number(state.activeKey) - 1),
        };
    });
  };

  getContinentList() {
    this.setState((state, props) => ({
      ...state,
      isContinentListLoading: true,
      continentList: [],
    }));
    this.continentService
      .list({ active: true })
      .then((response) => {
        this.setState((state, props) => ({
          ...state,
          continentList: response.data?.map((e) => ({
            label: e.continentName,
            value: e.continentId,
          })),
        }));
      })
      .finally(() => {
        this.setState((state, props) => ({
          ...state,
          isContinentListLoading: false,
        }));
      });
  }
  getCountryList(continentId) {
    this.setState((state, props) => ({
      ...state,
      isCountryListLoading: true,
      countryList: [],
    }));
    this.countryService
      .list({ active: true, continentId: continentId })
      .then((response) => {
        this.setState((state, props) => ({
          ...state,
          countryList: response.data?.map((e) => ({
            label: e.countryName,
            value: e.countryId,
          })),
        }));
      })
      .finally(() => {
        this.setState((state, props) => ({
          ...state,
          isCountryListLoading: false,
        }));
      });
  }
  getStateList(countryId) {
    this.setState((state, props) => ({
      ...state,
      isStateListLoading: true,
      stateList: [],
    }));
    this.stateService
      .list({ active: true, countryId: countryId })
      .then((response) => {
        this.setState((state, props) => ({
          ...state,
          stateList: response.data?.map((e) => ({
            label: e.stateName,
            value: e.stateId,
          })),
        }));
      })
      .finally(() => {
        this.setState((state, props) => ({
          ...state,
          isStateListLoading: false,
        }));
      });
  }
  render() {
    const items = [
      {
        label: "Basic Details",
        key: "1",
        children: (
          <Card>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                {/* <Form> */}
                <Col sm={8}>
                  <Form.Item hidden name="customerId">
                    <Input />
                  </Form.Item>
                </Col>
                <Row gutter={[10, 10]}>
                  <Col sm={11}>
                    <Form.Item
                      label="Site Name"
                      name="customerName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your site name!",
                        },
                      ]}
                    >
                      <Input maxLength={200} />
                    </Form.Item>
                  </Col>
                  <Col sm={11}>
                    <Form.Item
                      label="Organisation"
                      name="organisationId"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your organisation!",
                        },
                      ]}
                    >
                      <Select>
                        {this.state.organisation?.map((e) => (
                          <Option
                            key={`org${e.organisationId}`}
                            value={e.organisationId}
                          >
                            {e.organisationName}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[10, 10]}>
                  <Col sm={8}>
                    <Form.Item
                      label="Region"
                      name="region"
                      rules={[
                        { required: true, message: "Please select region" },
                      ]}
                    >
                      <Select
                        onChange={this.getCountryList}
                        loading={this.state.isContinentListLoading}
                        showSearch
                        options={this.state.continentList ?? []}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Country"
                      name="country"
                      rules={[
                        { required: true, message: "Please select country" },
                      ]}
                    >
                      <Select
                        onChange={this.getStateList}
                        showSearch
                        loading={this.state.isCountryLoading}
                        allowClear
                        options={this.state.countryList ?? []}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col sm={8}>
                    <Form.Item
                      label="State"
                      name="state"
                      rules={[
                        { required: true, message: "Please select state" },
                      ]}
                    >
                      <Select
                        showSearch
                        onChange={this.getCustomerList}
                        loading={this.state.isStateListLoading}
                        allowClear
                        options={this.state.stateList ?? []}
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[10, 10]}>
                  <Col sm={8}>
                    <Form.Item label="Description" name="description">
                      <TextArea rows={4} maxLength={200} />
                    </Form.Item>
                  </Col>
                  <Col sm={8}>
                    <Form.Item label="Address" name="address">
                      <TextArea rows={4} maxLength={200} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item name="active" label="Status" initialValue={true}>
                      <Radio.Group>
                        <Radio value={true}>Active</Radio>
                        <Radio value={false}>In active</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="end">
              <Button type="primary" htmlType="button" onClick={this.next}>
                Next
              </Button>
            </Row>
          </Card>
        ),
      },
      {
        label: "Contact Details",
        key: "2",
        children: (
          <Card>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                {/* <Form> */}
                <Row gutter={[10, 10]}>
                  <Col sm={8}>
                    <Form.Item
                      label="Building Landline No."
                      name="buildingLandlineNo"
                      rules={[
                        {
                          required: true,
                          message: "Please input Building Landing No",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Latitude"
                      name="latitude"
                      rules={[
                        { required: true, message: "Please input Latitude" },
                      ]}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        min={-90}
                        max={90}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Longitude"
                      name="longitude"
                      rules={[
                        { required: true, message: "Please input Longitude" },
                      ]}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        min={-180}
                        max={180}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[10, 10]}>
                  <Col span={8}>
                    <Form.Item
                      label="Contact Person 1"
                      name="contactPerson1Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input Contact Person",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={4}>
                    <Form.Item
                      label="Region Code"
                      name="contactPerson1RegionCode"
                      rules={[
                        {
                          required: true,
                          message: "Please select RegionCode",
                        },
                      ]}
                    >
                      <Select
                      showSearch>
                        {this.state.regionCode?.map((e)=>(
                        <Option
                        key={e.phonecode}
                        value={"+"+e.phonecode}>
                          {`+${e.phonecode}`}
                        </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col sm={8}>
                    <Form.Item
                      label="Phone Number"
                      name="contactPerson1Number"
                      rules={[
                        {
                          required: true,
                          message: "Please input Phone Number",
                        },
                      ]}
                    >
                      <Input onKeyPress={onlyNumber} maxLength={20} /> 
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[10, 10]}>
                  <Col span={8}>
                    <Form.Item
                      label="Contact Person 2"
                      name="contactPerson2Name"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col sm={4}>
                    <Form.Item
                      label="Region Code"
                      name="contactPerson2RegionCode"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please select RegionCode",
                      //   },
                      // ]}
                    >
                      <Select
                      showSearch>
                        {this.state.regionCode2?.map((e)=>(
                        <Option
                        key={e.phonecode}
                        value={"+"+e.phonecode}>
                          {`+${e.phonecode}`}
                        </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Phone Number" name="contactPerson2Number">
                      <Input onKeyPress={onlyNumber} maxLength={20} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Button onClick={this.prev}>Back</Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="button" onClick={this.next}>
                  Next
                </Button>
              </Col>
            </Row>
          </Card>
        ),
      },
      {
        label: "Civil Defence",
        key: "3",
        children: (
          <Card>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                {/* <Form> */}
                <Row gutter={[10, 10]}>
                  <Col span={8}>
                    <Form.Item
                      label="Phone Number"
                      onKeyPress={onlyNumber}
                      maxLength={20}
                      name="cdMobileNo"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Landline Number"
                      onKeyPress={onlyNumber}
                      maxLength={20}
                      name="cdLandlineNo"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                {/* </Form> */}
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Button onClick={this.prev}>Back</Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="button" onClick={this.next}>
                  Next
                </Button>
              </Col>
            </Row>
          </Card>
        ),
      },
      {
        label: "Others",
        key: "4",
        children: (
          <Card>
            <Row gutter={[10, 10]}>
              <Col span={24}>
                {/* <Form> */}
                <Row gutter={[10, 10]}>
                  <Col span={8}>
                    <Form.Item
                      name="buildingCategory"
                      label="Building Category"
                      initialValue={true}
                      rules={[
                        {
                          required: true,
                          message: "Please select building category",
                        },
                      ]}
                    >
                      <Radio.Group onChange={this.toggleDisable}>
                        <Radio value="Residents">Residents</Radio>
                        <Radio value="Commercial">Commercial</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="No of Residents" name="noOfResidential">
                      <Input
                        disabled={
                          this.props.form.getFieldValue("buildingCategory") !=
                          "Residents"
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="hazardousMaterial"
                      label="Hazardous Material"
                      initialValue={true}
                      rules={[{ required: true, message: "Please select" }]}
                    >
                      <Radio.Group>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Button onClick={this.prev}>Back</Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="button" onClick={this.next}>
                  Next
                </Button>
              </Col>
            </Row>
          </Card>
        ),
      },
      {
        label: "Image",
        key: "5",
        children: (
          <Card>
            <Row gutter={[10, 10]} justify="space-between">
              <Col span={24}>
                <Form.Item name="imageUrl" hidden>
                  <Input />
                </Form.Item>
                <Form.Item label="Image">
                  {/* <ImgCrop minZoom={0.5} quality={1}> */}
                  <Upload.Dragger
                    action={null}
                    maxCount={1}
                    // beforeUpload={this.beforeUpload}
                    listType="picture"
                    fileList={this.state.fileList}
                    onChange={this.onChange}
                    onPreview={this.onPreview}
                    // onRemove={}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload.
                    </p>
                  </Upload.Dragger>
                  {/* </ImgCrop> */}
                </Form.Item>
              </Col>

              <Col>
                <Button onClick={this.prev}>Back</Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </Card>
        ),
      },
    ];
    return (
      <Page title={this.state.title}>
        <Spin spinning={!!this.state.isLoading}>
          <Row justify="center" gutter={[10, 10]}>
            <Col sm={18}>
              <Form
                size="small"
                labelAlign="left"
                colon={false}
                layout="vertical"
                form={this.props.form}
                // labelCol={{ sm: 4, xs: 24 }}
                // wrapperCol={{ sm: 8, xs: 24 }}
                key={this.props?.id}
                disabled={this.state?.disabled}
                onFinish={this.onFinish}
              >
                <Tabs
                  onChange={this.onTabChange}
                  defaultActiveKey="1"
                  activeKey={this.state.activeKey}
                  items={items}
                />
              </Form>
            </Col>
          </Row>
        </Spin>
      </Page>
    );
  }
}

export default withRouter(withForm(PlantForm));
