import React from "react";
import { Button, Table } from "antd";
import {
  DeleteButton,
  EditButton,
  ViewButton,
  AddButton,
} from "../../../utils/action-button/action-button";
import OrganisationHierarchyService1 from "../../../services/organisation-hierarchy-service";

import Page from "../../../utils/page/page";
import PageList from "../../../utils/page/page-list";
import { withForm } from "../../../utils/with-form";
// import OrgHierarchyForm from "./org-hierarchy-form";
import OrganisationHierarchyLevelService from "../../../services/organisation-hierarchy-level-service";
import OrganisationHierarchyForm from "./organisation-hierarchy-from";
// Component
class OrganisationHierarchy1 extends PageList {
  title = "Organisation Hierarchy";
  service = new OrganisationHierarchyService1();
  orgLevelService = new OrganisationHierarchyLevelService();
  column = [
    {
        dataIndex: "sno",
        key: "sno",
        title: "S.No",
        width: 80,
        align: "left",
      },
  
    {
      title: "OrganisationName",
      dataIndex: "organisationName",
      key: "organisationName",
    },
    {
        dataIndex: "active",
        key: "active",
        title: "Status",
        render: (value) => {
          return !!value ? "Active" : "In-active";
        },
      },
    // {
    //   title: "Level",
    //   dataIndex: "level",
    //   key: "level",
    //   render: (value) => {
    //     return this.state.orgLevel ? this.state.orgLevel[value] : "";
    //   },
    // },
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
  componentDidMount() {
    super.componentDidMount();
    this.orgLevelService.list().then(({ data }) => {
      this.setState((state) => ({
        ...state,
        orgLevel: data.reduce(function (c, e) {
          c[e.level] = e.orgHierarchyLevelName;
          return c;
        }, {}),
      }));
    });
  }
  handleData(data) {
    return this.service.convertTree(data);
  }
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
          bordered
          size="small"
          loading={this.state.isLoading}
          dataSource={this.state.rows}
          pagination={false}
          columns={this.column}
          rowKey="organisationId"
        />
        {this.state.popup?.open && (
          <OrganisationHierarchyForm {...this.state.popup} close={this.onClose} />
        )}
      </Page>
    );
  }
}

export default withForm(OrganisationHierarchy1);
