// import { Menu } from "antd";
// import {
//   IdcardFilled,
//   FileTextOutlined,
//   BarChartOutlined,
//   SolutionOutlined,
//   ScheduleOutlined,
//   FileOutlined,
//   AppstoreOutlined,
//   DashboardOutlined,
// } from "@ant-design/icons";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import React, {useState} from 'react';
// import UserAccessService from "../../services/user-access-service";
// import {
//   appHierarchyPageId,
//   assetPageId,
//   checklistExecutionPageId,
//   checklistPageId,
//   resolutionWorkOrderPageId,
//   rolePageId,
//   schedulerPageId,
//   smsConfigurationId,
//   userPageId,
//   useraccessPageId,
// } from "../../helpers/page-ids";

// const { SubMenu } = Menu;

// // const menuData = [
// //   {
// //     icon: <IdcardFilled />,
// //     title: "Dashboard",
// //     to: "/dashboard",
// //   },
// //   // {
// //   //   icon: <IdcardFilled />,
// //   //   title: "Asset",
// //   //   to: "/asset",
// //   // },
// //   {
// //     icon: <IdcardFilled />,
// //     title: "Configuration",
// //     to: "/configuration",
// //   },
// //   {
// //     icon: <IdcardFilled />,
// //     title: "Scheduler",
// //     to: "/scheduler",
// //   },
// //   {
// //     icon: <IdcardFilled />,
// //     title: "Checklist Execution",
// //     to: "/checklist-execution",
// //   },
// //   {
// //     icon: <IdcardFilled />,
// //     title: "Resolution Work Order",
// //     to: "/resolution-work-order",
// //   },
// //   {
// //     icon: <IdcardFilled />,
// //     title: "Reports",
// //     to: "/reports",
// //   },
// //   {
// //     icon: <IdcardFilled />,
// //     title: "Role",
// //     to: "/role",
// //   },
// //   {
// //     icon: <IdcardFilled />,
// //     title: "SMS/Mail Configuration",
// //     to: "/sms-configuration",
// //   },
// //   {
// //     icon: <IdcardFilled />,
// //     title: "User",
// //     to: "/user",
// //   },
// //   {
// //     icon: <IdcardFilled />,
// //     title: "Asset",
// //     to: "/asset",
// //   },
// // ];
// const menuData = [
//   {
//     icon: <DashboardOutlined />,
//     title: "Dashboard",
//     to: "/dashboard",
//   },
//   {
//     icon: <AppstoreOutlined />,
//     title: "Configuration",
//     to: "configuration",
//     ids: [
//       rolePageId,
//       userPageId,
//       smsConfigurationId,
//       checklistPageId,
//       assetPageId,
//       appHierarchyPageId,
//       useraccessPageId
//     ],
//   },
//   {
//     icon: <ScheduleOutlined />,
//     title: "Scheduler",
//     to: "/scheduler",
//     ids: schedulerPageId,
//   },
//   {
//     icon: <SolutionOutlined />,
//     title: "Checklist Execution",
//     to: "/checklist-execution",
//     ids: checklistExecutionPageId,
//   },
//   {
//     icon: <FileTextOutlined />,
//     title: "Resolution Work Order",
//     to: "/resolution-work-order",
//     ids: resolutionWorkOrderPageId,
//   },
//   {
//     icon: <BarChartOutlined />,
//     title: "Reports",
//     to: "/reports",
//   },
// ];

// const generateMenuItems = (items) => {
//   return items.map((item) => {
//     if (item.subItems) {
//       return (
//         <SubMenu key={item.title} title={item.title} icon={item.icon}>
//           {generateMenuItems(item.subItems)}
//         </SubMenu>
//       );
//     }
//     return (
//       <Menu.Item key={item.title} icon={item.icon}>
//         <Link to={item.to}>{item.title}</Link>
//       </Menu.Item>
//     );
//   });
// };

// const SideMenu = () => {
//   const [menu, setMenu] = useState([]);
//   useEffect(() => {
//     const userAccessService = new UserAccessService();
//     userAccessService.authorization().then(({ data }) => {
//       setMenu(data);
//     });
//   }, []);
//   const checkIfExist = (pageId) => {
//     let i = menu.findIndex((e) => e.pageId === pageId);
//     return i !== -1;
//   };

