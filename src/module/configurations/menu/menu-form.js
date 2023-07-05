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
  TreeSelect,
} from "antd";
import React from "react";
import MenuService from "../../../services/menu-service";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import { withForm } from "../../../utils/with-form";

class MenuForm extends PageForm {
  service = new MenuService();
  closePopup = (status = false) => {
    this.props.form.resetFields();
    this.props.close(status);
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(true);
  }
  children(list, parent) {
    let filtered = list.filter((e) => e.parentId == parent);
    return filtered.map((e) => {
      let children = this.children(list, e.menuId);
      if (children.length > 0) {
        return { title: e.menuName, value: e.menuId, children: children };
      } else return { title: e.menuName, value: e.menuId };
    });
  }
  handleData(list) {
    let l = list.sort((a, b) => a.orderNumber - b.orderNumber);
    return this.children(l, null);
  }
  componentDidMount() {
    this.service.list({ active: true }).then((response) => {
      this.setState((state) => ({
        ...state,
        menu: response.data,
        treeData: this.handleData(response.data),
      }));
    });
    super.componentDidMount();
  }
  componentWillUnmount() {
    this.props.form.resetFields();
  }
  saveFn(data) {
    if (this.props.mode == "Duplicate") {
      let obj = { ...data };
      delete obj.menuId;
      return this.service.add(obj);
    } else return super.saveFn(data);
  }
  render() {
    return (
      <Popups
        footer={[
          <Row justify="space-between">
            <Col>
              <Button key="close" onClick={this.closePopup}>
                Cancel
              </Button>
            </Col>
            <Col>
              {this.props.mode != "View" && (
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
        <Spin spinning={!!this.state.isLoading}>
          <Form
             size="small"
            disabled={this.props.disabled}
            labelAlign="left"
            className="form-horizontal"
            colon={false}
            layout="horizontal"
            form={this.props.form}
            labelCol={{ sm: 8, xs: 24 }}
            wrapperCol={{ sm: 16, xs: 24 }}
            onFinish={this.onFinish}
          >
            <Form.Item hidden name="menuId">
              <Input />
            </Form.Item>
            <Form.Item
              label="Menu Name"
              name="menuName"
              rules={[
                {
                  required: true,
                  message: "Please input menu name!",
                },
              ]}
            >
              <Input autoFocus/>
            </Form.Item>
            <Form.Item label="Icon" name="icon">
              <Input />
            </Form.Item>
            <Form.Item
              label="Order No"
              name="orderNumber"
              rules={[
                {
                  required: true,
                  message: "Please input order no.",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item label="Path" name="path">
              <Input />
            </Form.Item>
            <Form.Item label="Parent" name="parentId">
              <TreeSelect
                style={{
                  width: "100%",
                }}
                treeData={this.state.treeData ?? []}
                placeholder="Please select"
                treeDefaultExpandAll={false}
                showSearch
                allowClear
              />

              {/* <Select showSearch allowClear>
                {this.state.menu?.map((e) => (
                  <Option key={`menu${e.menuId}`} value={e.menuId}>
                    {e.menuName}
                  </Option>
                ))}
              </Select> */}
            </Form.Item>
            <Form.Item name="status" label="Status" initialValue={true}>
              <Radio.Group>
                <Radio value={true}>Active</Radio>
                <Radio value={false}>In-active</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Spin>
      </Popups>
    );
  }
}

export default withForm(MenuForm);
