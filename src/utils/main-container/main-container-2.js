import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  FireFilled,
  AlertFilled,
  BellFilled,
  MailFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import { HiBellAlert } from "react-icons/hi2";
import {
  Menu,
  Avatar,
  Badge,
  Button,
  Image,
  Layout,
  Popover,
  Tooltip,
  Breadcrumb,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LoginService from "../../services/login-service";
import MenuService from "../../services/menu-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./main-container.css";
import Alarm from "../alarm/alarm";
import { menuList as getMenuList } from "../../store/actions";
import SideMenu from "./SideMenu";
const { Text, Title } = Typography;
export default function MainContainerTwo(){
  const dispatch = useDispatch();
  const location = useLocation();
  const [selectedMenu, setSelecteMenu] = useState({});
  const [breadCrumb, setBreadCrumb] = useState([]);
  const menuList = useSelector((state) => state.loggedReducer.menuList);
  const fireAlertsList = useSelector(
    (state) => state.loggedReducer.fireAlertsList
  );
  const pumpAlertsList = useSelector(
    (state) => state.loggedReducer.pumpAlertsList
  );
  const acknowledgementList = useSelector(
    (state) => state.loggedReducer.acknowledgementList
  );
  const menuService = new MenuService();
  const authService = new LoginService();
  useEffect(() => {
    dispatch(getMenuList());
  }, []);
  useEffect(() => {
    setTimeout(() => {
      findMenu(location.pathname);
    }, 500);
  }, [location, menuList]);
  const findMenu = (path) => {
    let p = path?.slice(1)?.replace(/(\/add)|(\/update\/[0-9])\w+/g, "");
    let menu = menuList?.find((e) => e.path == p);

    setSelecteMenu(menu ?? {});
    if (menu) {
      let bCrumb = [menu];
      let parentId = menu?.parentId ?? null;

      do {
        let menu = menuList.find((e) => e.menuId == parentId);
        parentId = menu?.parentId ?? null;
        if (menu) bCrumb.push(menu);
      } while (parentId != null);

      let breadCrumbTemp = bCrumb?.reverse() ?? [];
      if (path.indexOf("add") != -1) {
        breadCrumbTemp.push({ menuName: "Add" });
      } else if (path.indexOf("update") != -1) {
        breadCrumbTemp.push({ menuName: "Update" });
      } else;
      setBreadCrumb(breadCrumbTemp);
    }
  };
  const [collapse, setCollapse] = useState(false);
  const { Sider, Header, Footer, Content } = Layout;
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
  const menuSet = (data, level = 0) => {
    return data?.map((e) => {
      let obj = {
        ...e,
        icon: e.icon && level == 0 ? <FontAwesomeIcon icon={e.icon} /> : null,
      };
      if (e.children) obj.children = menuSet(e.children, level + 1);
      return obj;
    });
  };
  const items = menuSet(menuService.convertTree(menuList));
  const fireIndex = menuList.findIndex(
    (e) => e.path === "remote-monitoring/fire-alerts"
  );
  const assetIndex = menuList.findIndex(
    (e) => e.path === "remote-monitoring/asset-alerts"
  );

  return (
    <>
      {!token() && <Navigate to="login" />}
      <Alarm>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            width={220}
            collapsed={collapse}
            style={{
              position: "sticky",
              height: "100vh",
              top: 0,
              left: 0,
              overflow: "auto",
              backgroundColor: "#1565c0",
            }}
          >
            <Header
              style={{
                position: "sticky",
                top: 0,
                backgroundColor: "#1565c0",
                border: 0,
                boxShadow: "none",
              }}
            >
              <Image
                src="/logo.png"
                preview={false}
                style={{ margin: "auto", maxWidth: "150px" }}
              />
            </Header>
            <Menu backgroundColor="#FFFFFF" mode="inline" items={items} />
            <SideMenu />
          </Sider>
          <Layout>
            <Header
              className="bg-white"
              style={{
                position: "sticky",
                top: 0,
                background: "#ffffff",
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <Button
                type="text"
                onClick={() => setCollapse((value) => !value)}
                icon={collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                {breadCrumb?.map((e) => (
                  <Breadcrumb.Item>{e.menuName}</Breadcrumb.Item>
                ))}
              </Breadcrumb>

              <span style={{ marginRight: "auto" }}></span>
              {fireIndex !== -1 && (
                <Tooltip title="Fire" placement="bottom">
                  <Link
                    className={
                      acknowledgementList?.length ?? 0 > 0 ? "blink_me" : ""
                    }
                    to="/remote-monitoring/fire-alerts"
                  >
                    <Badge
                      style={{ backgroundColor: "#e30613" }}
                      count={fireAlertsList?.length ?? 0}
                    >
                      <Avatar
                        style={{
                          backgroundColor: "#e30613",
                        }}
                        icon={<FireFilled />}
                      ></Avatar>
                    </Badge>
                  </Link>
                </Tooltip>
              )}
              {assetIndex !== -1 && (
                <Tooltip title="Asset Alarm" placement="bottom">
                  {/* <Link to="/preventive-maintenance/resolution-work-order?status=0"> */}
                  <Link to="/remote-monitoring/asset-alerts">
                    {/* <Link to="/preventive-maintenance/checklist-execution"> */}
                    <Badge
                      style={{
                        backgroundColor: "orange",
                      }}
                      count={pumpAlertsList?.length ?? 0}
                    >
                      <Avatar
                        style={{
                          backgroundColor: "orange",
                          lineHeight: "35px",
                        }}
                        icon={<HiBellAlert />}
                      ></Avatar>
                    </Badge>
                  </Link>
                </Tooltip>
              )}

              <Tooltip title="Notification" placement="bottom">
                <Badge style={{ backgroundColor: "#2196f3" }} count={0}>
                  <Avatar
                    style={{
                      backgroundColor: "#2196f3",
                    }}
                    icon={<MailFilled />}
                  ></Avatar>
                </Badge>
              </Tooltip>
              <Popover
                placement="bottomRight"
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
                <Avatar icon={<UserOutlined />}>{getInitialinUName()}</Avatar>
              </Popover>
            </Header>
            <Content>
              {/* <div
                style={{
                  background: "#ffffff",
                  padding: "5px 15px",
                }}
              >
                <Breadcrumb>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  {breadCrumb?.map((e) => (
                    <Breadcrumb.Item>{e.menuName}</Breadcrumb.Item>
                  ))}
                </Breadcrumb>
              </div> */}
              <Outlet />
            </Content>
            {/* <Footer>Powered By byteFactory</Footer> */}
          </Layout>
        </Layout>
      </Alarm>
    </>
  );
}
