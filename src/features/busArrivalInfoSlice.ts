import { createSlice } from "@reduxjs/toolkit";

export const busArriveInfoSlice = createSlice({
  name: "busArrivalInfo",
  initialState: [],
  reducers: {
    getBusArrivalInfo() {},
  },
});

export default busArriveInfoSlice.reducer;
