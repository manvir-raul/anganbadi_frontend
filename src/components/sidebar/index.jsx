import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Links from "./links";

import "./style.scss";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  useEffect(() => {
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  return (
    <div
      className={`sidebar bg-slate-800 lg:w-20 lg:sidebar-expanded:!w-64 transition-all duration-200 ease-in-out`}
    >
      <div className="sidebar-header">
        <NavLink end to="/dashboard" className="block">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <defs>
              <linearGradient
                x1="28.538%"
                y1="20.229%"
                x2="100%"
                y2="108.156%"
                id="logo-a"
              >
                <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                <stop stopColor="#A5B4FC" offset="100%" />
              </linearGradient>
              <linearGradient
                x1="88.638%"
                y1="29.267%"
                x2="22.42%"
                y2="100%"
                id="logo-b"
              >
                <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                <stop stopColor="#38BDF8" offset="100%" />
              </linearGradient>
            </defs>
            <rect fill="#6366F1" width="32" height="32" rx="16" />
            <path
              d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
              fill="#4F46E5"
            />
            <path
              d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
              fill="url(#logo-a)"
            />
            <path
              d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
              fill="url(#logo-b)"
            />
          </svg>
        </NavLink>
      </div>
      <div className="sidebar-content">
        {" "}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6 "
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>
          </div>
          {/* More group */}
          <div>
            <ul className="mt-3">
              <Links
                title="Dashboard"
                options={[{ linkName: "main", path: "/dashboard" }]}
                setSidebarExpanded={setSidebarExpanded}
              />
              <Links
                title="Inhabitant"
                sidebar-expanded
                options={[{ linkName: "List", path: "inhabitant/list" }]}
                setSidebarExpanded={setSidebarExpanded}
              />
            </ul>
          </div>
        </div>
      </div>

      {/* Expand / collapse button */}
      <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
        <div className="px-3 py-2">
          <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
            <span className="sr-only">Expand / collapse sidebar</span>
            <svg
              className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
              viewBox="0 0 24 24"
            >
              <path
                className="text-slate-400"
                d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
              />
              <path className="text-slate-600" d="M3 23H1V1h2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
