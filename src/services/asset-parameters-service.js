import { rootUrl } from "../helpers/url";
import CrudService from "./crud-service";

class AssetParametersService extends CrudService {
  url = `${rootUrl}/parameter`;
}
export default AssetParametersService;
