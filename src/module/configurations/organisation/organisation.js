import OrganisationService from "../../../services/organisation-service";
import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import OrganisationForm from "./organisationform";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table,Col, Row } from "antd";
import UploadTemplate from "./organisation-upload-form";

class Organisation extends PageList {
  service = new OrganisationService();
  title = "Organisation";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 80,
    },

    {
      dataIndex: "organisationName",
      key: "organisationName",
      title: "Organisation Name",
      sorter: (a, b) => a.organisationName.localeCompare(b.organisationName)

    },

    {
      dataIndex: "parentId",
      key: "parentId",
      title: "Parent Organisation ",
      sorter: (a, b) => a.parentId.localeCompare(b.parentId),
      render: (value) => {
        return this.getName(value);
      },
    },

    {
      dataIndex: "active",
      key: "active",
      title: "Status ",
      align: "left",
      render: (value) => {
        return value ? "Active" : "In-active";
      },
    },

    {
      dataIndex: "organisationId",
      key: "organisationId",
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
  getName = (id) => {
    let e = this.state.rows?.find((e) => e.organisationId == id);
    return e ? e.organisationName : "";
  };
  render() {
    return (
      <Page
        title={this.title}
      >
        <Row justify={"end"}>
        <Col lg={1}>
        <UploadTemplate/>
        </Col>
        <Col>
        <AddButton onClick={() => this.add()} />
        </Col>
        </Row>
        <Table
          pagination={{
            showSizeChanger: true,

            showQuickJumper: true,

            size: "default",
          }}
          scroll={{ x: 980 }}
          rowKey="organisationId"
          loading={this.state.isLoading}
          dataSource={this.state.rows}
          columns={this.columns}
          size="middle"
        />
        {this.state.popup?.open && (
          <OrganisationForm {...this.state.popup} close={this.onClose} />
        )}
      </Page>
    );
  }
}

export default Organisation;
