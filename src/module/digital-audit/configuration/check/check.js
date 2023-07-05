import { Table } from "antd";
import CheckService from "../../../../services/audit-services/check-service";
import {
  AddButton,
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../../utils/action-button/action-button";
import Page from "../../../../utils/page/page";
import PageList from "../../../../utils/page/page-list";
import { withRouter } from "../../../../utils/with-router";
import CheckForm from "./check-form";

class Check extends PageList {
  form = CheckForm;
  service = new CheckService();
  title = "Check";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      align: "left",
      width: 0,
    },
    {
      dataIndex: "checkName",
      key: "checkName",
      title: "Check Name",
      align: "left",
      width: "220px",
    },
    {
      dataIndex: "description",
      key: "description",
      title: "Description",
      align: "left",
    },
    {
      dataIndex: "priority",
      key: "priority",
      title: "Priority",
      align: "left",
    },
    // {
    //   dataIndex: "imagePath",
    //   key: "imagePath",
    //   title: "Image",
    //   align: "left",
    // },
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
      dataIndex: "checkId",
      key: "checkId",
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
          rowKey="checkId"
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
        <this.form {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default Check;
