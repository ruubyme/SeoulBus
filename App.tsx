import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "./src/component/Main";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SearchList from "./src/component/SearchList";
import { BusStationPage } from "./src/component/BusStationPage/BusStationPage";
import { store } from "./src/stores/store";
import { Provider } from "react-redux";
import { rootReducer } from "./src/features/reducers";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import NearbyStationPage from "./src/component/NearbyStationPage/NearbyStationPage";

const queryClient = new QueryClient();

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/search" element={<SearchList />} />
              <Route path="/busStation" element={<BusStationPage />} />
              <Route path="/nearbyStation" element={<NearbyStationPage />} />
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
