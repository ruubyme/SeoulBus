import { useEffect, useState } from "react";
import axios from "axios";
import { getArrInfoByRouteList } from "./api";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [busResult, setBusResult] = useState<BusResult[]>([]);

  interface BusResult {
    arrmsg1: string;
    arrmsg2: string;
    arsId: string; //정류소번호
    rtNm: string; //버스번호
    stNm: string; //정류소이름
    routeType: string; //버스타입
  }

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
    const busResultArr: BusResult[] = result.flatMap((bus) => {
      return bus.flatMap((obj: BusResult) => {
        const { arrmsg1, arrmsg2, arsId, rtNm, stNm, routeType } = obj;
        return { arrmsg1, arrmsg2, arsId, rtNm, stNm, routeType };
      });
    });
    setBusResult(busResultArr);
    console.log(busResult);
  };

  useEffect(() => {
    getResult();
  }, [busResult]);

  return (
    <>
      <div className="App">
        <h1>버스도착예정시간</h1>
      </div>

      <div>
        {busResult.map((bus, index) => (
          <div key={index}>
            <div>정류소: {bus.stNm} </div>
            <div>버스: {bus.rtNm} </div>
            <div>arrmsg1: {bus.arrmsg1} </div>
            <div>arrmsg2: {bus.arrmsg2} </div>
          </div>
        ))}
      </div>
    </>
  );
}

export { App };
