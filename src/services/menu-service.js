import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
import { NavLink } from "react-router-dom";
export default class MenuService extends CrudService {
  url = `${rootUrl}/menu`;
  convertTree(list) {
    let l = list.sort((a, b) => a.orderNumber - b.orderNumber);
    return this.children(l, null);
  }
  children(list, parent) {
    let filtered = list.filter((e) => e.parentId == parent);
    return filtered.map((e) => {
      let children = this.children(list, e.menuId);
      let obj = { ...e, key: "MENU" + e.menuId };
      if (e.path) {
        // let p = e.path.split("/");
        // if (p.length > 1) {
        //   p?.splice(0, 1);
        //   obj.label = <NavLink to={p?.join("/")}>{e.menuName}</NavLink>;
        // } else
        obj.label = <NavLink to={e.path}>{e.menuName}</NavLink>;
      } else obj.label = e.menuName;
      if (children.length > 0) {
        obj.children = children;
        obj.label = e.menuName;
      }
      return obj;
    });
  }

  //   menuItem = (items, key = "MK") => {
  //     return items.map((e, i) => {
  //       let k = `${key}-${i}`;
  //       if (e.children?.length > 0) {
  //         return {
  //           ...e,
  //           label: e.label,
  //           key: k,
  //           children: menuItem(e.children, k),
  //         };
  //       } else {
  //         return {
  //           ...e,
  //           label: <Link to={e.path}>{e.label}</Link>,
  //           key: k,
  //         };
  //       }
  //     });
  //   };
  userMenu() {
    return this.http.get(`${rootUrl}/user-menu`);
  }
}
