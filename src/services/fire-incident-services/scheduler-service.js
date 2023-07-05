import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";
class SchedulerService extends CrudService {
  url = `${rootUrl}/incident/scheduler`;
}
export default SchedulerService;
