import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";

class WorkOrderResolutionService extends CrudService {
  url = `${rootUrl}/preventive-maintenance/resolution-work-order`;

  reject(data) {
    return this.http.post(`${this.url}/reject`, data);
  }
  approve(data) {
    return this.http.post(`${this.url}/approve`, data);
  }
  closed(data) {
    return this.http.post(`${this.url}/close`, data);
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
export default WorkOrderResolutionService;
