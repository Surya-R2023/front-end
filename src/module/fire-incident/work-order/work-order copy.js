import { Tabs } from "antd";
import React from "react";
import CheckListExecution from "../checklistexecution/checklist-execution";
import ResolutionWorkOrder from "../resolution-work-order/resolution-work-order";
import { Link } from "react-router-dom";
const WorkOrderPage = () => (
  <Tabs defaultActiveKey="1">
    <Link to="bharath">
      <Tabs.TabPane tab="Checklist" key="1">
        <CheckListExecution></CheckListExecution>
      </Tabs.TabPane>
    </Link>

    <Tabs.TabPane tab="Ticketlist" key="2">
      <ResolutionWorkOrder></ResolutionWorkOrder>
    </Tabs.TabPane>
  </Tabs>
);
export default WorkOrderPage;
