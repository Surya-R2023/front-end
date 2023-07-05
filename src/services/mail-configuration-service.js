import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class MailConfigurationService extends CrudService{
    url=`${rootUrl}/email`;
}
export default MailConfigurationService;