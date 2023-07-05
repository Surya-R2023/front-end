import CrudService from "../crud-service";
import HttpClient from "../http";
import { rootUrl } from "../../helpers/url";
class WorkFlowHomeService {
  http = new HttpClient();
  dashboard(filter = {}) {
    return this.http.get(`${rootUrl}/report/preventive-maintenance/over-all`, {
      params: filter,
    });
  }
}
export default WorkFlowHomeService;
