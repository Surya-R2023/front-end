import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";
class CheckListExecutionService extends CrudService {
  url = `${rootUrl}/audit/check-list-execution`;
}
export default CheckListExecutionService;
