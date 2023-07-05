import { rootUrl } from "../helpers/url";
import CrudService from "./crud-service";

class AssetLibraryService extends CrudService {
  url = `${rootUrl}/asset-library`;
  publish(id) {
    return this.http.post(`${this.url}/publish/${id}`, {});
  }
}
export default AssetLibraryService;
