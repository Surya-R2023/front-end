import CrudService from "./crud-service";
// import { rootUrl } from "../helpers/url";
import { rootUrl } from "../helpers/url";
class NewsUpdateService extends CrudService {
  url = `${rootUrl}/newsUpdate`;
}
export default NewsUpdateService;
