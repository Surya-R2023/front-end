import PageList from "../../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../../utils/action-button/action-button";
import { AddButton } from "../../../../utils/action-button/action-button";
import { Table } from "antd";
import { withRouter } from "../../../../utils/with-router";
import CheckTypeService from "../../../../services/audit-services/check-type-service";
import CheckTypeForm from "./check-type-form";
import Page from "../../../../utils/page/page";

class CheckType extends PageList {
  service = new CheckTypeService();
  title = "Inspection Type";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      align: "left",
      width: 0,
    },
    {
      dataIndex: "checkTypeName",
      key: "checkTypeName",
      title: "Inspection Type",
      align: "left",
    },
    {
      dataIndex: "description",
      key: "description",
      title: "Description",
      align: "left",
    },
    {
      dataIndex: "active",
      key: "active",
      title: "Status",
      align: "center",
      render: (value) => {
        return value ? "Active" : "In-active";
      },
    },
    {
      dataIndex: "checkTypeId",
      key: "checkTypeId",
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
        action={<AddButton onClick={() => this.add()} />}
      >
        <Table
          rowKey="checkTypeId"
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
        <CheckTypeForm {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default withRouter(CheckType);
