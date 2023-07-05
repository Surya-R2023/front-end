import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./home/home";
import ParameterReport from "./parameter-report/parameter-report";
import CameraView from "./monitoring/camera-view";
import FloorView from "./floor-view/floor-view";
import MenuContainer from "../../utils/main-container/menu-container";
import AssetList from "./asset-list/asset-list";
import RtspView from "./rtsp-view/rtsp-view";
import BuildingDetail from "./building-detail/building-detail";
import AlertReport from "./alert-report/alert-report";
import AlertList from "./alert-list/alert-list";
import CardDesign from "./carddesign/card-design";
import Home2 from "./home-2/home-2";
import Home3 from "./home-3/home-3";
import AssetMonitoring from "./asset-monitoring/monitoring";
import AssetMonitoringParameters2 from "./asset-monitoring-2/monitoring-2";
import AlertListReport from "./alert-list-report/alert-list-report";
import Triga from "./triga/triga";
import Dashboard from "./dashboard/dashboard";
import Email from "./email/email";
import SideMenu from "../../utils/main-container/SideMenu";

const RemoteMonitoring = (props) => {
  return (
    <Routes>
      <Route path="" element={<MenuContainer />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="fire-monitoring"
          element={<AssetMonitoringParameters2 />}
        />
        <Route path="monitoring" element={<AssetMonitoring />} />
        <Route path="remote monitoring" element={<RemoteMonitoring />} />
        <Route path="camera-view" element={<CameraView />} />
        <Route path="building-view" element={<Triga />} />w
        <Route path="floor-view" element={<FloorView />} />
        <Route path="asset-list" element={<AssetList />} />
        <Route path="fire-dashboard" element={<Home />} />
        <Route path="pump-dashboard" element={<Home2 />} />
        <Route path="map-dashboard" element={<Home3 />} />

        <Route path="alert-report" element={<AlertReport />} />
        <Route path="fire-alerts" element={<AlertList mode="fire" />} />
        <Route path="asset-alerts" element={<AlertList mode="asset" />} />
        <Route path="rtsp-view" element={<RtspView />} />
        <Route path="parameter-report" element={<ParameterReport />} />
        <Route path="building-detail" element={<BuildingDetail />} />
        <Route path="card-design" element={<CardDesign />} />
        <Route path="alert-list-report" element={<AlertListReport />} />
        <Route path="email" element={<Email />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default RemoteMonitoring;
