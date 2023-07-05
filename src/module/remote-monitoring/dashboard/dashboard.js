import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const menuList = useSelector((state) => state.loggedReducer.menuList);
  const fireIndex = menuList.findIndex(
    (e) => e.path === "remote-monitoring/fire-dashboard"
  );
  const assetIndex = menuList.findIndex(
    (e) => e.path === "remote-monitoring/pump-dashboard"
  );
  const nav = () => {
    if (fireIndex !== -1) return <Navigate to="../fire-dashboard" />;
    else if (assetIndex !== -1) return <Navigate to="../pump-dashboard" />;
    else return <></>;
  };
  return <>{nav()}</>;
}

export default Dashboard;
