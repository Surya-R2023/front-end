import { rootUrl } from "../helpers/url";
import CrudService from "./crud-service";

class AddWarrantyService extends CrudService {
  url = `${rootUrl}/add-warranty`;
}
export default AddWarrantyService;
