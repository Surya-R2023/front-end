// import {
//   Button,
//   Col,
//   Form,
//   Input,
//   InputNumber,
//   Radio,
//   Row,
//   Select,
//   Spin,
//   DatePicker,
//   TreeSelect
// } from "antd";
// import React from "react";

// import AssetLibraryService from "../../../services/asset-library-service";
// import AssetService from "../../../services/asset-service";
// import GatewayMappingService from "../../../services/gateway-mapping-service";
// import OrganisationService from "../../../services/organisation-service";
// import PlantService from "../../../services/plant-service";
// import PageForm from "../../../utils/page/page-form";
// import { withForm } from "../../../utils/with-form";
// // import moment from "moment";
// import dayjs from "dayjs";
// import LoginService from "../../../services/login-service";
// import UserService from "../../../services/user-service";
// const { TextArea } = Input;
// const { Option } = Select;

// class BasicDetails extends PageForm {
//   // assetCustomerService = new PlantService();
//   // serverService = new GatewayMappingService();
//   organisationService = new OrganisationService();
//   assetLibraryService = new AssetLibraryService();
//   authService = new LoginService();
//   userservice = new UserService();
//   service = new AssetService();
//   //  warrantyService = new AddWarrantyService();
//   closePopup = (id) => {
//     this.props.next(id);
//   };
//   onSuccess(data) {
//     super.onSuccess(data);
//     this.closePopup(data.data.assetId);
//   }
//   getUserName = () => {
//     let curruser = this.authService.getUserName();
//     // let currentUserRole = this.userservice.
//     console.log("currentuser", curruser);
//     return this.authService.getUserName();
//   };
//   getOrgValue = (value) => {
//     let c = this.state.customer.find((e) => e.customerId === value);
//     this.props.form.setFieldValue("organisationId", c?.organisationId);
//   };

//   componentDidMount() {
//     Promise.all([
//       this.assetCustomerService.list({ active: true }),
//       this.serverService.list({ active: true }),
//       this.organisationService.list({ active: true }),
//       this.assetLibraryService.list({ active: true }),
//       //  this.warrantyService.list({ active: true }),
//       this.service.list({ active: true }),
//     ]).then((response) => {
//       this.setState((e) => ({
//         ...this.state,
//         server: response[1].data,
//         customer: response[0].data,
//         organisation: response[2].data,
//         assetLibrary: response[3].data,
//         //  warranty: response[4].data,
//         service: response[4].data,
//       }));
//     });
//     this.getUserName();
//     super.componentDidMount();
//   }

//   saveFn(data) {
//     if (this.props.id) return this.service.patch(data, this.props.id);
//     return this.service.add(data);
//   }
//   patchForm(data) {
//     if (this.props.form) {
//       this.props.form.setFieldsValue({
//         ...data,
//         commissionedDate: dayjs(data.commissionedDate),
//         warrantyTillDate: dayjs(data.warrantyTillDate),
//       });
//     }
//   }
//   render() {
//     return (
//       <Spin spinning={!!this.state.isLoading}>
//         <Form
//           size="small"
//           form={this.props.form}
//           // className="form-horizontal"
//           colon={false}
//           // labelCol={{ sm: 8, xs: 24 }}
//           // wrapperCol={{ sm: 16, xs: 24 }}
//           // labelAlign="left"
//           layout="vertical"
//           onFinish={this.onFinish}
//           preserve={false}
//         >
//           <Row gutter={[20, 20]}>
//             <Col sm={12} xs={24}>
//               <Form.Item name="assetId" hidden>
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 name="assetName"
//                 label="Asset Name"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the AssetName",
//                   },
//                 ]}
//               >
//                 <Input autoFocus maxLength={200} />
//               </Form.Item>

//               <Form.Item
//                 label="Site "
//                 name="ahid"
//                 rules={[{ required: true, message: "Please select customer" }]}
//               >
//  <TreeSelect
//                   showSearch
//                   treeDefaultExpandAll
//                   style={{ width: "100%" }}
//                   allowClear
//                   treeData={this.state.parentTreeList}
//                 />
              
