import { Col, Row } from "antd";
import { NavLink, Outlet } from "react-router-dom";

import UserAccessService from "../../services/user-access-service";
import {
  rolePageId,
  smsConfigurationId,
  userPageId,
  useraccessPageId,
} from "../../helpers/page-ids";

import { useState, useEffect } from "react";
export default function ConfigurationSub() {
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
      <div className="tab tab-h">
        {/* <div className="tab-link">
          {checkIfExist(rolePageId) && <NavLink to="role">Role</NavLink>}
          {checkIfExist(userPageId) && <NavLink to="user">User</NavLink>}
          {checkIfExist(smsConfigurationId) && (
            <NavLink to="mail-sms-configuration">Mail / SMS Configuration</NavLink>
          )}
           {checkIfExist(useraccessPageId) && (
           <NavLink to="useraccess">User Access</NavLink>
           )}
        </div> */}
        <div className="tab-body">
          <Outlet />
        </div>
      </div>
    </>
  );
}
