import React, { Component } from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import Card from "./card/card";
import CheckListExecution from "./checklistexecution/checklist-execution";
import ChecklistExecutionStepper from "./checklistexecution/checklist-execution-stepper";
import CheckType from "./configuration/check-type/check-type";
import Check from "./configuration/check/check";
import Checklist from "./configuration/checklist/checklist";
import ChecklistForm from "./configuration/checklist/checklist-form";
import Workflow from "./configuration/workflow/workflow";
import ResolutionWorkOrder from "./resolution-work-order/resolution-work-order";
import ResolutionWorkOrderForm from "./resolution-work-order/resolution-work-order-form";
import Scheduler from "./scheduler/scheduler";
import SchedulerForm from "./scheduler/schedulerform";
import Dashboard from "./dashboard/dashboard";
import MenuContainer from "../../utils/main-container/menu-container";
import Reports from "./reports/reports";

class DigitalWorkflow extends Component {
  state = {};
  component = {
    MenuContainer: MenuContainer,
    Dashboard: Dashboard,
    Workflow: Workflow,
    Check: Check,
    CheckType: CheckType,
    Card: Card,
    Checklist: Checklist,
    ChecklistForm: ChecklistForm,
    CheckListExecution: CheckListExecution,
    ChecklistExecutionStepper: ChecklistExecutionStepper,
    Scheduler: Scheduler,
    SchedulerForm: SchedulerForm,
    ResolutionWorkOrder: ResolutionWorkOrder,
    ResolutionWorkOrderForm: ResolutionWorkOrderForm,
    Reports: Reports,
  };
  setComponent(comp) {
    this.component = { ...this.component, ...comp };
  }
  render() {
    const {
      MenuContainer,
      Dashboard,
      Workflow,
      Check,
      CheckType,
      Card,
      Checklist,
      ChecklistForm,
      CheckListExecution,
      ChecklistExecutionStepper,
      Scheduler,
      SchedulerForm,
      ResolutionWorkOrder,
      ResolutionWorkOrderForm,
      Reports,
    } = this.component;
    return (
      <Routes>
        <Route path="" element={<MenuContainer />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />

          <Route path="workflow" element={<Workflow />} />
          <Route path="check" element={<Check />} />
          <Route path="check-type" element={<CheckType />} />
          <Route path="card" element={<Card />} />
          <Route path="checklist">
            <Route index element={<Checklist />} />
            <Route path="add" element={<ChecklistForm />} />
            <Route path="update/:id" element={<ChecklistForm />} />
            <Route path="view/:id" element={<ChecklistForm mode="View" />} />
          </Route>
          <Route path="checklist-execution">
            <Route index element={<CheckListExecution />} />
            <Route path="update/:id" element={<ChecklistExecutionStepper />} />
          </Route>
          <Route path="scheduler">
            <Route index element={<Scheduler />} />

            <Route path="add" element={<SchedulerForm />} />
            <Route path="update/:id" element={<SchedulerForm mode="Edit" />} />
          </Route>
          <Route path="resolution-work-order">
            <Route index element={<ResolutionWorkOrder />} />
            <Route path="update/:id" element={<ResolutionWorkOrderForm />} />
          </Route>
          <Route path="reports">
            <Route index element={<Reports />} />
          </Route>
        </Route>
      </Routes>
    );
  }
}

export default DigitalWorkflow;
