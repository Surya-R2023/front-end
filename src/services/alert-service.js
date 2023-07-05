import { rootUrl } from "../helpers/url";
import CrudService from "./crud-service";

class AlertService extends CrudService {
  url = `${rootUrl}/alerts`;
}
export default AlertService;
