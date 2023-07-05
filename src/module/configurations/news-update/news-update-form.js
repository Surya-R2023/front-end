import React, { useEffect } from "react";
import NewsUpdateService from "../../../services/news-update-service";

import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  Radio,
  Row,
  Col,
  Divider,
} from "antd";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import { withForm } from "../../../utils/with-form";
import { removeSpaceAndSpecialChar } from "../../../services/validation";
import UserService from "../../../services/user-service";
// import NotificationPopover from "../../news-update-notification";
const { Option } = Select;
class NewsUpdateForm extends PageForm {
  service = new NewsUpdateService();
  userservice = new UserService();
  constructor(props) {
    super(props);
    this.state = {
      isNewNotificationCreatedState: false,
    };
  }
  componentDidMount() {
    this.userservice.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, user: response.data }));
      console.log("users", this.state.user);
    });
  }
  closePopup = (data = false) => {
    this.props.form.resetFields();
    this.props.close(data);
  };

  onSuccess(data) {
    super.onSuccess(data);
    localStorage.setItem("isNewNotificationCreated", true);
    this.setState({ isNewNotificationCreatedState: true });
    this.closePopup(true);
  }

  render() {
    console.log(this.state.isNewNotificationCreatedState);
    return (
      <>
        <Popups
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
          title={this.state?.title}
          open={this.state?.open}
          onCancel={this.closePopup}
        >
          <Divider style={{ marginTop: "0.5rem" }} />
          <Spin spinning={!!this.state.isLoading}>
            {/* <NotificationPopover
              notify={this.state.isNewNotificationCreatedState}
            /> */}
            <Form
              size="small"
              labelAlign="left"
              className="form-horizontal"
              colon={false}
              layout="horizontal"
              form={this.props.form}
              labelCol={{ sm: 8, xs: 24 }}
              wrapperCol={{ sm: 16, xs: 24 }}
              onFinish={this.onFinish}
              disabled={this.props.disabled}
            >
              <Form.Item label="News Update Id" name="updateId" hidden>
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  { required: true, message: "Please enter the Title!" },
                  {
                    pattern: /^[a-zA-Z-,]*[-.'\sÀ-ÿ|]?[-'a-zA-Z0-9]*$/,
                    message: "Role Name can only include letters and numbers.",
                  },
                ]}
              >
                <Input
                  autoFocus
                  maxLength={20}
                  onKeyDown={removeSpaceAndSpecialChar}
                />
              </Form.Item>
              <Form.Item
                label="Message"
                name="message"
                // rules={[
                //   { required: true, message: "Please enter the message!" },
                //   {
                //     pattern: /^[a-zA-Z-,]*[-.'\sÀ-ÿ|]?[-'a-zA-Z0-9]*$/,
                //     message: "Role Name can only include letters and numbers.",
                //   },
                // ]}
              >
                <Input
                  autoFocus
                  maxLength={200}
                  // onKeyDown={removeSpaceAndSpecialChar}
                />
              </Form.Item>
              <Form.Item
                label="Created By"
                name="userId"
                rules={[{ required: true, message: "Please select User!" }]}
              >
                <Select showSearch>
                  {this.state.user?.map((e) => (
                    <Option key={`user${e.userId}`} value={e.userId}>
                      {e.userName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="active" label="Status" initialValue={true}>
                <Radio.Group>
                  <Radio value={true}>Active</Radio>
                  <Radio value={false}>In-active</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Spin>
        </Popups>
        {/* <NotificationPopover
          notify={this.state.isNewNotificationCreatedState}
        /> */}
      </>
    );
  }
}

export default withForm(NewsUpdateForm);
