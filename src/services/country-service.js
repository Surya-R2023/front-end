import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class CountryService extends CrudService{
    url=`${rootUrl}/country`;
}
export default CountryService;