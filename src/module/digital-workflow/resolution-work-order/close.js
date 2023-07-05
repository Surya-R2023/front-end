import PageList from "../../../utils/page/page-list";
import PageForm from "../../../utils/page/page-form";
import Page from "../../../utils/page/page";
import {
  Button,
  Row,
  Col,
  Typography,
  Descriptions,
  Spin,
  Form,
  Select,
} from "antd";
import React from "react";
import WorkOrderResolutionService from "../../../services/workorder-resolution-service";
import moment from "moment";
const onFinish = (values) => {
  console.log(values);
};
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

class Close extends PageForm {
  service = new WorkOrderResolutionService();
  // saveFn(data) {
  //   return this.service.add(data);
  // }
  render() {
    return (
      <Row gutter={[10, 10]}>
        <Col span={24}></Col>
      </Row>
    );
  }
  /*cancel = () => {
    this.props.prev();
  };
  close = () => {
    this.props.prev();
  };*/
  onRetrieve(id) {
    this.setState({ ...this.state, isLoading: true });

    Promise.all([this.service.retrieve(id)]).then((response) => {
      this.setState({
        ...this.state,
        data: response[0].data,
        isLoading: false,
      });
    });
  }

  componentDidMount() {
    super.componentDidMount();
    this.onRetrieve(825);
  }
}

export default Close;
