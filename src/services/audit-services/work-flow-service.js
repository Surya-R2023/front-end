import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";

class WorkFlowService extends CrudService {
  url = `${rootUrl}/audit/work-flow`;
}
export default WorkFlowService;
