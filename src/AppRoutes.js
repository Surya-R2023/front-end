import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import DigitalWorkflow from "./module/digital-workflow";
import PageLoader from "./utils/loader/page-loader";
import MainContainer from "./utils/main-container/main-container";
//import CustomerLogin from "./component/login/customer-login";
//import CustomerLoginService from "./services/customerlogin-service";
import axios from "axios";
import MainContainerTwo from "./utils/main-container/main-container-2";
import { message } from "antd";
// import SpareParts from "./module/spare-parts";
import LoginService from "./services/login-service";
import ProductVerification from "./module/spare-parts/product-verification/product-verification";
import ManagementConsole from "./module/management-console";

const Login = lazy(() => import("./component/login/login"));
const Configuration = lazy(() => import("./module/configurations"));
const DigitalAudit = lazy(() => import("./module/digital-audit"));
const FireIncident = lazy(() => import("./module/fire-incident"));

const PreventiveMaintenance = lazy(() =>
  import("./module/preventive-maintenance")
);
const RemoteMonitoring = lazy(() => import("./module/remote-monitoring"));
const EnergyConsumption = lazy(() => import("./module/energy"));
const SpareParts = lazy(() => import("./module/spare-parts"));

axios.interceptors.request.use((config) => {
  const loginService = new LoginService();
  if (loginService.getToken()) {
    config.headers.common[
      "Authorization"
    ] = `Bearer ${loginService.getToken()}`;
  }
  config.headers.common["Content-Type"] = "application/json";
  config.headers.common["Accept"] = "application/json";
  // console.log(config);
  return config;
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401) {
      const loginService = new LoginService();
      if (loginService.getToken()) loginService.logout();
      window.location = "login?msg=Login and try again";
    } else if (error.response.status == 403) {
      const loginService = new LoginService();
      if (loginService.getToken()) loginService.logout();
    } else {
      message.error(error.response?.data?.message ?? error.message);
    }

    return Promise.reject(error);
  }
);
const AppRoutes = (props) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            path="product/verification/:id"
            element={<ProductVerification />}
          />
          <Route path="" element={<MainContainerTwo />}>
            <Route path="configuration/*" element={<Configuration />} />
            <Route path="digital-workflow/*" element={<DigitalWorkflow />} />
            <Route path="inspection-management/*" element={<DigitalAudit />} />
            <Route path="fire-incident/*" element={<FireIncident />} />
            <Route path="spare-parts/*" element={<SpareParts />} />
            <Route
              path="management-console/*"
              element={<ManagementConsole />}
            />
            <Route
              path="preventive-maintenance/*"
              element={<PreventiveMaintenance />}
            />

            <Route path="remote-monitoring/*" element={<RemoteMonitoring />} />
            <Route
              path="real-time-energy-insights/*"
              element={<EnergyConsumption />}
            />
            <Route path="spare-parts/*" element={<SpareParts />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRoutes;
