import { configureStore } from "@reduxjs/toolkit";
import busArriveInfoSlice from "../features/busArrivalInfoSlice";
import searchSlice from "../features/SearchSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    busArrivalInfo: busArriveInfoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
