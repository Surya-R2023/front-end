import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class CheckTypeService extends CrudService {
  url = `${rootUrl}/check-type`;
}
export default CheckTypeService;
