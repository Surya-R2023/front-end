import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class FloorService extends CrudService{

  url=`${rootUrl}/floor`

}
export default FloorService;