import React, { useEffect, Component } from "react";
import Floorservice from "../../../services/floor-service";
import PlantService from "../../../services/plant-service";
import Page from "../../../utils/page/page";
import { publicUrl } from "../../../helpers/url";
import { convertToFormData } from "../../../services/utils";
import { withRouter } from "../../../utils/with-router";
import {
  Button,
  Form,
  Input,
  Select,
  Spin,
  Radio,
  Row,
  Col,
  Card,
  Upload,
  Image,
  Space,
} from "antd";
import ImageMapper from "react-image-mapper";
import { withForm } from "../../../utils/with-form";
import { UploadOutlined } from "@ant-design/icons";
import { remoteAsset } from "../../../helpers/url";
import PageList from "../../../utils/page/page-list";

var image;
const { Option } = Select;

class FloorForm extends PageList {
  state = { image, fileList: [], file: null, isLoading: false };
  service = new Floorservice();
  plantservice = new PlantService();

  closePopup = (data = false) => {
    this.props.form.resetFields();
    this.props.close(data);
  };

  handlechange = (value) => {
    this.setState({ image: value });
  };

  beforeUpload = (file, fileList) => {
    return false;
  };

  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(true);
  }

  saveFn(data) {
    let formData = convertToFormData(data);
    console.log(this.state);
    if (this.state.fileList?.length > 0) {
      console.log(this.state.fileList);
      if (this.state.fileList[0].originFileObj) {
        formData.append("image", this.state.fileList[0]?.originFileObj);
      }
    }

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
        activeKey: "1",
      }));
    });
  }

  onChange = ({ fileList: newFileList }) => {
    this.setState((state) => ({ ...state, fileList: newFileList }));
  };

  componentWillUnmount() {
    this.props.form.resetFields();
  }

  render() {
    return (
      <Row>
       
          <Card
            style={{ width: "100%" }}
            title={this.state?.title}
            open={this.state?.open}
            onCancel={this.closePopup}
          >
            <Spin spinning={!!this.state.isLoading}>
              <Form
                size="small"
                labelAlign="left"
                className="form-horizontal"
                colon={false}
                layout="horizontal"
                form={this.props.form}
                labelCol={{ sm: 6, lg: 4, xs: 24 }}
                wrapperCol={{ sm: 6, lg: 6, xs: 24 }}
                onFinish={this.onFinish}
                disabled={this.props.disabled}
              >
                <Form.Item
                  hidden
                  label="Floor Id"
                  name="floorId"
                >
                <Input/>
                </Form.Item>


                <Form.Item
                  label="Building"
                  name="customerName"
                  rules={[{ required: true }]}
                >
                  <Select onChange={this.handlechange}>
                    {this.state.customer?.map((e) => (
                      <Option
                        key={`customer${e.customerId}`}
                        value={e.imageUrl}
                      >
                        {e.customerName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>


                <Row justify="20%">

                  <Col>
                    <Button
                      style={{ size: "large",marginLeft:"800px" }}
                      key="submit"
                      type="primary"
                      onClick={this.props.form.submit}
                      htmlType="submit"
                    >
                      {this.props.mode == "Add" ? "Save" : "Update"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Spin>
            <br></br>
            <ImageMapper
            src={remoteAsset(this.state.image)}
            width={940}
            imgWidth={940}
          />
       
          </Card>

          {/* <ImageMapper
            src={remoteAsset(this.state.image)}
            width={940}
            imgWidth={940}
          /> */}
       
      </Row>
    );
  }
}

export default withRouter(withForm(FloorForm));
