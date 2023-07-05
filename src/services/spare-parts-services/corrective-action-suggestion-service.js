import HttpClient from "../http";
import { rootUrl } from "../../helpers/url";
class CorrectiveActionSuggestionService {
  url = `${rootUrl}/suggestion-configuration`;
  constructor() {
    this.http = new HttpClient();
  }
  list(filter = {}) {
    return this.http.get(this.url, { params: filter });
  }
}
export default CorrectiveActionSuggestionService;
