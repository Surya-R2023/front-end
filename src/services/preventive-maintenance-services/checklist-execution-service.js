import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";
class CheckListExecutionService extends CrudService {
  url = `${rootUrl}/preventive-maintenance/check-list-execution`;
}
export default CheckListExecutionService;
