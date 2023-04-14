import { useEffect, useState } from "react";
import axios from "axios";
import { getArrInfoByRouteList, getStaionsByRouteList } from "./api";

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
    nextStationName: string | ""; //다음정류소 이름
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

  const getResult = async (busStation: BusInfo[], index: number) => {
    const result = await getArrInfoByRouteList(busStation);
    const nextStation = await getStaionsByRouteList(busStation);
    console.log(nextStation);
    const busResultArr: BusResult[] = result.flatMap(
      (obj: BusResult, idx: number) => {
        const { arrmsg1, arrmsg2, arsId, rtNm, stNm, routeType } = obj;
        const nextStationName = nextStation[idx];
        console.log(nextStationName);
        return {
          arrmsg1,
          arrmsg2,
          arsId,
          rtNm,
          stNm,
          routeType,
          nextStationName,
        };
      }
    );
    setBusResult(busResultArr);

    setBusResultList((prevBusResultList) => {
      const newList = [...prevBusResultList];
      newList[index] = busResultArr;
      return newList;
    });

    console.log(busResultList);
    //console.log(nextStation);
  };

  useEffect(() => {
    busStaions.forEach((busStaion, index) => {
      getResult(busStaion, index);
    });
  }, [busResult]);

  return (
    <>
      <div>
        {busResultList.map((busResults, index) => {
          const stationName = busResults[0].stNm;
          const nextStationName = busResults[0].nextStationName;
          const busInfoList = busResults.map((busResult) => {
            return (
              <li key={busResult.rtNm}>
                {busResult.rtNm}: {busResult.arrmsg1} / {busResult.arrmsg2}
              </li>
            );
          });

          return (
            <div key={index} className="bg-zinc-50">
              <h2 className="text-xl">{stationName}</h2>
              <h2 className="text-lg text-gray-400">{nextStationName}</h2>
              <ul>{busInfoList}</ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

export { App };
