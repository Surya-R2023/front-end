import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class GatewayService extends CrudService{
    url=`${rootUrl}/mqtt-config`;
   
}
export default GatewayService;