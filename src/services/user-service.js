import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class UserService extends CrudService {
  url = `${rootUrl}/user`;
}
export default UserService;
