import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class UserAccessBulkService extends CrudService {
  url = `${rootUrl}/user-access/bulk-add`;
}
export default UserAccessBulkService;
