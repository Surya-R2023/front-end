import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";

class CheckService extends CrudService {
  url = `${rootUrl}/incident/check`;
}
export default CheckService;