//   return (
//     <Menu
//       mode="inline"
//       // theme="dark"
//       style={{ backgroundColor: "inherit", color: "#ffffff" }}
//       defaultSelectedKeys={["Dashboard"]}
//     >
//       {generateMenuItems(menuData)}
//     </Menu>
//   );
// };

// export default SideMenu;

import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";
// import UserAccessService from "../../services/user-access-service";
import {
  remoteMonitoring,
  rolePageId,
  userPageId,
  appHierarchyPageId,
} from "../../helpers/page-ids";
import { Icon, InlineIcon } from "@iconify/react";
// import dashboardIcon from "@iconify/icons-feather/home";
import configurationIcon from "@iconify/icons-feather/settings";
// import schedulerIcon from "@iconify/icons-feather/clock";
// import checklistIcon from "@iconify/icons-feather/check-square";
// import resolutionIcon from "@iconify/icons-feather/file-text";
// import reportsIcon from "@iconify/icons-feather/bar-chart-2";
import remotemonitoringIcon from "@iconify/icons-feather/monitor";

const { SubMenu } = Menu;

const menuData = [
  // {
  //   icon: <Icon icon={dashboardIcon} />,
  //   title: "Dashboard",
  //   to: "/dashboard",
  // },
  {
    icon: <Icon icon={configurationIcon} />,
    title: "Management Console",
    to: "management-console",

    ids: [
      rolePageId,
      userPageId,
      //smsConfigurationId,
      // checklistPageId,
      // assetPageId,
      appHierarchyPageId,
      // useraccessPageId,
      // remoteMonitoring,
    ],
    subItems: [
      {
        title: "Asset Manager",
        to: "/management-console/asset-manager",
        subItems: [
          {
            title: "Asset",
            to: "/management-console/asset-manager/asset",
          },
          {
            title: "Asset Library",
            to: "/management-console/asset-manager/asset-library",
          },
          {
            title: "App Hierarchy",
            to: "/management-console/asset-manager/app-hierarchy",
          },
        ],
      },
      {
        title: "User Access Settings",
        to: "/management-console/user-access-settings",
        subItems: [
          {
            title: "User",
            to: "/management-console/user-access-settings/user",
          },
          {
            title: "Role",
            to: "/management-console/user-access-settings/role",
          },
          {
            title: "Access Settings",
            to: "/management-console/user-access-settings/access-settings",
          },
        ],
      },
      {
        title: "Notification Systems",
        to: "/management-console/notification-systems",
        subItems: [
          {
            title: "News Notification",
            to: "/management-console/notification-systems/news-notification",
          },
          {
            title: "Mail/SMS Configuration",
            to: "/management-console/notification-systems/mail-sms-configuration",
          },
        ],
      },
    ],
  },

  // {
  //   icon: <Icon icon={remotemonitoringIcon} />,
  //   title: "Remote Monitoring",
  //   to: "/remote-monitoring",
  //   ids: remoteMonitoring,
  // },
  // {
  //   icon: <Icon icon={checklistIcon} />,
  //   title: "Checklist Execution",
  //   to: "/checklist-execution",
  //   ids: checklistExecutionPageId,
  // },
  // {
  //   icon: <Icon icon={resolutionIcon} />,
  //   title: "Resolution Work Order",
  //   to: "/resolution-work-order",
  //   ids: resolutionWorkOrderPageId,
  // },
  // {
  //   icon: <Icon icon={reportsIcon} />,
  //   title: "Reports",
  //   to: "/reports",
  // },
];

const generateMenuItems = (items) => {
  return items.map((item) => {
    if (item.subItems) {
      return (
        <SubMenu key={item.title} title={item.title} icon={item.icon}>
          {generateMenuItems(item.subItems)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.title} icon={item.icon}>
        <Link to={item.to}>{item.title}</Link>
      </Menu.Item>
    );
  });
};

const SideMenu = () => {
  // const [menu, setMenu] = useState([]);
  // useEffect(() => {
  //   const userAccessService = new UserAccessService();
  //   userAccessService.authorization().then(({ data }) => {
  //     setMenu(data);
  //   });
  // }, []);

  return (
    <Menu
      mode="inline"
      style={{ backgroundColor: "inherit", color: "#ffffff" }}
      defaultSelectedKeys={["Dashboard"]}
    >
      {generateMenuItems(menuData)}
    </Menu>
  );
};

export default SideMenu;
