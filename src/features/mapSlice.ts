import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

interface mapState {
  kakaoMap: any;
  marker: any;
}

const initialState: mapState = {
  kakaoMap: null,
  marker: null,
};

export const mapPersistConfig = {
  key: "root",
  storage,
  initialState,
  whitelist: ["kakaoMap", "marker"],
  blacklist: ["error"],
  expire: 48 * 60 * 60 * 1000, //48시간,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<any>) => {
      state.kakaoMap = action.payload;
    },
    setMarker: (state, action: PayloadAction<any>) => {
      state.marker = action.payload;
    },
  },
});

export const { setMap, setMarker } = mapSlice.actions;
export default mapSlice.reducer;
