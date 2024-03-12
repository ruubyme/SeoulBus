import { combineReducers } from "@reduxjs/toolkit";
import { searchPersistConfig } from "./searchSlice";
import { persistReducer } from "redux-persist";
import searchSlice from "./searchSlice";
import userSlice, { userPersistConfig } from "./userSlice";

export const rootReducer = combineReducers({
  search: persistReducer(searchPersistConfig, searchSlice),
  user: persistReducer(userPersistConfig, userSlice),
});
