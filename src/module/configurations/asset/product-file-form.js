import React, { useEffect } from "react";
import ProductFileService from "../../../services/spare-parts-services/product-file-service";
import { InboxOutlined } from "@ant-design/icons";
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
} from "antd";
import { Upload, Modal } from "antd";
import PageForm from "../../../utils/page/page-form";
import Popups from "../../../utils/page/popups";
import { withForm } from "../../../utils/with-form";
import { CustomerServiceFilled, UploadOutlined } from "@ant-design/icons";
import { convertToFormData } from "../../../services/utils";
import { remoteAsset } from "../../../helpers/url";
import ProductService from "../../../services/spare-parts-services/product-service";
const { Option } = Select;
class ProductFileForm extends PageForm {
  service = new ProductFileService();
  productService = new ProductService();
  // state = { fileList: [], file: null, isLoading: false };

  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
  };
  componentDidMount() {
    // Promise.all([this.productService.list({ active: true })]).then(
    //   (response) => {
    //     this.setState((e) => ({
    //       ...this.state,
    //       product: response[0].data,
    //     }));
    //   }
    // );
    // super.componentDidMount();
  }
  closePopup = (data = false) => {
    this.props.form.resetFields();
    this.props.close(data);
  };
  beforeUpload = (file, fileList) => {
    this.setState((state) => ({ ...state, fileList: fileList }));
    return false;
  };

  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(true);
  }

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
    if (data.fileName) {
      let url = data.fileName;
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

  onChange = ({ fileList: newFileList }) => {
    this.setState((state) => ({ ...state, fileList: newFileList }));
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Button type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
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
        <Spin spinning={!!this.state.isLoading}>
          <Form
            initialValues={{ assetId: this.props.assetId }}
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
            <Form.Item name="productFileId" hidden>
              <Input />
            </Form.Item>
            <Form.Item label="Asset Id" name="assetId" hidden>
              <Input />
            </Form.Item>
            {/* <Form.Item
              label="File Name"
              name="fileName"
              rules={[
                { required: true, message: "Please enter your File name!" },
              ]}
            >
              <Input autoFocus maxLength={20} />
            </Form.Item> */}
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: "Please enter your Product!" },
              ]}
            >
              <Input autoFocus maxLength={20} />
            </Form.Item>
            <Form.Item label="File">
              <Upload.Dragger
                action={null}
                maxCount={1}
                beforeUpload={this.beforeUpload}
                listType="picture"
                fileList={this.state.fileList}
                onChange={this.onChange}
                onPreview={this.onPreview}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Upload.Dragger>
            </Form.Item>
            {/* <Form.Item label="Product Name" name="productName">
              <Select>
                {this.state?.product?.map((e) => (
                  <Option key={`org${e.productId}`} value={e.productKey}>
                    {e.productName}
                  </Option>
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item name="view" label="View" initialValue={true}>
              <Radio.Group>
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="download" label="Download" initialValue={true}>
              <Radio.Group>
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Spin>
      </Popups>
    );
  }
}

export default withForm(ProductFileForm);
