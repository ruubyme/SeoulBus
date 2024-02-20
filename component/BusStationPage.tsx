import { useQuery, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import {
  getAllBusRoutesForStation,
  getArrInfoByRouteList,
  getStationOrd,
} from "../api";
import { Station } from "../src/type";
import { BusArriveList } from "./BusArriveList";
import { useEffect } from "react";

export const BusStationPage: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const { stId, stNm, arsId }: Station = state;
  const queryClient = useQueryClient();
  const { data: busRouteList, isLoading: isLoadingBusRoute } = useQuery(
    ["busRouteList"],
    () => getAllBusRoutesForStation(arsId)
  );
  const { data: busStationSeqList, isLoading: isLoadingBusStationSeqList } =
    useQuery(
      ["busStationSeqList", busRouteList],
      async () => {
        const busStationList = await Promise.all(
          busRouteList?.map(async (item) => {
            const { seq, nextStationNm } = await getStationOrd(
              item.busRouteId,
              arsId
            );
            return { ...item, seq, stId, nextStationNm, stNm, arsId };
          }) || []
        );
        return busStationList;
      },
      { enabled: !!busRouteList }
    );

  const { data: busArriveList, isLoading: isLoadingBussArriveList } = useQuery(
    ["busArrive"],
    async () => {
      const busArrList = await Promise.all(
        busStationSeqList?.map(async (item) => {
          const { arrmsg1, arrmsg2 } = await getArrInfoByRouteList(
            item.busRouteId,
            item.stId,
            item.seq
          );
          return { ...item, arrmsg1, arrmsg2 };
        }) || []
      );
      return busArrList;
    },
    { enabled: !!busStationSeqList }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="h-screen">
        <div className="h-1/5 flex flex-col justify-center bg-gray-400">
          <p className="text-center text-lg text-white">{arsId}</p>
          <p className="text-center text-white text-xl">{stNm}</p>
        </div>
        {isLoadingBusRoute ||
        isLoadingBusStationSeqList ||
        isLoadingBussArriveList ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin w-10 h-10 rounded-full border-t-2 border-blue-500"></div>
          </div>
        ) : (
          <BusArriveList busArriveList={busArriveList} />
        )}
      </div>
    </div>
  );
};