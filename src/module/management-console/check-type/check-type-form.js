import React, { useEffect, createRef } from "react";
import { Button, Form, Input, Select, Radio, Spin, Row, Col, Tour } from "antd";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import CheckTypeService from "../../../services/check-type-service";
import { withForm } from "../../../utils/with-form";
import { checkTypePageId } from "../../../helpers/page-ids";

const { Option } = Select;
var openSet;
class CheckTypeForm extends PageForm {
  pageId = checkTypePageId;
  // state = {
  //   openTour: false,
  //   steps: [
  //     {
  //       title: "Check Type",
  //       description: "Enter The CheckType Name",
  //       placement: "left",
  //       target: () => this.ref1.current,
  //       mask:true,
  //     },
  //     {
  //       title: "Description",
  //       description: "Enter The Description",
  //       placement: "left",
  //       target: () => this.ref2.current,
  //     },
  //     {
  //       title: "Status",
  //       description: "You Can Set The CheckType As Active Or Inactive ",
  //       placement: "left",
  //       target: () => this.ref3.current,
  //     },
  //   ],
  // };
  service = new CheckTypeService();
  closePopup = (v = false) => {
    this.props.form.resetFields();
    this.props.close(v);
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(true);
  }
  // handleClose = () => {
  //   this.setState((state) => ({ ...state, openTour: false }))
  // }
  constructor(props) {
    super(props);
    // this.ref1 = React.createRef()
    // this.ref2 = React.createRef()
    // this.ref3 = React.createRef()
  }
  patchForm(data) {
    if (this.props.form) {
      console.log("data", data);
      this.props.form.setFieldsValue({
        ...data,
        checkTypeName: data.checkTypeName,
      });
    }
  }
  render() {
    return (
      <>
        <Popups
          title={this.state?.title}
          open={this.state?.open}
          onCancel={this.closePopup}
          footer={[
            <Row justify="space-between">
              <Col>
                {(this.props.mode == "Add" || this.props.mode == "Update") && (
                  <Button key="close" onClick={this.closePopup}>
                    Cancel
                  </Button>
                )}
              </Col>
              <Col>
                {(this.props.mode == "Add" || this.props.mode == "Update") && (
                  <Button
                    key="submit"
                    type="primary"
                    onClick={this.props.form.submit}
                    htmlType="submit"
                  >
                    {this.props.mode == "Add" ? "Save" : "Update"}
                  </Button>
                )}
              </Col>
            </Row>,
          ]}
        >
          <Spin spinning={!!this.state.isLoading}>
            <Form
              size="small"
              className="form-horizontal"
              layout="horizontal"
              form={this.props.form}
              labelAlign="left"
              colon={false}
              labelCol={{ sm: 8, xs: 24 }}
              wrapperCol={{ sm: 16, xs: 24 }}
              disabled={this.props.disabled}
              onFinish={this.onFinish}
            >
              <Form.Item name="checkTypeId" hidden>
                <Input />
              </Form.Item>

              <Form.Item
                label="Check Type"
                name="checkTypeName"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Check Type Name!",
                  },
                ]}
              >
                {/* <div ref={this.ref1}> */}
                <Input />
                {/* </div> */}
              </Form.Item>
              <Form.Item label="Description" name="description">
                {/* <div ref={this.ref2}> */}
                <Input.TextArea maxLength={200} />
                {/* </div> */}
              </Form.Item>
              <Form.Item name="active" label="Status" initialValue={true}>
                {/* <div ref={this.ref3}> */}
                <Radio.Group>
                  <Radio value={true}>Active</Radio>
                  <Radio value={false}>Inactive</Radio>
                </Radio.Group>
                {/* </div> */}
              </Form.Item>
            </Form>
          </Spin>
          <Tour
            steps={this.state.steps}
            isOpen={this.state.openTour}
            onRequestClose={this.handleClose}
            // mask={true}
          />
        </Popups>
      </>
    );
  }
}

export default withForm(CheckTypeForm);
