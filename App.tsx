import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "./src/component/Main";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SearchList from "./src/component/SearchList";
import { BusStationPage } from "./src/component/BusStationPage/BusStationPage";
import { store } from "./src/stores/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import NearbyStationPage from "./src/component/NearbyStationPage/NearbyStationPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/search" element={<SearchList />} />
              <Route path="/busStation" element={<BusStationPage />} />
              <Route path="/nearbyStation" element={<NearbyStationPage />} />
            </Routes>
            {/* <ReactQueryDevtools initialIsOpen={true} /> */}
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </QueryClientProvider>
);
