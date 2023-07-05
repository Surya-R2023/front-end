import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";
class WorkOrderVerifyService extends CrudService {
  url = `${rootUrl}/incident/resolution-work-order/verify`;
}
export default WorkOrderVerifyService;
