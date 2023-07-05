import React, { useEffect, useState } from "react";

import {
  Button,
  Form,
  Input,
  Select,
  Spin,
  Radio,
  Row,
  Col,
  InputNumber,
  TreeSelect,
} from "antd";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import { withForm } from "../../../utils/with-form";
import OrganisationHierarchyService from "../../../services/organisation-hierarchy-service";
const { Option } = Select;

class OrganizationHierarchyForm extends PageForm {
  service = new OrganisationHierarchyService();
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
      let children = this.children(list, e.organisationId);
      if (children.length > 0) {
        return {
          title: e.organisationName,
          value: e.organisationId,
          children: children,
        };
      } else return { title: e.organisationName, value: e.organisationId };
    });
  }
  handleData(list) {
    return this.children(list, null);
  }
  componentDidMount() {
    this.service.list({ active: true }).then((response) => {
      this.setState((state) => ({
        ...state,
        rows: response.data,
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
            <Form.Item  hidden   label="OrganisationId" name="organisationId">
              <Input />
            </Form.Item>
            <Form.Item
              label="Name"
              name="organisationName"
              rules={[
                {
                  required: true,
                  message: "Please input name!",
                },
              ]}
            >
              <Input autoFocus />
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
            {/* <Form.Item
              label="level"
              name="level"
              rules={[
                {
                  required: true,
                  message: "Please input name!",
                },
              ]}
            >
              <InputNumber />
            </Form.Item> */}
            <Form.Item name="active" label="Status" initialValue={true}>
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

export default withForm(OrganizationHierarchyForm);
