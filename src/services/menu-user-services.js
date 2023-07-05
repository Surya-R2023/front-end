import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class MenuUserService extends CrudService{
    url=`${rootUrl}/menu`

}
export default MenuUserService;