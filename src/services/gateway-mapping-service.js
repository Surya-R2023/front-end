import { rootUrl } from "../helpers/url";
import CrudService from "./crud-service";

class GatewayMappingService extends CrudService {
  url = `${rootUrl}/mqtt-config`;
}
export default GatewayMappingService;
