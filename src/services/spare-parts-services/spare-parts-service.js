import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";
class InquireService extends CrudService {
  url = `${rootUrl}/inquire`;

  product() {
    return this.http.get(`${this.url}/dashboard`, {
      params: { closed: false },
    });
  }
}
export default InquireService;
