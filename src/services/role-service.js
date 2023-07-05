import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class RoleService extends CrudService{
    url=`${rootUrl}/role`;
}
export default RoleService;