import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table } from "antd";
import ParameterForm from "./parameters-form";
import { Col, Button, Row, Space } from "antd";
import AssetLibraryParametersService from "../../../services/asset-library-parameters-service";
import { withRouter } from "../../../utils/with-router";

class Parameters extends PageList {
  service = new AssetLibraryParametersService();
  title = "Parameter";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      align: "right",
      width: 0,
    },
    {
      dataIndex: "parameterKey",
      key: "parameterKey",
      title: "Parameter Name",
      align: "left",
      sorter: (a, b) => a.parameterKey.localeCompare(b.parameterKey),
    },
    {
      dataIndex: "displayName",
      key: "displayName",
      title: "Display Name",
      align: "left",
      sorter: (a, b) => a.displayName.localeCompare(b.displayName),
    },
    {
      dataIndex: "unit",
      key: "unit",
      title: "Unit",
      align: "left",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
    },
    {
      dataIndex: "dataType",
      key: "dataType",
      title: "Data Type",
      align: "left",
      sorter: (a, b) => a.dataType.localeCompare(b.dataType),
    },
    {
      dataIndex: "orderNo",
      key: "orderNo",
      title: "Order No",
      align: "left",
      sorter: (a, b) => a.orderNo ?? 0 - b.orderNo ?? 0,
      defaultSortOrder: "ascend",
    },
    // {
    //   dataIndex: "defaultValue",
    //   key: "defaultValue",
    //   title: "Default Value",
    //   align: "left",
    // },
    {
      dataIndex: "parameterId",
      key: "parameterId",
      title: "Action",
      width: 160,
      align: "center",
      render: (value, record, index) => {
        return (
          <>
            <ViewButton onClick={() => this.view(value)} />
            <EditButton onClick={() => this.edit(value)} />
            <DeleteButton onClick={() => this.delete(value)} />
          </>
        );
      },
    },
  ];
  next = () => {
    this.props.next();
  };
  back = () => {
    this.props.prev();
  };
  list() {
    super.list({ assetLibraryId: this.props.assetLibraryId });
  }

  render() {
    return (
      <div>
        <Row justify="end">
          <AddButton onClick={() => this.add()} />
        </Row>
        <br></br>
        <Table
          rowKey="parameterId"
          loading={this.state.isLoading}
          dataSource={this.state.rows}
          columns={this.columns}
          size="middle"
          pagination={{
            showSizeChanger: true,

            showQuickJumper: true,

            size: "default",
          }}
        />

        <ParameterForm
          assetLibraryId={this.props.assetLibraryId}
          {...this.state.popup}
          close={this.onClose}
        />
        <br />
        <Row justify="space-between">
          <Col>
            <Button onClick={this.back}>Back</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={this.next}>
              {" "}
              Next
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Parameters);