//               </Form.Item>
//               <Form.Item
//                 label="Organisation"
//                 name="organisationId"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please select organisation ",
//                   },
//                 ]}
//               >
//                 <Select>
//                   {this.state.organisation?.map((e) => (
//                     <Option
//                       key={`org${e.organisationId}`}
//                       value={e.organisationId}
//                     >
//                       {e.organisationName}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>

//               <Form.Item
//                 label="Asset Library"
//                 name="assetLibraryId"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please select asset library ",
//                   },
//                 ]}
//               >
//                 <Select>
//                   {this.state.assetLibrary?.map((e) => (
//                     <Option
//                       key={`asl${e.assetLibraryId}`}
//                       value={e.assetLibraryId}
//                     >
//                       {e.assetLibraryName}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//               {/* <Form.Item
//                 name="commissionedDate"
//                 label="Testing & Commissioned Date"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the Testing & Commissioned Date",
//                   },
//                 ]}
//               >
//                 <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
//               </Form.Item> */}
//             </Col>
//             <Col sm={12} xs={24}>
//               {/* <Col sm={12} xs={24}>
//                   <Form.Item
//                     label="Latitude"
//                     name="latitude"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please input the latitude",
//                       },
//                     ]}
//                   >
//                     <InputNumber min={-90} max={90} style={{ width: "100%" }} />
//                   </Form.Item>
//                 </Col>
//                 <Col sm={12} xs={24}>
//                   <Form.Item
//                     label="Longitude"
//                     name="longitude"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please input the longitude",
//                       },
//                     ]}
//                   >
//                     <InputNumber
//                       min={-180}
//                       max={180}
//                       style={{ width: "100%" }}
//                     />
//                   </Form.Item>
//                 </Col> */}

//               {/* <Form.Item label="Description" name="description">
//                 <TextArea rows={5} maxLength={60} />
//               </Form.Item> */}

//               {/* <Form.Item
//                 name="warrantyPeriod"
//                 label="Warranty Period"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the  Warranty Period",
//                   },
//                 ]}
//               >
//                 <Input placeholder="In Days" />
//               </Form.Item>

//               <Form.Item
//                 name="warrantyTillDate"
//                 label="Warranty Period Till"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input the Warranty Period Till",
//                   },
//                 ]}
//               >
//                 <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
//               </Form.Item> */}

//               <Form.Item name="active" label="Status" initialValue={true}>
//                 <Radio.Group>
//                   <Radio value={true}>Active</Radio>
//                   <Radio value={false}>In-active</Radio>
//                 </Radio.Group>
//               </Form.Item>
//               <Form.Item label="Description" name="description">
//                 <TextArea rows={5} maxLength={60} />
//               </Form.Item>
//             </Col>
//           </Row>

//           <Row justify="end">
//             <Col>
//               <Button type="primary" htmlType="submit">
//                 Next
//               </Button>
//             </Col>
//           </Row>
//         </Form>
//       </Spin>
//     );
//   }
// }

// export default withForm(BasicDetails);

import React from "react";
import { Button, Col, Form, Input, InputNumber, Radio, Row, Select, Spin, DatePicker, TreeSelect } from "antd";
// import React from "react";

import AssetLibraryService from "../../../services/asset-library-service";
import AssetService from "../../../services/asset-service";
import GatewayMappingService from "../../../services/gateway-mapping-service";
import OrganisationService from "../../../services/organisation-service";
import PlantService from "../../../services/plant-service";
import PageForm from "../../../utils/page/page-form";
import { withForm } from "../../../utils/with-form";
// import moment from "moment";
import dayjs from "dayjs";
import LoginService from "../../../services/login-service";
import UserService from "../../../services/user-service";
import AppHierarchyService from "../../../services/app-hierarchy-service";
const { TextArea } = Input;
const { Option } = Select;

