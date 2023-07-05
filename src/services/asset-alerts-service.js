import { rootUrl } from "../helpers/url";
import CrudService from "./crud-service";

class AssetAlertsService extends CrudService {
  url = `${rootUrl}/alert`;
}
export default AssetAlertsService;
