import React from "react";
import ReactDOM from "react-dom/client";
import App from "./containers/App";
import "./styles/index.scss";
import "./css/style.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import DangerModal from "./components/modal/danger";
import AddInhabitantModel from "./containers/inhabitant/components/addUser";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <DangerModal />
      <App />
    </Provider>
  </React.StrictMode>
);