class BasicDetails extends PageForm {
  // assetCustomerService = new PlantService();
  // serverService = new GatewayMappingService();
  organisationService = new OrganisationService();
  // assetLibraryService = new AssetLibraryService();
  authService = new LoginService();
  userservice = new UserService();
  service = new AssetService();
  appHierarchyService = new AppHierarchyService();
  //  warrantyService = new AddWarrantyService();
  closePopup = (id) => {
    this.props.next(id);
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(data.data.assetId);
  }
  getUserName = () => {
    let curruser = this.authService.getUserName();
    // let currentUserRole = this.userservice.
    console.log("currentuser", curruser);
    return this.authService.getUserName();
  };
  getOrgValue = (value) => {
    let c = this.state.customer.find((e) => e.customerId === value);
    this.props.form.setFieldValue("organisationId", c?.organisationId);
  };

  componentDidMount() {
    // Promise.all([
    //   // this.assetCustomerService.list({ active: true }),
    //   // this.serverService.list({ active: true }),
    //   this.organisationService.list({ active: true }),
    //   // this.assetLibraryService.list({ active: true }),
    //   //  this.warrantyService.list({ active: true }),
    //   this.service.list({ active: true }),
    // ]).then((response) => {
    //   this.setState((e) => ({
    //     ...this.state,
    //     // server: response[1].data,
    //     // customer: response[0].data,
    //     organisation: response[2].data,
    //     // assetLibrary: response[3].data,
    //     //  warranty: response[4].data,
    //     service: response[4].data,
    //   }));
    // });
    this.loadAppHierarchy();
    this.getUserName();
    super.componentDidMount();
  }

  loadAppHierarchy = () => {
    this.appHierarchyService
      .list()
      .then(({ data }) => {
        this.setState((state) => ({
          ...state,
          parentTreeList: this.appHierarchyService.convertToSelectTree(data),
        }));
      })
      .catch((error) => {
        console.error("Failed to load app hierarchy:", error);
      });
  };

  saveFn(data) {
    if (this.props.id) return this.service.update(data, this.props.id);
    return this.service.add(data);
  }
  patchForm(data) {
    if (this.props.form) {
      this.props.form.setFieldsValue({
        ...data,
        commissionedDate: dayjs(data.commissionedDate),
        warrantyTillDate: dayjs(data.warrantyTillDate),
      });
    }
  }
  render() {
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
          <Row gutter={[20, 20]}>
            <Col sm={12} xs={24}>
              <Form.Item name="assetId" hidden>
                <Input />
              </Form.Item>
              <Form.Item
                name="assetName"
                label="Asset Name"
                rules={[
                  {
                    required: true,
                    message: "Please input the AssetName",
                  },
                ]}
              >
                <Input autoFocus maxLength={200} />
              </Form.Item>

              <Form.Item
                 label="Site"
                name="ahid"
                rules={[{ required: true, message: "Please select customer" }]}
              >
                <TreeSelect
                  showSearch
                  treeDefaultExpandAll={false}
                  style={{ width: "100%" }}
                  allowClear
                  treeData={this.state.parentTreeList}
                />
              </Form.Item>
              {/* <Form.Item
                label="Organisation"
                name="organisationId"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select organisation",
                //   },
                // ]}
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
              </Form.Item> */}

              {/* <Form.Item
                label="Asset Library"
                name="assetLibraryId"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please select asset library",
                //   },
                // ]}
              >
                <Select>
                  {this.state.assetLibrary?.map((e) => (
                    <Option
                      key={`asl${e.assetLibraryId}`}
                      value={e.assetLibraryId}
                    >
                      {e.assetLibraryName}
                    </Option>
                  ))}
                </Select>
              </Form.Item> */}
            </Col>
            <Col sm={12} xs={24}>
              <Form.Item name="active" label="Status" initialValue={true}>
                <Radio.Group>
                  <Radio value={true}>Active</Radio>
                  <Radio value={false}>Inactive</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Description" name="description">
                <TextArea rows={3} maxLength={30} />
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

export default withForm(BasicDetails);
