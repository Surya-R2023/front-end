import { rootUrl } from "../helpers/url";
import CrudService from "./crud-service";

class ComponentService extends CrudService {
  url = `${rootUrl}/component`;
}
export default ComponentService;
