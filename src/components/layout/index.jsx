import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../sidebar";
import Header from "../header";
import Listing from "../../containers/inhabitant/listing";
import "./style.scss";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
