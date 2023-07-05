import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MenuContainer from "../../utils/main-container/menu-container";
import EnergyDashboard from "./energy-dashboard/energy-dashboard";
import LiveMonitoring from "./energy-dashboard/live-monitoring";
import AssetEnergy from "./asset-energy/asset-energy";

const EnergyConsumption = (props) => {
  return (
    <Routes>
      <Route path="" element={<MenuContainer />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="energy-consumption" element={<EnergyDashboard />} />
        <Route path="live-monitoring" element={<LiveMonitoring />} />
        <Route path="dashboard" element={<AssetEnergy />} />

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default EnergyConsumption;
