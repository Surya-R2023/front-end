import CrudService from "../crud-service";
// import { rootUrl } from "../../helpers/url";
import { rootUrl } from "../../helpers/url";

class CheckTypeService extends CrudService {
  url = `${rootUrl}/preventive-maintenance/check-type`;
}
export default CheckTypeService;
