import "./App.less";
import "./App.css";
import store from "./store/store";
import { Provider } from "react-redux";
import AppRoutes from "./AppRoutes";
import "antd/dist/reset.css";
import "./index.css";
import { ConfigProvider } from "antd";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { primary } from "./helpers/color";
library.add(fas);
function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primary,
        },
        components: {
          Table: {
            token: {
              tableHeaderBg: "transparent",
              tableHeaderCellSplitColor: "#000000",
            },
          },
        },
      }}
    >
      <Provider store={store}>
        <AppRoutes test-id="routes" />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
