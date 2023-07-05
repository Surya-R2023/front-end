import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class CategoryService extends CrudService{
    url=`${rootUrl}/category`

}
export default CategoryService;