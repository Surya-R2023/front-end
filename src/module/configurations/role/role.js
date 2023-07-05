import RoleService from "../../../services/role-service";
import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import RoleForm from "./roleform";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table,Row } from "antd";
import { withAuthorization } from "../../../utils/with-authorization";

class Role extends PageList {
  service = new RoleService();
  title = "Role";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 80,
      align: "left",
    },

    {
      dataIndex: "roleName",
      key: "roleName",
      title: "Role Name",
      sorter: (a, b) => a.roleName.localeCompare(b.roleName),
    },
    {
      dataIndex: "active",
      key: "active",
      title: "Status",
      render: (value) => {
        return !!value ? "Active" : "In-active";
      },
    },
    {
      dataIndex: "roleId",
      key: "roleId",
      title: "Action",
      width: 160,
      align: "center",
      render: (value, record, index) => {
        return (
          <>
            {this.props.view && <ViewButton onClick={() => this.view(value)} />}
            {this.props.edit && <EditButton onClick={() => this.edit(value)} />}
            {this.props.delete && (
              <DeleteButton onClick={() => this.delete(value)} />
            )}
          </>
        );
      },
    },
  ];

  render() {
    return (
      <Page
        title={this.title}
        // action={
        //   <>{this.props.add && <AddButton onClick={() => this.add()} />}</>
        // }
      >
        <br></br>
        <Row justify="end">
        <>{this.props.add && <AddButton onClick={() => this.add()} />}</>
        </Row>
        <br></br>
        <Table
          rowKey="roleId"
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
        <RoleForm {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default withAuthorization(Role);
