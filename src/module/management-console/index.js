import React from "react";
import { withAuthorization } from "../../utils/with-authorization";
import { Routes, Route, Navigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";
// import Asset from "../configurations/asset/asset";
import AssetForm from "../configurations/asset/asset-form";
import AccessSettings from "../configurations/access-settings/access-settings";
import Role from "../configurations/role/role";
import SmsAndMailConfiguration from "../configurations/sms-configuration/sms-config";
import NewsUpdate from "../configurations/news-update/news-update";
import NewsUpdateForm from "../configurations/news-update/news-update-form";
import User from "../configurations/user/user";
import UserAccess from "./user-access/user-access";
// import CheckType from "../management-console/check-type/check-type"
// import Check from "./configuration/check/check";
// import Checklist from "./configuration/checklist/checklist";
// import ChecklistForm from "./configuration/checklist/checklist-form";
// import Workflow from "./configuration/workflow/workflow";
// import Dashboard from "./dashboard/dashboard";
// import Reports from "./reports/reports";
// import ResolutionWorkOrder from "./resolution-work-order/resolution-work-order";
// import ResolutionWorkOrderForm from "./resolution-work-order/resolution-work-order-form";
// import Scheduler from "./scheduler/scheduler";
// import SchedulerForm from "./scheduler/schedulerform";
// import Configuration from "./configuration/configuration";
import AppHierarchy from "./app-hierarchy/app-hierarchy";
import {
  appHierarchyPageId,
  appHierarchyStructurePageId,
  assetPageId,
  assetlibraryPageId,
  checklistPageId,
  newsNotificationPageId,
} from "../../helpers/page-ids";
import ConfigurationSub from "./configuration-sub";
// import ChecklistExecution from "./checklistexecution/checklist-execution";
import {
  //appHierarchyPageId,
  //assetPageId,
  // checkPageId,
  // checklistPageId,
  // checkTypePageId,
  // checklistExecutionPageId,
  // resolutionWorkOrderPageId,
  rolePageId,
  // schedulerPageId,
  smsConfigurationId,
  userPageId,
  useraccessPageId,
} from "../../helpers/page-ids";
import AppHierarchyForm from "./app-hierarchy/app-hierarchy-form";
import Configuration from "./configuration";
import Asset from "../configurations/asset/asset";
import Checklist from "../digital-workflow/configuration/checklist/checklist";
import AssetLibrary from "../configurations/asset-library/asset-library";

// import ChecklistExecutionStepper from "./checklistexecution/checklist-execution-stepper";

// import BasicDetailsForm from "../configurations/asset/basic-details-form";
import Preview from "../configurations/asset/preview";
import SmsConfig from "../configurations/sms-configuration/sms-config";
// import ChecklistUpload from "./configuration/checklist/checkList-upload-form";

// import UserAccess from "./configuration/user-access/user-access";
function ManagementConsole() {
  const router = useRoutes([
    // {
    //   path: "dashboard",
    //   element: <Dashboard />,
    // },
    // // {
    // //   path: "useraccess",
    // //   element: <UserAccess/>,
    // // },
    // {
    //   path: "workflow",
    //   element: <Workflow />,
    // },
    // {
    //   path: "scheduler",
    //   children: [
    //     {
    //       index: true,
    //       element: <Scheduler pageId={schedulerPageId} />,
    //     },
    //     {
    //       path: "add",
    //       element: <SchedulerForm pageId={schedulerPageId} />,
    //     },
    //     {
    //       path: "update/:id",
    //       element: <SchedulerForm pageId={schedulerPageId} />,
    //     },
    //     {
    //       path: "edit/:id",
    //       element: <SchedulerForm pageId={schedulerPageId} />,
    //     },
    //   ],
    // },
    // {
    //   path: "resolution-work-order",
    //   children: [
    //     {
    //       index: true,
    //       element: <ResolutionWorkOrder   pageId={resolutionWorkOrderPageId} />,
    //     },
    //     {
    //       path: "add",
    //       element: (
    //         <ResolutionWorkOrderForm
    //           mode="Add"
    //           pageId={resolutionWorkOrderPageId}
    //         />
    //       ),
    //     },
    //     {
    //       path: "update/:id",
    //       element: (
    //         <ResolutionWorkOrderForm
    //           mode="Edit"
    //           pageId={resolutionWorkOrderPageId}
    //         />
    //       ),
    //     },

    //   ],
    // },
    // {
    //   path: "checklist-execution",
    //   children: [
    //     {
    //       index: true,
    //       element: <ChecklistExecution pageId={checklistExecutionPageId} />,
    //     },
    //     {
    //       path: "add",
    //       element: (
    //         <ChecklistExecutionStepper
    //           mode="Add"
    //           pageId={checklistExecutionPageId}
    //         />
    //       ),
    //     },

    //     {
    //       path: "update/:id",
    //       element: (
    //         <ChecklistExecutionStepper
    //           mode="Edit"
    //           pageId={checklistExecutionPageId}
    //         />
    //       ),
    //     },
    //   ],
    // },
    // {
    //   path: "app-hierarchy",
    //   element: <AppHierarchy pageId={appHierarchyPageId} />,
    // },
    // {
    //   path: "config",
    //   element: <Configuration />,
    //   children: [
    //     {
    //       path: "app-hierarchy",
    //       element: <AppHierarchy pageId={appHierarchyPageId} />,
    //     },
    //   ],
    // },
    //     {
    //       path: "check-type",
    //       element: <CheckType pageId={checkTypePageId} />,
    //     },
    // {
    //   path: "check",
    //   element: <Check pageId={checkPageId} />,
    // },
    //     {
    //       path: "checklist",
    //       children: [
    //         {
    //           index: true,
    //           element: <Checklist pageId={checklistPageId} />,
    //         },
    //         {
    //           path: "add",
    //           element: <ChecklistForm mode="Add" pageId={checklistPageId} />,
    //         },
    //         {
    //           path: "update/:id",
    //           element: <ChecklistForm mode="Edit" pageId={checklistPageId} />,
    //         },
    //         {
    //           path: "view/:id",
    //           element: <ChecklistForm mode="View" pageId={checklistPageId} />,

    //         },
    //         // {
    //         //   path: "open/:id",
    //         //   element: <ChecklistForm mode="open" pageId={checklistPageId} />,

    //         // },
    //         {
    //           path: "uploadChecklist",
    //           element: < ChecklistUpload/>,

    //         },
    //       ],
    //     },
    {
      path: "asset-manager",
      element: <ConfigurationSub />,
      children: [
        // {
        //   index: true,
        //   element: <Navigate to="role" />,
        // },
        // {
        //   path: "role",
        //   element: <Role pageId={rolePageId} />,
        // },
        // {
        //   path: "user",
        //   element: <User pageId={userPageId} />,
        // },
        // {
        //   path: "sms-configuration",
        //   element: <SmsAndMailConfiguration pageId={smsConfigurationId} />,
        // },
        {
          path: "useraccess",
          element: <UserAccess pageId={useraccessPageId} />,
        },
        {
          path: "app-hierarchy",
          element: <AppHierarchy pageId={appHierarchyPageId} />,
        },
        {
          path: "asset",
          element: <Asset pageId={assetPageId} mode="Add" />,
        },
        {
          path: "asset-library",
          element: <AssetLibrary pageId={assetlibraryPageId} />,
        },
        {
          path: "checklist",
          element: <Checklist pageId={checklistPageId} />,
        },
      ],
    },
    {
      path: "user-access-settings",
      children: [
        {
          index: true,
          element: <Role pageId={rolePageId} Navigate to="role" />,
        },
        {
          path: "user",
          element: <User pageId={userPageId} />,
        },
        {
          path: "role",
          element: <Role pageId={rolePageId} />,
        },
        {
          path: "access-settings",
          element: <AccessSettings pageId={AccessSettings} />,
        },
      ],
    },

    {
      path: "notification-systems",
      children: [
        {
          path: "role",
          element: <Role pageId={rolePageId} />,
        },
        {
          path: "mail-sms-configuration",
          element: <SmsAndMailConfiguration pageId={smsConfigurationId} />,
        },
        {
          path: "news-notification",
          element: <NewsUpdate pageId={newsNotificationPageId} />,
        },
      ],
    },
  ]);

  return router;
}

export default ManagementConsole;
