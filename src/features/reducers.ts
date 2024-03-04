import { combineReducers } from "@reduxjs/toolkit";
import SearchSlice, { searchPersistConfig } from "./searchSlice";
import busArrivalInfoSlice from "./busArrivalInfoSlice";
import { persistReducer, persistStore } from "redux-persist";
import searchSlice from "./searchSlice";

export const rootReducer = combineReducers({
  search: persistReducer(searchPersistConfig, searchSlice),
  busArrivalInfo: busArrivalInfoSlice,
});
