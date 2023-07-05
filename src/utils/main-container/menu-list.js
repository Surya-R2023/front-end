import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Menu } from "antd";
import { useEffect, useState } from "react";

function MenuList(props) {
  const [items, setItems] = useState([]);
  const [rootSubmenuKeys] = useState([]);

  const [openKeys, setOpenKeys] = useState(["Mkey1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const menuSet = (data) => {
    return data?.map((e) => {
      let obj = {
        ...e,
        icon: e.icon ? (
          <Avatar
            shape="square"
            className="bg-primary"
            icon={<FontAwesomeIcon icon={e.icon} />}
          />
        ) : null,
      };
      if (e.children) obj.children = menuSet(e.children);
      return obj;
    });
  };
  useEffect(() => {
    setItems(menuSet(props.list));
  }, [props.list]);
  return (
    <>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
        style={{
          backgroundColor: "transparent",
          border: 0,
        }}
      />
    </>
  );
}

export default MenuList;
