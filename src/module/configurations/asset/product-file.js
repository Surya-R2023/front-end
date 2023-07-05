import ProductFileService from "../../../services/spare-parts-services/product-file-service";
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
import { Table, Avatar, Button, Upload, message, Row, Col } from "antd";
import { Link } from "react-router-dom";
import ProductFileForm from "./product-file-form";

class ProductFile extends PageList {
  service = new ProductFileService();
  productService = new ProductService();
  title = "File";
  componentDidMount() {
    super.componentDidMount();
  }
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",

      align: "left",
    },

    {
      dataIndex: "title",
      key: "title",
      title: "Title",
      align: "left",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },

    {
      dataIndex: "productFileId",
      key: "productFileId",
      title: "Action",
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
  // getProductName = (id) => {
  //   let e = this.state.product?.find((e) => e.productId == id);
  //   return e ? e.productName : "";
  // };
  next = () => {
    this.props.next();
  };
  back = () => {
    this.props.prev();
  };
  list() {
    super.list({ assetId: this.props.assetId });
  }

  render() {
    return (
      <div>
        <Row justify="end">
          <AddButton onClick={() => this.add()} />
        </Row>
        <Table
          rowKey="productId"
          pagination={{
            showSizeChanger: true,

            showQuickJumper: true,

            size: "default",
          }}
          loading={this.state.isLoading}
          dataSource={this.state.rows}
          columns={this.columns}
          size="middle"
        />
        <ProductFileForm
          assetId={this.props.assetId}
          {...this.state.popup}
          close={this.onClose}
        />
        <br></br>
        <Row justify="space-between">
          <Col>
            <Button onClick={this.back}>Back</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={this.next}>
              Save & Preview
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductFile;
