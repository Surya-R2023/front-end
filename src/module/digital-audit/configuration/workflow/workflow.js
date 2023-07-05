import PageList from "../../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../../utils/action-button/action-button";
import { AddButton } from "../../../../utils/action-button/action-button";
import { Table } from "antd";
import { withRouter } from "../../../../utils/with-router";
import WorkflowService from "../../../../services/audit-services/work-flow-service";
import WorkflowForm from "./workflow-form";
import Page from "../../../../utils/page/page";

class Workflow extends PageList {
  service = new WorkflowService();
  title = "Workflow";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      align: "left",
      width: 0,
    },
    {
      dataIndex: "workflowName",
      key: "workflowName",
      title: "Workflow Name",
      align: "left",
    },
    // {
    //   dataIndex: "description",
    //   key: "description",
    //   title: "Description",
    //   align: "left",
    // },
    {
      dataIndex: "workflowType",
      key: "workflowType",
      title: "Workflow Type",
      align: "left",
    },
    {
      dataIndex: "frequency",
      key: "frequency",
      title: "Frequency",
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
      dataIndex: "workflowId",
      key: "workflowId",
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
          rowKey="workflowId"
          // bordered
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
        <WorkflowForm {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default Workflow;
