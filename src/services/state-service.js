import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class StateService extends CrudService{
    url=`${rootUrl}/state`;
   
}
export default StateService;