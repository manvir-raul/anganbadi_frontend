import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/reducers/user";
import commonReducer from "../redux/reducers/common";

export default configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer,
  },
});
