import { Card, Spin, Row, Col, Tabs } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";
import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import Page from "../../../utils/page/page";
import PageList from "../../../utils/page/page-list";
import CheckListExecution from "../checklistexecution/checklist-execution";
import ResolutionWorkOrder from "../resolution-work-order/resolution-work-order";
const style = {
  formItem: {
    minWidth: "120px",
  },
};

class WorkOrderList extends PageList {
  items = () => {
    return [
      {
        label: "Checklist",
        key: "1",
        url: "",
        children: (
          <Card>
            <CheckListExecution></CheckListExecution>
          </Card>
        ),
      }, // remember to pass the key prop
      {
        label: "Tickets",
        key: "2",
        url: "../",
        children: (
          <Card>
            <ResolutionWorkOrder></ResolutionWorkOrder>
          </Card>
        ),
      },
    ];
  };

  //   onTabChange = (value) => {
  //     {
  //       this.setState({ ...this.state, activeKey: value });
  //     }
  //   };

  render() {
    return (
      <Page title="Work Order Details">
        <Row justify="center" gutter={[10, 10]}>
          <Tabs
            // onChange={this.onTabChange}
            defaultActiveKey="1"
            activeKey={this.state.activeKey}
            items={this.items()}
          ></Tabs>
        </Row>
      </Page>
    );
  }
}

export default WorkOrderList;
