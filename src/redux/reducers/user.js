import { createSlice } from "@reduxjs/toolkit";
import store from "store2";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    accessToken: store.get("accessToken"),
  },
  reducers: {
    saveUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return {
        name: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        email: "",
        accessToken: null,
      };
    },
  },
});

export const { saveUser, resetUser } = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const saveUserl = (user) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const user = (state) => state.user;

export default userSlice.reducer;
