import { rootUrl } from "../helpers/url";
import HttpClient from "./http";

class AlertsService {
  url = `${rootUrl}/alerts`;
  http = new HttpClient();
  alerts() {
    return this.http.get(`${this.url}/alerts`, {
      params: { closed: false },
    });
  }
  confirmation(id, confirmation) {
    return this.http.post(`${this.url}/confirmation`, {
      alertId: id,
      confirmation: confirmation,
    });
  }
  acknowledgement(id) {
    return this.http.post(`${this.url}/acknowledgement`, {
      alertId: id,
    });
  }
  report(filter={}) {
    return this.http.get(`${this.url}/alerts/report`, {
      params: filter,
    });
  }
}
export default AlertsService;
