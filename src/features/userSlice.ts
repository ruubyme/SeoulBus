import storage from "redux-persist/lib/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Station } from "../type";

interface UserState {
  bookmarks: Station[];
}

const initialState: UserState = {
  bookmarks: [],
};

export const userPersistConfig = {
  key: "root",
  storage,
  whitelist: ["bookmarks"],
  blacklist: ["error"],
  expire: 48 * 60 * 60 * 1000, //48시간
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBookmarks: (state, action) => {
      state.bookmarks = action.payload;
    },
    addBookmark: (state, action) => {
      state.bookmarks = [...state.bookmarks, action.payload];
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (station) => station.stId !== action.payload
      );
    },
  },
});

export default userSlice.reducer;
export const { setBookmarks, addBookmark, removeBookmark } = userSlice.actions;
