import { rootUrl } from '../helpers/url';
import CrudService from "./crud-service";

class AssetLibraryParametersService extends CrudService{
    url=`${rootUrl}/asset-library-parameter`;

}
export default AssetLibraryParametersService;