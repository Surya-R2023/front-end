import CrudService from "../crud-service";
import { rootUrl } from "../../helpers/url";
class ProductService extends CrudService {
  url = `${rootUrl}/product`;

  productVerification(id) {
    return this.http.post(`${this.url}/product`, {
      alertId: id,
    });
  }
}
export default ProductService;
