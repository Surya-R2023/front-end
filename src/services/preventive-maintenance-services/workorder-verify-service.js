import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";
class WorkOrderVerifyService extends CrudService {
  url = `${rootUrl}/preventive-maintenance/resolution-work-order/verify`;
}
export default WorkOrderVerifyService;
