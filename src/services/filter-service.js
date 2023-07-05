import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class FilterService extends CrudService {
  url = `${rootUrl}/filter`;
}
export default FilterService;
