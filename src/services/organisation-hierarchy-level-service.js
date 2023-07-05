import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class OrganisationHierarchyLevelService extends CrudService {
  url = `${rootUrl}/org-hierarchy-level`;
  saveAll(data) {
    return this.http.post(`${this.url}/save-all`, data);
  }
}
export default OrganisationHierarchyLevelService;
