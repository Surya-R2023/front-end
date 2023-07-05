import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class MapIconsDataService extends CrudService {
  url = `${rootUrl}/asset/icon-count`;
}
export default MapIconsDataService;
