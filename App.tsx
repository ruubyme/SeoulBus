import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "./component/Main";
import "./index.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SearchList from "./component/SearchList";
import { BusStationPage } from "./component/BusStationPage";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<SearchList />} />
          <Route path="/busStation" element={<BusStationPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
);
