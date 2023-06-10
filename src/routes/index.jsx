import React, { useEffect } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import store from "store2";
import ErrorPage from "../components/error-page";
import Layout from "../components/layout";
import Listing from "../containers/inhabitant/listing";
import AddInhabitant from "../containers/inhabitant/add-inhabitant";

import Signin from "../containers/auth/sign-in/Signin";
import Signup from "../containers/auth/sign-up/Signup";
import ForgetPassword from "../containers/auth/forget-password";
import Dashboard from "../containers/dashboard";
import Api from "../utils/api";
import { saveUser, resetUser } from "../redux/reducers/user";
import { openErrorModal } from "../redux/reducers/common";

const router = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { accessToken } = user;

  const authenticate = async (token) => {
    try {
      const res = await Api.get("/auth/authenticate");
      dispatch(saveUser(res.data));
    } catch (error) {
      store.set("accessToken", null);
      dispatch(resetUser());
      dispatch(openErrorModal({ isOpen: true, message: error.message }));
    }
  };

  useEffect(() => {
    if (accessToken) authenticate();
  }, []);

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
