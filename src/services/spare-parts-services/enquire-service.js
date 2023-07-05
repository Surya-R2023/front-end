import { rootUrl } from "../../helpers/url";
import HttpClient from "../http";
class EnquireService {
  url = `${rootUrl}/inquire`;
  constructor() {
    this.http = new HttpClient();
  }
  list(filter = {}) {
    return this.http.get(this.url, { params: filter });
  }
  pending() {
    return this.http.get(`${this.url}/dashboard`);
  }
  dispatch(inquireId) {
    return this.http.post(`${this.url}/deliver`, {
      inquireId: inquireId,
    });
  }
}
export default EnquireService;
