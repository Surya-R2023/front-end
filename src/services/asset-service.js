import { rootUrl } from "../helpers/url";
import CrudService from "./crud-service";


class AssetService extends CrudService {
  url = `${rootUrl}/asset`;
  publish(id) {
    return this.http.post(`${this.url}/publish/${id}`, {});
  }
  image(file, id) {
    let formData = new FormData();
    formData.append("image", file);
    return this.http.post(`${this.url}/image/${id}`, formData);
  }
  addwarranty() {
    return this.http.post(`${this.url}/add-warranty`,);
  }
}
export default AssetService;
