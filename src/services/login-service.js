import HttpClient from "./http";
import { rootUrl } from "../helpers/url";
class LoginService {
  http = new HttpClient();
  login(data) {
    return this.http.post(`${rootUrl}/sign-in`, data);
  }
  saveToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  saveUserName(name) {
    localStorage.setItem("uName", name);
  }
  getUserName() {
    return localStorage.getItem("uName");
  }
  logout() {
    localStorage.removeItem("uName");
    localStorage.removeItem("token");
  }
}

export default LoginService;
