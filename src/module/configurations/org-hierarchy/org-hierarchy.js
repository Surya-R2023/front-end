import React from "react";
import { Button, Table } from "antd";
import {
  DeleteButton,
  EditButton,
  ViewButton,
  AddButton,
} from "../../../utils/action-button/action-button";
import OrganisationHierarchyService from "../../../services/organisation-hierarchy-service";

import Page from "../../../utils/page/page";
import PageList from "../../../utils/page/page-list";
import { withForm } from "../../../utils/with-form";
import OrgHierarchyForm from "./org-hierarchy-form";
import OrganisationHierarchyLevelService from "../../../services/organisation-hierarchy-level-service";

// Component
class OrganisationHierarchy extends PageList {
  title = "Organisation Hierarchy";
  service = new OrganisationHierarchyService();
  orgLevelService = new OrganisationHierarchyLevelService();
  column = [
    {
      title: "Name",
      dataIndex: "orgHierarchyName",
      key: "orgHierarchyName",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (value) => {
        return this.state.orgLevel ? this.state.orgLevel[value] : "";
      },
    },
    {
      dataIndex: "orgHierarchyId",
      key: "orgHierarchyId",
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
          rowKey="orgHierarchyId"
        />
        {this.state.popup?.open && (
          <OrgHierarchyForm {...this.state.popup} close={this.onClose} />
        )}
      </Page>
    );
  }
}

export default withForm(OrganisationHierarchy);
