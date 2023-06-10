import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/App";
import "./styles/style.scss";
import store from "./redux/store";
import { Provider } from "react-redux";
import DangerModal from "./components/modal/danger";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <DangerModal />
      <App />
    </Provider>
  </React.StrictMode>
);
