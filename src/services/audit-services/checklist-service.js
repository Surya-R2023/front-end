import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";
class CheckListService extends CrudService {
  url = `${rootUrl}/audit/check-list`;
}
export default CheckListService;
