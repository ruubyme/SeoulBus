import storage from "redux-persist/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {}

const initialState: UserState = {};

export const userPersistConfig = {
  key: "root",
  storage,
  whitelist: [""],
  blacklist: ["error"],
  expire: 48 * 60 * 60 * 1000, //48시간
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
