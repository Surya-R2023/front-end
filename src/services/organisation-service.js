import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class OrganisationService extends CrudService{
    url=`${rootUrl}/organisation`;

}
export default OrganisationService;