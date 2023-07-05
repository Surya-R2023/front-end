import React, { useEffect, Component } from "react";
import CameraService from "../../../services/camera-service";
import Page from "../../../utils/page/page";
import { publicUrl } from "../../../helpers/url";
import { withRouter } from "../../../utils/with-router";
import Iframe from "react-iframe";

import { Form, Select, Spin, Row, Card } from "antd";
import PageForm from "../../../utils/page/page-form";
import { withForm } from "../../../utils/with-form";
import PageList from "../../../utils/page/page-list";
import Title from "antd/lib/skeleton/Title";

const { Option } = Select;

class CameraFrame extends PageList {
  state = { isLoading: false };
  service = new CameraService();

  onSuccess(data) {
    super.onSuccess(data);
  }

  componentDidMount() {
    this.service.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, camera: response.data }));
    });
  }

  render() {
    return (
      <Row>
        <Card  title= "Live-Camera">
          <Form
            size="small"
            labelAlign="left"
            className="form-horizontal"
            colon={false}
            layout="horizontal"
            form={this.props.form}
            labelCol={{ sm: 6, lg: 6, xs: 24 }}
            wrapperCol={{ sm: 6, lg: 6, xs: 24 }}
            onFinish={this.onFinish}
            disabled={this.props.disabled}
          >
            <Iframe
              url="https://droid-iframe.kandula.ai/?orgRn=b7dca8e2-2911-4469-9652-53deda4a6a20&droidRn=3ed4d349-64d4-4048-8a4c-3d8cab06641c&taskRn=51c38232-876f-11ed-9434-cacf2c35c629&cameraRn=50cb9ab8-876f-11ed-9a68-cacf2c35c629&userRn=9d0e3d78-b832-4d7a-b20a-fcc237dec2a1/"
              width="1000px"
              height="500px"
            />
          </Form>
        </Card>
      </Row>
    );
  }
}
export default withRouter(withForm(CameraFrame));
