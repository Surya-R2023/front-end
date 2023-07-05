import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class ContinentService extends CrudService{
    url=`${rootUrl}/continent`;
}
export default ContinentService