import CrudService from "../crud-service";
import HttpClient from "../http";
import { rootUrl } from "../../helpers/url";
class ReportService {
  http = new HttpClient();
  getResolutionWorkOrder(filter = {}) {
    return this.http.get(
      `${rootUrl}/preventive-maintenance/resolution-work-order/report`,
      {
        params: filter,
      }
    );
  }
  status(value) {
    switch (value) {
      case 0:
        return "Opened";
      case 1:
        return "Assigned";
      case 2:
        return "Resolved";
      case 3:
        return "Verified";
      case 4:
        return "Rejected";
      case 5:
        return "Completed";
      default:
        return "";
    }
  }
}
export default ReportService;
