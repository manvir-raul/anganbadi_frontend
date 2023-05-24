import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    errorModal: {
      isOpen: false,
      message: "",
    },
  },
  reducers: {
    openErrorModal: (state, action) => {
      return { ...state, errorModal: action.payload };
    },
  },
});

export const { openErrorModal } = commonSlice.actions;

export default commonSlice.reducer;
