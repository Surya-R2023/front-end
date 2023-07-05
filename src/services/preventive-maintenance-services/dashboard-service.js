import HttpClient from "../http";
import { rootUrl } from "../../helpers/url";
class DashboardService {
  http = new HttpClient();
  dashboard(filter = {}) {
    return this.http.get(
      `${rootUrl}/preventive-maintenance/dashboard`,

      {
        params: filter,
      }
    );
  }
}
export default DashboardService;
