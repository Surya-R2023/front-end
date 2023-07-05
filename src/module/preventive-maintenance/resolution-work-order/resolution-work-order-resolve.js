import PageForm from "../../../utils/page/page-form";
import {
  Button,
  Row,
  Col,
  Form,
  Descriptions,
  Input,
  Spin,
  Select,
  Image,
  Typography,
  Card,
  AutoComplete,
  message,
  Avatar,
  Table,
} from "antd";
import React from "react";
import { publicUrl } from "../../../helpers/url";
import WorkorderResolutionService from "../../../services/preventive-maintenance-services/workorder-resolution-service";
import WorkOrderResolveService from "../../../services/preventive-maintenance-services/workorder-resolve-service";
import moment from "moment";
import { withRouter } from "../../../utils/with-router";
import { withForm } from "../../../utils/with-form";
import CorrectiveActionSuggestionService from "../../../services/spare-parts-services/corrective-action-suggestion-service";
import EnquireService from "../../../services/spare-parts-services/enquire-service";
import { fallback, remoteAsset } from "../../../helpers/url";
import { useState, useEffect } from "react";
const { TextArea } = Input;
function SpareCard() {
  return {
    /* <Row gutter={[10, 10]}>
  {this.state.productdetails?.map((e) => (
    <Col sm={24}>
      <Card
        hoverable
        cover={
          <Image
            src={remoteAsset(e.product?.imageUrl)}
            fallback={fallback}
          />
        }
      >
        <Card.Meta
          title={e.product?.productName}
          description={e.product?.description}
        >
          <Button
            style={{ marginTop: "10px" }}
            type="primary"
            disabled={this.state.presscount}
            onClick={() => this.sendEnquiry(e.product?.productId)}
          >
            Enquire Now
          </Button>
        </Card.Meta>
      </Card>
    </Col>
  ))}
</Row> */
  };
}
class ResolutionWorkOrderResolve extends PageForm {
  service = new WorkorderResolutionService();
  resolveservice = new WorkOrderResolveService();
  suggestionconfigurationservice = new CorrectiveActionSuggestionService();
  enquireservice = new EnquireService();

  triggerInitialChange = () => {
    this.suggestionconfigurationservice
      .list({ checkName: this.state.initialValues?.description })
      .then((response) => {
        this.setState((state) => ({
          ...state,
          correctiveActionSuggestion: response.data,
        }));
      });

    if (this.props.form.getFieldValue("ca")) {
      this.getRecommendedSpare(this.props.form.getFieldValue("ca"));
    }
  };
  getRecommendedSpare = (key) => {
    this.suggestionconfigurationservice
      .list({ checkName: this.state.initialValues?.description, capa: key })
      .then((response) => {
        this.setState((state) => ({
          ...state,
          productdetails: response.data,
        }));
      });
  };

  handleSearch = (value) => {
    let filter = this.state.correctiveActionSuggestion
      ?.filter((e) =>
        e.correctiveAction?.toLowerCase().includes(value?.toLowerCase())
      )
      .map((e) => e.correctiveAction);

    this.setState((state) => ({
      ...state,
      option: Array.from(new Set(filter))?.map((e) => ({ value: e })),
    }));
  };

  saveFn(data) {
    return this.resolveservice.add({
      ...data,
      resolutionWorkOrderId: this.props.id,
      productIds: this.state.productIds ?? [],
    });
  }
  onSuccess(data) {
    super.onSuccess(data);
    this.props.next();
  }
  setProductIds = (ids) => {
    this.setState((state) => ({ ...state, productIds: ids }));
  };

  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Descriptions
              column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
              // bordered
              // layout="vertical"

              labelStyle={{ fontWeight: "bold" }}
            >
              <Descriptions.Item key="l0" label="R.No">
                {this.state.initialValues?.rwoNumber}
              </Descriptions.Item>
              <Descriptions.Item key="l1" label="Description">
                {this.state.initialValues?.description}
              </Descriptions.Item>
              <Descriptions.Item key="l2" label="Asset Name">
                {this.state.initialValues?.asset?.assetName}
              </Descriptions.Item>
              {/* <Descriptions.Item key="l5" label="Initiated By">
                {this.state.initialValues?.initiatedBy?.userName}
              </Descriptions.Item> */}
              <Descriptions.Item key="l3" label="Scheduled Date">
                {moment(this.state.initialValues?.startDate).format(
                  "DD-MM-YYYY"
                )}
              </Descriptions.Item>
              <Descriptions.Item key="l8" label="Due Date">
                {moment(this.state.initialValues?.dueDate).format("DD-MM-YYYY")}
              </Descriptions.Item>

              <Descriptions.Item key="l6" label="Assigned To">
                {this.state.initialValues?.assignedTo?.userName}
              </Descriptions.Item>
              <Descriptions.Item key="l7" label="Priorty">
                {this.state.initialValues?.priority}
              </Descriptions.Item>
              <Descriptions.Item key="l4" label="Status">
                {this.service.status(this.state.initialValues?.status)}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col span={24}>
            <div className="details">
              <Form
                layout="vertical"
                labelCol={{ sm: 24, xs: 24 }}
                wrapperCol={{ sm: 24, xs: 24 }}
                onFinish={this.onFinish}
                form={this.props.form}
              >
                <Row gutter={[10, 10]}>
                  <Col span={8}>
                    <Form.Item
                      name="rca"
                      label="Root Cause Analysis"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the Root Cause!",
                        },
                      ]}
                    >
                      <Input.TextArea rows={3} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="pa"
                      label="Preventive Action"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the Preventive Action!",
                        },
                      ]}
                    >
                      <Input.TextArea rows={3} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="ca"
                      label="Corrective Action"
                      rules={[
                        {
                          required: true,
                          message: "Please select the Corrective Action!",
                        },
                      ]}
                    >
                      {/* <AutoComplete
                        options={this.state.option}
                        onSelect={(v) => this.getRecommendedSpare(v)}
                        onSearch={this.handleSearch}
                      > */}
                      <TextArea className="custom" rows={3} />
                      {/* </AutoComplete> */}
                    </Form.Item>
                  </Col>
                  {/* <Col span={24}>
                    <Typography.Title level={5}>
                      Recommended Spares
                    </Typography.Title>
                    <Spare
                      data={this.state.productdetails ?? []}
                      setProductIds={this.setProductIds}
                    />
                  </Col> */}
                </Row>
                <br></br>
                <Row justify="space-between">
                  <Col>
                    <Button onClick={this.props.prev}>Back</Button>
                  </Col>
                  <Col>
                    <Button htmlType="submit" type="primary">
                      Send For Approval
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Spin>
    );
  }
}

function Spare(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.data?.map((e) => e.product));
  }, [props.data]);
  const columns = [
    {
      dataIndex: "imageUrl",
      key: "imageUrl",
      title: "Image",
      width: "100px",
      align: "center",
      render: (value) => {
        return <Avatar src={remoteAsset(value)} shape="square" />;
      },
    },

    {
      dataIndex: "productName",
      key: "productName",
      title: "Product Name",
      align: "left",
      sorter: (a, b) => a.productName.localeCompare(b.productName),
    },
    {
      dataIndex: "description",
      key: "description",
      title: "Description",
      align: "left",
    },
  ];
  return (
    <Table
      size="small"
      rowSelection={{
        type: "checkbox",
        onChange: (selectedRowKeys, selectedRows) => {
          props.setProductIds(selectedRowKeys);
        },
      }}
      rowKey="productId"
      columns={columns}
      dataSource={data}
    />
  );
}

export default withForm(ResolutionWorkOrderResolve);
