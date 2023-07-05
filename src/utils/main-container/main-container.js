import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Image, Layout, Popover, Tooltip } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import LoginService from "../../services/login-service";
import MenuService from "../../services/menu-service";
import Alarm from "../alarm/alarm";
import "./main-container.css";
export default function MainContainer() {
  const menuService = new MenuService();
  const authService = new LoginService();
  // const [items, setItems] = useState([]);
  const items = menuService.convertTree(
    useSelector((state) => state.loggedReducer.menuList)
  );

  const [collapse, setCollapse] = useState(false);
  const { Sider } = Layout;
  const Navigation = useNavigate();
  const getUserName = () => {
    return authService.getUserName();
  };
  const getInitialinUName = () => {
    let firstLetter = authService.getUserName();
    return firstLetter ? firstLetter[0] : "";
  };
  const token = () => {
    return authService.getToken();
  };
  const logout = () => {
    authService.logout();
    Navigation("login");
  };
  return (
    <>
      {!token() && <Navigate to="login" />}
      <Alarm>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            className="bg-primary"
            collapsed={true}
            collapsedWidth={60}
            style={{
              position: "sticky",
              height: "100vh",
              top: 0,
              left: 0,
              overflow: "hidden",
              backgroundColor:"#FFFFFF"
            }}
          >
            <div className="sider-main">
              <Avatar
                style={{ padding: "5px", backgroundColor: "#FFFFFF" }}
                size={40}
                gap={[4, 4]}
                shape="square"
                src={
                  <Image
                    width="auto"
                    preview={false}
                    height="100%"
                    src="/naffco-logo.png"
                  />
                }
              />
              <span style={{ marginTop: "20px" }}></span>
              {items.map((e) => (
                <Tooltip
                  color="#333333"
                  title={e.menuName}
                  placement="right"
                  key={e.key}
                >
                  <NavLink
                    className={({ isActive }) => (isActive ? "nav-active" : "")}
                    to={e.path ? e.path : "/"}
                  >
                    <Avatar
                      shape="square"
                      className="bg-primary"
                      icon={<FontAwesomeIcon icon={e.icon} />}
                    />
                  </NavLink>
                </Tooltip>
              ))}

              <span style={{ marginTop: "auto" }}></span>
              <Badge count={<span style={{ color: "#ffffff" }}>5</span>}>
                <Button
                  style={{ color: "#ffffff" }}
                  type="primary"
                  icon={<FontAwesomeIcon icon="fa-solid fa-bell" />}
                ></Button>
              </Badge>
              <Popover
                placement="right"
                title={getUserName()}
                content={
                  <>
                    <Button
                      icon={<LogoutOutlined />}
                      type="text"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </>
                }
              >
                <Avatar
                  style={{
                    color: "#ff0000",
                    backgroundColor: "#FFFFFF",
                    size: "large",
                  }}
                >
                  {getInitialinUName()}
                </Avatar>
              </Popover>
            </div>
          </Sider>
          <Layout>
            <Outlet />
          </Layout>
        </Layout>
      </Alarm>
    </>
  );
}
