import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserAccessService from "../../services/user-access-service";
import {
  appHierarchyPageId,
  assetPageId,
  checklistPageId,
  rolePageId,
  smsConfigurationId,
  userPageId,
  useraccessPageId,
} from "../../helpers/page-ids";

function Configuration() {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    const userAccessService = new UserAccessService();
    userAccessService.authorization().then(({ data }) => {
      setMenu(data);
    });
  }, []);
  const checkIfExist = (pageId) => {
    let i = menu.findIndex((e) => e.pageId === pageId);
    return i !== -1;
  };

  return (
    <>
      <div className="tab">
        <div className="tab-link">
          {/* <NavLink to="check-type">Check Type</NavLink>
          <NavLink to="check">Checks</NavLink> */}
          {/* {checkIfExist(checklistPageId) && (
            <NavLink to="checklist">Check List</NavLink>
          )} */}
          {/* {checkIfExist(assetPageId) && <NavLink to="asset">Asset</NavLink>} */}
          {checkIfExist(appHierarchyPageId) && (
            <NavLink to="app-hierarchy"> Hierarchy</NavLink>
          )}

          {(checkIfExist(rolePageId) ||
            checkIfExist(userPageId) ||
            checkIfExist(smsConfigurationId) ||
            checkIfExist(useraccessPageId)) && (
            <NavLink to="settings">Settings</NavLink>
          )}
        </div>
        <div className="tab-body" style={{ paddingTop: "5px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Configuration;
