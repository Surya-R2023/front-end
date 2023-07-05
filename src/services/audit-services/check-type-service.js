import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";

class CheckTypeService extends CrudService {
  url = `${rootUrl}/audit/check-type`;
}
export default CheckTypeService;
