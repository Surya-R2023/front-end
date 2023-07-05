import { rootUrl } from "../helpers/url";
import CrudService from "./crud-service";
class AppHierarchyService extends CrudService {
  url = `${rootUrl}/app-hierarchy`;

  convertToTree(data, parent = null) {
    let result = data
      .filter((e) => e.ahparentId === parent)
      .map((e) => {
        let obj = { ...e };
        let children = this.convertToTree(data, e.ahid);
        if (children.length > 0) obj = { ...e, children: children };
        return obj;
      });
    return result;
  }
  convertToSelectTree(data, parent = null) {
    let result = data
      .filter((e) => e.ahparentId === parent)
      .map((e) => {
        let obj = { value: e.ahid, title: e.ahname };
        let children = this.convertToSelectTree(data, e.ahid);
        if (children.length > 0)
          obj = { value: e.ahid, title: e.ahname, children: children };
        return obj;
      });
    return result;
  }
}
export default AppHierarchyService;
