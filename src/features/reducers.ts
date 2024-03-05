import { combineReducers } from "@reduxjs/toolkit";
import { searchPersistConfig } from "./searchSlice";
import { persistReducer } from "redux-persist";
import searchSlice from "./searchSlice";

export const rootReducer = combineReducers({
  search: persistReducer(searchPersistConfig, searchSlice),
});
