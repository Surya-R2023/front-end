import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";
class WorkOrderResolveService extends CrudService {
  url = `${rootUrl}/preventive-maintenance/resolution-work-order/resolve`;
}
export default WorkOrderResolveService;
