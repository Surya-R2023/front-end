import UserService from "../../../services/user-service";
import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import UserForm from "./userform";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, Input, message, Space, Row ,Col} from "antd";
import RoleService from "../../../services/role-service";
import { SearchOutlined } from "@ant-design/icons";
import { withAuthorization } from "../../../utils/with-authorization";
import AppHierarchyService from "../../../services/app-hierarchy-service";

class User extends PageList {
  roleService = new RoleService();
  appHierarchyService = new AppHierarchyService();

  componentDidMount() {
    Promise.all([this.appHierarchyService.list()]).then((response) => {
      this.setState((state) => ({
        ...state,
        appHeirarchyData: response[0].data,
      }));
    });

    Promise.all([this.roleService.list(), this.service.list()])
      .then((response) => {
        let changes = this.handleData(response[1].data);
        this.setState((state) => ({
          ...state,
          role: response[0].data,
          rows: changes,
          res: changes,
        }));
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        this.setState((state) => ({
          ...state,
          isLoading: false,
        }));
      });

    super.componentDidMount();
  }

  service = new UserService();
  title = "User";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 0,
      align: "Left",
    },
    {
      dataIndex: "userName",
      key: "userName",
      title: "User Name",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
    },
    {
      dataIndex: "roleId",
      key: "roleId",
      title: "Role",
      sorter: (a, b) => a.roleId.localeCompare(b.roleId),
      render: (value) => {
        return this.getName(value);
      },
    },
    {
      dataIndex: "ahid",
      key: "ahid",
      title: "Site",
      render: (value) => {
        const appheir = this.state.appHeirarchyData?.find(
          (e) => e.ahid === value
        );
        return appheir ? appheir.ahname : null;
      },
    },
    {
      dataIndex: "email",
      key: "email",
      title: "E-mail",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      dataIndex: "contactNumber",
      key: "contactNumber",
      title: "Mobile No",
      sorter: (a, b) => a.contactNumber.localeCompare(b.contactNumber),
    },
    {
      dataIndex: "active",
      key: "active",
      title: "Status",
      render: (value) => {
        return value ? "Active" : "In-active";
      },
    },
    {
      dataIndex: "userId",
      key: "userId",
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

  getName = (id) => {
    let e = this.state.role?.find((e) => e.roleId == id);
    return e ? e.roleName : "";
  };

  filter = (search) => {
    let s = search.target.value.toLowerCase().trim();
    let res = this.state.rows.filter((e) => {
      return (
        e.userName?.toLowerCase().includes(s) ||
        e.contactNumber?.toLowerCase().includes(s)
      );
    });
    this.setState((state) => ({ ...state, res: res }));
  };

  render() {
    return (
      <Page
        title={this.title}
        // action={

        // }
        // filter={

        // }
      >
        <br></br>
        <Row justify="space-between">
          <Col>
            <Input
              prefix={<SearchOutlined style={{ color: "#c4c4c4" }} />}
              onInput={this.filter}
              placeholder="Search..."
              bordered={false}
            />
          </Col>
          <Col>
            <>{this.props.add && <AddButton onClick={() => this.add()} />}</>
          </Col>
        </Row>
        <br></br>
        <Table
          rowKey="userId"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            size: "default",
          }}
          scroll={{ x: 980 }}
          loading={this.state.isLoading}
          dataSource={this.state.res}
          columns={this.columns}
          size="middle"
        />
        <UserForm {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default withAuthorization(User);
