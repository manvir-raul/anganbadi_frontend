import React from "react";
import store from "store2";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ErrorPage from "../components/error-page";
import Layout from "../components/layout";
import Listing from "../containers/inhabitant/listing";
import AddInhabitant from "../containers/inhabitant/add-inhabitant";

import Signin from "../containers/auth/sign-in/Signin";
import Signup from "../containers/auth/sign-up/Signup";
import ForgetPassword from "../containers/auth/forget-password";
import Dashboard from "../containers/dashboard";

const router = () => {
  const user = useSelector((state) => state.user);
  const { accessToken } = user;

  return createBrowserRouter([
    {
      path: "/signin",
      element: accessToken ? <Navigate to="/dashboard" /> : <Signin />,
    },
    {
      path: "/signup",
      element: accessToken ? <Navigate to="/dashboard" /> : <Signup />,
    },
    {
      path: "/reset-password",
      element: accessToken ? <Navigate to="/dashboard" /> : <ForgetPassword />,
    },
    {
      path: "/",
      element: !accessToken ? <Navigate to="/signin" /> : <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        {
          path: "inhabitant",
          children: [
            {
              path: "list",
              element: <Listing />,
            },
            {
              path: "add",
              element: <AddInhabitant />,
            },
            {
              path: ":inhabitantID",
              element: <AddInhabitant />,
            },
          ],
        },
      ],
    },
  ]);
};

export default router;
