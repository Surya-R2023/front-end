import ProductService from "../../../services/spare-parts-services/product-service";
import PageList from "../../../utils/page/page-list";
import { remoteAsset } from "../../../helpers/url";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, Avatar, Button, Upload, message } from "antd";
import { Link } from "react-router-dom";
import SparePartForm from "./spare-part-form";

class SparePart extends PageList {
  service = new ProductService();

  title = "Product";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 80,
      align: "left",
    },

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
      dataIndex: "status",
      key: "status",
      title: "Status",
      render: (value) => {
        return !!value ? "Active" : "In-active";
      },
    },
    {
      dataIndex: "productId",
      key: "productId",
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

  render() {
    return (
      <Page
        title={this.title}
        action={
          <>
            <AddButton onClick={() => this.add()} />
          </>
        }
      >
        <Table
          rowKey="productId"
          pagination={{
            showSizeChanger: true,

            showQuickJumper: true,

            size: "default",
          }}
          scroll={{ x: 980 }}
          loading={this.state.isLoading}
          dataSource={this.state.rows}
          columns={this.columns}
          size="middle"
        />
        <SparePartForm {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default SparePart;
