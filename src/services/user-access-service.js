import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class UserAccessService extends CrudService {
  url = `${rootUrl}/user-access`;
  authorization(pageId = null) {
    if (pageId) {
      return this.http.get(`${this.url}/authorization/${pageId}`);
    }
    return this.http.get(`${this.url}/authorization`);
  }
  rolefilter() {      

    return this.http.get(`${this.url}/role-filter`);

  }
}
export default UserAccessService;
