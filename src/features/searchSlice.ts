import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BusStation, Station } from "../type";
import storage from "redux-persist/lib/storage";

interface SearchResult {
  data: Station[];
  timestamp: number;
}

interface SearchState {
  searchKeyword: string;
  searchAllKeyword: string[];
  searchResults: Record<string, SearchResult>;
}

const initialState: SearchState = {
  searchKeyword: "",
  searchAllKeyword: [],
  searchResults: {},
};

export const searchPersistConfig = {
  key: "root",
  storage,
  whitelist: ["searchKeyword", "searchAllKeyword", "searchResults"],
  blacklist: ["error"],
  expire: 48 * 60 * 60 * 1000, //48시간
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    setSearchAllKeyword: (state, action: PayloadAction<string>) => {
      const newSearchKeyword: string = action.payload;
      if (
        !state.searchAllKeyword.includes(newSearchKeyword) &&
        newSearchKeyword !== ""
      ) {
        state.searchAllKeyword.push(newSearchKeyword);
      }
    },

    setSearchResults: (
      state,
      action: PayloadAction<{ keyword: string; data: Station[] }>
    ) => {
      const { keyword, data } = action.payload;
      const timestamp = Date.now();
      state.searchResults[keyword] = { data, timestamp };
    },

    removeSearchResults: (state, action: PayloadAction<string>) => {
      const keyword = action.payload;
      const newSearchResults = { ...state.searchResults };
      delete newSearchResults[keyword];
      state.searchResults = { ...newSearchResults };
    },
  },
});

export const {
  setSearchKeyword,
  setSearchAllKeyword,
  setSearchResults,
  removeSearchResults,
} = searchSlice.actions;
export default searchSlice.reducer;
