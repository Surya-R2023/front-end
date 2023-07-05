import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Spin,
  DatePicker,
} from "antd";
import React from "react";
import { message } from "antd";
import AddWarrantyService from "../../../services/add-warranty-service";
import AssetLibraryService from "../../../services/asset-library-service";
import AssetService from "../../../services/asset-service";
import GatewayMappingService from "../../../services/gateway-mapping-service";
import OrganisationService from "../../../services/organisation-service";
import PlantService from "../../../services/plant-service";
import PageForm from "../../../utils/page/page-form";
import { withForm } from "../../../utils/with-form";
import moment from "moment";
import dayjs from "dayjs";
import LoginService from "../../../services/login-service";
import UserService from "../../../services/user-service";
const { TextArea } = Input;
const { Option } = Select;

class WarrantyDetails extends PageForm {
  // assetCustomerService = new PlantService();
  // serverService = new GatewayMappingService();
  // organisationService = new OrganisationService();
  // assetLibraryService = new AssetLibraryService();
  authService = new LoginService();
  userservice = new UserService();
  service = new AssetService();
  warrantyService = new AddWarrantyService();

  state = {
    isEdit: this.props.mode === "Add",
  };

  handleEditButtonClick = () => {
    const userDetails = this.state.userDetails;
    if (userDetails.length > 0 && userDetails[0].role.roleId === 1) {
      this.setState({ isEdit: true });
    } else {
      message.error("Only admin can change the T&C date");
      this.setState({ isEdit: false });
    }
  };
  closePopup = (id) => {
    this.props.next(id);
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(data.data.assetId);
  }
  getLoginUserName = () => {
    let curruser = this.authService.getUserName();
    console.log("currentuser", curruser);
    this.validateAdminAccess(curruser);
  };

  validateAdminAccess = (curruser) => {
    this.userservice.list({ email: curruser }).then((response) => {
      this.setState((state) => ({
        ...state,
        userDetails: response.data,
      }));
    });
  };
  getOrgValue = (value) => {
    let c = this.state.customer.find((e) => e.customerId === value);
    this.props.form.setFieldValue("organisationId", c?.organisationId);
  };

  componentDidMount() {
    Promise.all([
      // this.assetCustomerService.list({ active: true }),
      // this.serverService.list({ active: true }),
      // this.organisationService.list({ active: true }),
      // this.assetLibraryService.list({ active: true }),
      //  this.warrantyService.list({ active: true }),
      this.service.list({ active: true }),
    ]).then((response) => {
      this.setState((e) => ({
        ...this.state,
        // server: response[1].data,
        // customer: response[0].data,
        // organisation: response[2].data,
        // assetLibrary: response[3].data,
        //  warranty: response[4].data,
        service: response[0].data,
      }));
    });
    this.getLoginUserName();
    super.componentDidMount();
    console.log("mode check", this.props.mode, "all props", this.props);
  }

  saveFn(data) {
    if (this.props.id) return this.service.patch(data, this.props.id);
    return this.warrantyService.add(data);
  }
  patchForm(data) {
    if (this.props.form) {
      console.log("dataa", data);
      if (data.commissionedDate || data.warrantyTillDate) {
        this.props.form.setFieldsValue({
          ...data,
          warrantyPeriod: data.warrantyPeriod,
          commissionedDate: dayjs(data.commissionedDate),
          warrantyTillDate: dayjs(data.warrantyTillDate),
        });
      }
    }
  }
  // patchForm(data) {
  //   if (this.props.form) {
  //     this.props.form.setFieldsValue({
  //       ...data,
  //       warrantyTillDate: dayjs(data.warrantyTillDate),
  //     });
  //     this.props.form.setFields({
  //       commissionedDate: {
  //         value: dayjs(data.commissionedDate),
  //         disabled: true,
  //       },
  //     });
  //   }
  // }
  render() {
    console.log("ud", this.state.userDetails);
    const { isEdit } = this.state;
    return (
      <Spin spinning={!!this.state.isLoading}>
        <Form
          size="small"
          form={this.props.form}
          // className="form-horizontal"
          colon={false}
          // labelCol={{ sm: 8, xs: 24 }}
          // wrapperCol={{ sm: 16, xs: 24 }}
          // labelAlign="left"
          layout="vertical"
          onFinish={this.onFinish}
          preserve={false}
        >
          <Row justify="end">
            <Col>
              <Button onClick={this.handleEditButtonClick}>Edit</Button>
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            <Form.Item name="assetId" hidden>
              <Input />
            </Form.Item>
            <Col sm={8} xs={24}>
              <Form.Item
                name="commissionedDate"
                label="Testing & Commissioned Date"
                rules={[
                  {
                    required: true,
                    message: "Please input the Testing & Commissioned Date",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                  disabled={!isEdit}
                />
              </Form.Item>
            </Col>
            <Col sm={8} xs={24}>
              <Form.Item
                name="warrantyPeriod"
                label="Warranty Period"
                rules={[
                  {
                    required: true,
                    message: "Please input the  Warranty Period",
                  },
                ]}
              >
                <Input placeholder="In Days" disabled={!isEdit} />
              </Form.Item>
            </Col>
            <Col sm={8} xs={24}>
              <Form.Item
                name="warrantyTillDate"
                label="Warranty Period Till"
                rules={[
                  {
                    required: true,
                    message: "Please input the Warranty Period Till",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabled={!isEdit}
                  format="DD-MM-YYYY"
                  // initialValue={dayjs()}
                  defaultValue={dayjs()}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Col>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
}

export default withForm(WarrantyDetails);
