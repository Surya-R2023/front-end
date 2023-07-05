import CrudService from "./crud-service";
import { rootUrl } from "../helpers/url";
class UploadDownloadService extends CrudService {
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

  organisationUpload(file, orgName) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("organisationName", orgName);
    return this.http.post(`${this.url}/management-upload`, formData);
  }

  download(url) {
   
    return this.http.get(url, {
      responseType: "blob",
      headers: {
        Accept: '*/*'
      },
     
    });
  }

}
export default UploadDownloadService;
