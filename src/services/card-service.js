import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class CardService extends CrudService{
    url=`${rootUrl}/check-list`;
}
export default CardService;
