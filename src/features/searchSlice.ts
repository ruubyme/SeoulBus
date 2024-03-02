import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BusStation, Station } from "../type";

interface SearchState {
  searchKeyword: string;
  searchAllKeyword: string[];
  searchResults: Record<string, Station[]>;
}

const initialState: SearchState = {
  searchKeyword: "",
  searchAllKeyword: [],
  searchResults: {},
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
      if (!state.searchAllKeyword.includes(newSearchKeyword)) {
        state.searchAllKeyword.push(newSearchKeyword);
      }
    },

    setSearchResults: (
      state,
      action: PayloadAction<{ keyword: string; data: Station[] }>
    ) => {
      const { keyword, data } = action.payload;
      state.searchResults[keyword] = data;
    },
  },
});

export const { setSearchKeyword, setSearchAllKeyword, setSearchResults } =
  searchSlice.actions;
export default searchSlice.reducer;
