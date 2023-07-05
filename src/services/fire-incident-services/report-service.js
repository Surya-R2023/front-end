import CrudService from "../crud-service";
import HttpClient from "../http";
import { rootUrl } from "../../helpers/url";
class ReportService {
  http = new HttpClient();
  getResolutionWorkOrder(filter = {}) {
    return this.http.get(`${rootUrl}/incident/resolution-work-order/report`, {
      params: filter,
    });
  }
}
export default ReportService;
