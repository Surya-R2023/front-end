import { rootUrl } from "../helpers/url";
import CrudService from "./crud-service";

class ColorService extends CrudService {
  url = `${rootUrl}/colorMaster`;
}
export default ColorService;