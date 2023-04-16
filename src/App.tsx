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
              <li key={busResult.rtNm} className="flex justify-start">
                <div
                  className={
                    busResult.routeType === "2" || busResult.routeType === "4"
                      ? "text-green-500 flex items-center w-40"
                      : busResult.routeType === "3"
                      ? "text-blue-500 flex items-center w-40"
                      : ""
                  }
                >
                  {busResult.rtNm}
                </div>
                <div className="flex flex-col ml-10">
                  <div>{busResult.arrmsg1}</div>
                  <div>{busResult.arrmsg2}</div>
                </div>
              </li>
            );
          });

          return (
            <div key={index} className="bg-zinc-50 divide-y my-1 pl-2 py-1">
              <div>
                <div className="text-lg">{stationName}</div>
                <div className="text-m text-gray-400">{nextStationName}</div>
              </div>
              <div>
                <ul className="divide-y">{busInfoList}</ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export { App };
