import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class PlantService extends CrudService{
    url=`${rootUrl}/customer`

}
export default PlantService;