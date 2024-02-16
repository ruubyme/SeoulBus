import { useEffect, useState } from "react";
import axios from "axios";
import { getArrInfoByRouteList } from "./api";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [busResult, setBusResult] = useState<BusResult[]>([]);
  const [busResultList, setBusResultList] = useState<Array<BusResult[]>>([]);

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

  const busStaions: BusInfo[][] = [
    [
      //영문초등학교
      { stId: "118000225", busRouteId: "118900006", ord: "29" },
      { stId: "118000225", busRouteId: "100100094", ord: "94" },
    ],
    [
      //문래역
      { stId: "118000227", busRouteId: "100100303", ord: "71" },
      { stId: "118000227", busRouteId: "100100289", ord: "17" },
    ],
    [
      //경방타임스퀘어
      { stId: "118000465", busRouteId: "100100601", ord: "20" },
      { stId: "118000465", busRouteId: "100100288", ord: "67" },
      { stId: "118000465", busRouteId: "100100312", ord: "52" },
      { stId: "118000465", busRouteId: "115000010", ord: "37" },
    ],
    [
      //문래힐스테이트
      { stId: "118000515", busRouteId: "100100094", ord: "6" },
      { stId: "118000515", busRouteId: "118900006", ord: "14" },
      { stId: "118000515", busRouteId: "100100303", ord: "68" },
    ],
  ];

  const getResult = async (busStaion: BusInfo[], index: number) => {
    const result = await getArrInfoByRouteList(busStaion);
    const busResultArr: BusResult[] = result.flatMap((bus) => {
      return bus.flatMap((obj: BusResult) => {
        const { arrmsg1, arrmsg2, arsId, rtNm, stNm, routeType } = obj;
        return { arrmsg1, arrmsg2, arsId, rtNm, stNm, routeType };
      });
    });
    setBusResult(busResultArr);

    setBusResultList((prevBusResultList) => {
      const newList = [...prevBusResultList];
      newList[index] = busResultArr;
      return newList;
    });

    console.log(busResultList);
  };

  useEffect(() => {
    busStaions.forEach((busStaion, index) => {
      getResult(busStaion, index);
    });
  }, [busResult]);

  return (
    <>
      <div className="App">
        <h1>버스도착예정시간</h1>
      </div>

      <div>
        {busResultList.map((busResults, index) => {
          const stationName = busResults[0].stNm;
          const busInfoList = busResults.map((busResult) => {
            return (
              <li key={busResult.rtNm}>
                {busResult.rtNm}: {busResult.arrmsg1} / {busResult.arrmsg2}
              </li>
            );
          });

          return (
            <div key={index}>
              <h2>{stationName}</h2>
              <ul>{busInfoList}</ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

export { App };
