import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class SmsAndMailConfigurationService extends CrudService{
    url=`${rootUrl}/country`;
}
export default SmsAndMailConfigurationService;