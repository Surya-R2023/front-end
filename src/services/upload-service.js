import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class UploadService extends CrudService {
  url = `${rootUrl}/upload`;
  parameterUpload(file, id) {
    let formData = new FormData();
    formData.append("file", file);
    return this.http.post(
      `${this.url}/assetParameter-upload?id=${id}`,
      formData
    );
  }
  alertUpload(file, id) {
    let formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.url}/assetAlert-upload?id=${id}`, formData);
  }
}
export default UploadService;
