import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";
class ProductFileService extends CrudService {
  url = `${rootUrl}/product-file`;
}
export default ProductFileService;
