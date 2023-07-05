import React, { useEffect, useState } from "react";
import PageForm from "../../../utils/page/page-form";
import {
  Col,
  Button,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Space,
  Radio,
  Upload,
} from "antd";
import FloorService from "../../../services/floor-service";
import { InboxOutlined } from "@ant-design/icons";
import { remoteAsset } from "../../../helpers/url";
import PlantService from "../../../services/plant-service";
import { convertToFormData } from "../../../services/utils";
const { Option } = Select;

class AddFloor extends PageForm {
  service = new FloorService();
  state = { fileList: [], file: null, isLoading: false };
  plantservice = new PlantService();

  next = () => {
    this.props.next();
  };

  back = () => {
    this.props.prev();
  };

  beforeUpload = (file, fileList) => {
    this.setState((state) => ({ ...state, fileList: fileList }));
    return false;
  };

  saveFn(data) {
    let formData = convertToFormData(data);
    if (this.state.fileList?.length > 0) {
      console.log(this.state.fileList);
      if (this.state.fileList[0].originFileObj) {
        formData.append("image", this.state.fileList[0]?.originFileObj);
      }
    }
    console.log(formData);
    return super.saveFn(formData);
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

  componentDidMount() {
    super.componentDidMount();
    Promise.all([this.plantservice.list({ active: true })]).then((response) => {
      this.setState((state) => ({
        ...state,
        customer: response[0].data,
        floor: response[0].data,
        imageUrl: response[0].data,
        activeKey: "1",
      }));
    });
  }

  onChange = ({ fileList: newFileList }) => {
    console.log(newFileList);
    this.setState((state) => ({ ...state, fileList: newFileList }));
  };

  onSuccess(data) {
    super.onSuccess(data);
  }

  render() {
    return (
      <Form
        size="small"
        labelAlign="left"
        className="form-horizontal"
        colon={false}
        layout="horizontal"
        labelCol={{ sm: 8, xs: 24 }}
        wrapperCol={{ sm: 16, xs: 24 }}
       
        disabled={this.props.disabled}
      >
        <Form.Item hidden label="Floor Id" name="floorId">
          <Input />
        </Form.Item>

        <Form.Item
          label="Floor Name"
          name="floorName"
          rules={[{ required: true, message: "Please enter your FloorName !" }]}
        >
          <Input autoFocus />
        </Form.Item>

        {/* <Form.Item
          label="Building"
          name="customerId"
          rules={[{ required: true, message: "Please enter your Building !" }]}
        >
          <Select>
            {this.state.customer?.map((e) => (
              <Option key={`customer${e.customerId}`} value={e.customerId}>
                {e.customerName}
              </Option>
            ))}
          </Select>
        </Form.Item> */}

        <Form.Item label="Image">
          <Upload.Dragger
            action={null}
            maxCount={1}
            beforeUpload={this.beforeUpload}
            listType="picture"
            fileList={this.state.fileList}
            // onChange={this.onChange}
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
        </Form.Item>

        <Form.Item name="active" label="Status" initialValue={true}>
          <Radio.Group>
            <Radio value={true}>Active</Radio>
            <Radio value={false}>In-active</Radio>
          </Radio.Group>
        </Form.Item>
        <Space>
          <Form.Item>
            <Button style={{marginLeft:"800px"}} type="primary" onClick={this.next}>
              Next
            </Button>
          </Form.Item>
        </Space>
      </Form>
    );
  }
}

export default AddFloor;
