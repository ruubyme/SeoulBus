import { useEffect, useState } from "react";
import axios from "axios";
import { getArrInfoByRouteList } from "./api";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  //const arsIds: string[] = ["19317", "19192"];

  interface BusInfo {
    stId: string;
    busRouteId: string;
    ord: string;
  }

  const busInfos: BusInfo[] = [
    { stId: "118000225", busRouteId: "118900006", ord: "29" },
    { stId: "118000225", busRouteId: "100100094", ord: "94" },
  ];

  const getResult = async () => {
    const result = await getArrInfoByRouteList(busInfos);
    console.log(result);
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <div className="App">
      <h1>Vite + React</h1>
    </div>
  );
}

export { App };
