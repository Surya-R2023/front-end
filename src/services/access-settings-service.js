import HttpClient from "./http";
import { rootUrl } from "../helpers/url";
class AccessSettingsService {
  http = new HttpClient();
  list(filter = {}) {
    return this.http.get(`${rootUrl}/access-settings`, {
      params: filter,
    });
  }
  save(data) {
    return this.http.post(`${rootUrl}/access-settings`, data);
  }
}
export default AccessSettingsService;
