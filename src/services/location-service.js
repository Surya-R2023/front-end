import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class LocationService extends CrudService{
    url=`${rootUrl}/location`;

}
export default LocationService;