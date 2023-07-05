import { Navigate, Route, Routes } from "react-router-dom";
import MenuContainer from "../../utils/main-container/menu-container";
import SparePartsDashboard from "./spare-parts-dashboard/spare-parts-dashboard";
import ProductVerification from "./product-verification/product-verification";
import SuggestionConfiguration from "./suggestion-configuration/suggestion-configuration";
import SparePart from "./spare-parts-configuration/spare-part";

const SpareParts = (props) => {
  return (
    <Routes>
      <Route path="" element={<MenuContainer />}>
        <Route index element={<Navigate to="spare-part" />} />
        <Route path="configuration" element={<SparePart />} />
        <Route path="dashboard" element={<SparePartsDashboard />} />
        <Route path="product-verification" element={<ProductVerification />} />
        <Route
          path="suggestion-configuration"
          element={<SuggestionConfiguration />}
        />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default SpareParts;
