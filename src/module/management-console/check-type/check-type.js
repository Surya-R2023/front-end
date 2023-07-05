import PageList from "../../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../../utils/action-button/action-button";
import { AddButton } from "../../../../utils/action-button/action-button";
import { Table } from "antd";
import { withRouter } from "../../../../utils/with-router";
import CheckTypeService from "../../../../services/preventive-maintenance-services/check-type-service";
import CheckTypeForm from "./check-type-form";
import Page from "../../../../utils/page/page";
import { checkTypePageId } from "../../../../helpers/page-ids";
import UserAccessService from "../../../../services/user-access-service";

class CheckType extends PageList {
  pageId = checkTypePageId;
  service = new CheckTypeService();
  userAccessService = new UserAccessService();

  title = "Check Type";
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
      title: "Check Type",
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
            <ViewButton
              // hidden={this.access.View}
              onClick={() => this.view(value)}
            />
            <EditButton
              // hidden={this.access.Edit}
              onClick={() => this.edit(value)}
            />
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
          <AddButton onClick={() => this.add()} />
        }
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
