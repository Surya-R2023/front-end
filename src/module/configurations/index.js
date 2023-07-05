import { Navigate, Route, Routes } from "react-router-dom";
import ConfigurationDashboard from "./dashboard/dashboard";
import Role from "./role/role";
import User from "./user/user";
import Organisation from "./organisation/organisation";
import Plant from "./plant/plant";
import AssetLibraryForm from "./asset-library/asset-library-form";
import AssetLibrary from "./asset-library/asset-library";
import PlantForm from "./plant/plantform";
import Gateway from "./gateway/gateway";
import Asset from "./asset/asset";
import AssetForm from "./asset/asset-form";
import Continent from "./continent/continent";
import Country from "./country/country";
import State from "./state/state";
import PreviewAsset from "./asset/preview";
import Preview from "./asset-library/preview";
import Menu from "./menu/menu";
import OrganisationHierarchyLevel from "./org-hierarchy-level/org-hierarchy-level";
import OrganisationHierarchy from "./org-hierarchy/org-hierarchy";
import MenuContainer from "../../utils/main-container/menu-container";
import FloorView from "./floorview/floor-view";
import Camera from "./cameraconfiguration/camera";
import FloorForm from "./floor/floor-form";
import CameraFrame from "./cameraframe/cameraframe";
import Component from "./component/component";
import SmsAndMailConfiguration from "./sms-configuration/sms-config";
import AccessSettings from "./access-settings/access-settings";
import Color from "../configurations/color/color";
import OrganisationHierarchy1 from "./organisation-hierarchy/organisation-hierarchy"
import Organisationstructure from "./organisationstructure/organisationstructure";
const AssetConfigurations = (props) => {
  return (
    <Routes>
      <Route path="" element={<MenuContainer />}>
        <Route index element={<Navigate to="asset-configuration" />} />
        <Route path="asset-configuration" element={<ConfigurationDashboard />} />
        <Route path="access-settings" element={<AccessSettings />} />
        <Route path="role" element={<Role />} />
        <Route path="user" element={<User />} />
        <Route path="organisation" element={<Organisation />} />
        <Route path="floor-view" element={<FloorView />} />
        <Route path="camera" element={<Camera />} />
        <Route path="gateway" element={<Gateway />} />
        <Route path="region" element={<Continent />} />
        <Route path="country" element={<Country />} />
        <Route path="state" element={<State />} />
        <Route path="menu" element={<Menu />} />
        <Route path="floor-form" element={<FloorForm />} />
        <Route path="cameraframe" element={<CameraFrame />} />
        <Route path="component" element={<Component />} />
        <Route path="smsconfiguration" element={<SmsAndMailConfiguration />} />
        <Route path="color/*" element={<Color />} />
        <Route
          path="orghierarchylevel"
          element={<OrganisationHierarchyLevel />}
        />
           <Route path="organisationstructure" element={<Organisationstructure />} />
        <Route path="orghierarchy" element={<OrganisationHierarchy />} />
        <Route path="organisation1" element={<OrganisationHierarchy1 />} />
        <Route path="plant">
          <Route index element={<Plant />} />
          <Route path="add" element={<PlantForm mode="Add" />} />
          <Route path="add/:id" element={<PlantForm mode="Add" />} />
          <Route path="view/:id" element={<PlantForm mode="View" />} />

          <Route path="update/:id" element={<PlantForm mode="Edit" />} />
        </Route>
        <Route path="asset-library">
          <Route index element={<AssetLibrary />} />
          <Route path="add" element={<AssetLibraryForm mode="Add" />} />
          <Route path="add/:id" element={<AssetLibraryForm mode="Add" />} />
          <Route path="view/:id" element={<Preview mode="View" />} />
          <Route path="update/:id" element={<AssetLibraryForm mode="Edit" />} />
        </Route>
        <Route path="asset">
          <Route index element={<Asset />} />
          <Route path="add" element={<AssetForm mode="Add" />} />
          <Route path="add/:id" element={<AssetForm mode="Add" />} />
          <Route path="view/:id" element={<PreviewAsset mode="View" />} />
          <Route path="update/:id" element={<AssetForm mode="Edit" />} />
        </Route>

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default AssetConfigurations;
