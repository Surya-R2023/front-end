import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class CameraService extends CrudService{
    
    url=`${rootUrl}/camera`;

}
export default CameraService;