import {
  AppstoreOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Radio, Col, Row, Select, Spin, message, Modal } from "antd";
import Page from "../../../utils/page/page";
import PageList from "../../../utils/page/page-list";
import { withForm } from "../../../utils/with-form";
import { withRouter } from "../../../utils/with-router";
import { FaTruckMoving } from "react-icons/fa";
import {
  Badge,
  Card,
  Descriptions,
  Image,
  Avatar,
  List,
  Table,
  Button,
  Space,
} from "antd";
import React from "react";

import { Component, useEffect, useState } from "react";
import { remoteAsset } from "../../../helpers/url";
import { Divider, Typography } from "antd";
import moment from "moment";
import EnquireService from "../../../services/spare-parts-services/enquire-service";
const { Text, Title } = Typography;
const { Meta } = Card;
const { confirm } = Modal;
const { Option } = Select;
class SparePartsDashboard extends Component {
  state = {};
  service = new EnquireService();
  title = "";
  dispatch = (id) => {
    var service = this.service;
    confirm({
      title: "Confirm !",
      content: "Click ok to dispatch",
      onOk: () => {
        this.setState((state) => ({ ...state, isLoading: true }));
        service
          .dispatch(id)
          .then(({ data }) => {
            if (data.success) {
              message.success(data.message);
              this.list();
            } else message.error(data.message);
          })
          .catch((error) => {
            message.error(error.message);
          })
          .finally(() => {
            this.setState((state) => ({ ...state, isLoading: false }));
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  list() {
    this.setState((state) => ({ ...state, isLoading: true }));
    this.service
      .pending()
      .then((response) => {
        this.setState((state) => ({
          ...state,
          data: response.data.map((e) => ({
            imageUrl: e.product?.imageUrl,
            productId: e.productId,
            date: e.date,
            productName: e.product?.productName,
            resolutionWorkOrderId: e.resolutionWorkOrderId,
            rwoNumber: e.pmResolutionWorkOrder?.rwoNumber,
            ca: e.pmResolutionWorkOrder?.ca,
            status: e.pmResolutionWorkOrder?.checkListName,
            inquireId: e.inquireId,
          })),
        }));
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  }
  componentDidMount() {
    this.list();
  }
  render() {
    return (
      <Page title={this.title}>
        {/* <Button size="small" type="primary" icon={<FaTruckMoving />}>
          Dispatch
        </Button> */}
        <Spares
          data={this.state.data}
          dispatch={this.dispatch}
          loading={this.state.isLoading}
        />

        {/* <Spin spinning={this.state.isLoading}>
          <Row gutter={[12, 8]}>
            {this.state.data?.map((e) => (
              <Col sm={12} md={8} lg={12} xs={24}>
                <Card size="small" hoverable>
                  <Row gutter={[12, 24]}>
                    <Col>
                      <Row>
                        <Avatar
                          shape="square"
                          src={this.state.spare?.imageUrl}
                          //src = "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                          style={{
                            width: "170px",
                            height: "150px",
                            marginTop: "10px",
                          }}
                        />
                      </Row>
                      <Row>
                        <Button
                          style={{ marginTop: "10px" }}
                          type="primary"
                          block
                        >
                          Dispatch
                        </Button>
                      </Row>
                    </Col>
                    <Col sm={12} md={8} lg={15} xs={24}>
                      <List
                        size="small"
                        dataSource={[
                          {
                            label: "Device",
                            value: e.pmResolutionWorkOrder.asset.assetName,
                          },
                          {
                            label: "Site",
                            value:
                              e.pmResolutionWorkOrder.asset.customer
                                .customerName,
                          },
                          {
                            label: "Work Order",
                            value: e.pmResolutionWorkOrder.rwoNumber,
                          },
                          {
                            label: "Status",
                            value: e.status,
                          },
                          {
                            label: "Date",
                            value: moment(e.date).format("D-M-yyyy LTS"),
                          },
                        ]}
                        renderItem={(item) => (
                          <List.Item key={item.label} extra={item.value}>
                            <List.Item.Meta
                              avatar={item.avatar}
                              title={item.label}
                            />
                          </List.Item>
                        )}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Spin> */}
      </Page>
    );
  }
}

function Spares(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.data);
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
      dataIndex: "date",
      key: "date",
      title: "Date",
      width: "100px",
      render: (value) => {
        return value ? moment(value).format("DD-MM-YYYY") : "";
      },
    },
    {
      dataIndex: "rwoNumber",
      key: "rwoNumber",
      title: "R.No",
      width: "100px",
      sorter: (a, b) => a.rwoNumber?.localeCompare(b.rwoNumber),
    },
    {
      dataIndex: "productName",
      key: "productName",
      title: "Product Name",
      sorter: (a, b) => a.productName?.localeCompare(b.productName),
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status / Alarm",
    },
    {
      dataIndex: "ca",
      key: "ca",
      title: "Corrective Action",
    },
    {
      dataIndex: "inquireId",
      key: "inquireId",
      title: "",
      align: "center",
      width: "100px",
      render: (value) => {
        return (
          <Space>
            <a
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
              onClick={() => props.dispatch(value)}
            >
              <FaTruckMoving /> Dispatch
            </a>
          </Space>
        );
      },
    },
  ];
  return (
    <Table
      size="small"
      loading={props?.loading ?? false}
      // rowSelection={{
      //   type: "checkbox",
      //   onChange: (selectedRowKeys, selectedRows) => {
      //     props.setProductIds(selectedRowKeys);
      //   },
      // }}
      rowKey="inquireId"
      columns={columns}
      dataSource={data}
      bordered
    />
  );
}

export default withRouter(withForm(SparePartsDashboard));
