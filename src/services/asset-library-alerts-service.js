import { rootUrl } from '../helpers/url';
import CrudService from "./crud-service";

class AssetLibraryAlertsService extends CrudService{
    url=`${rootUrl}/asset-library-alert`;

}
export default AssetLibraryAlertsService;