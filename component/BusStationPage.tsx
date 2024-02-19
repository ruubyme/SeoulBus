import { useQuery, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import {
  getAllBusRoutesForStation,
  getArrInfoByRouteList,
  getStationOrd,
} from "../api";
import { Station } from "../src/type";
import { BusArriveList } from "./BusArriveList";

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

  return (
    <div>
      {isLoadingBusRoute ||
      isLoadingBusStationSeqList ||
      isLoadingBussArriveList ? (
        <p>로딩 중 ...</p>
      ) : (
        <div className="h-screen">
          <div className="h-1/5 flex flex-col justify-center bg-gray-400">
            <p className="text-center text-lg text-white">{arsId}</p>
            <p className="text-center text-white text-xl">{stNm}</p>
          </div>
          <BusArriveList busArriveList={busArriveList} />
        </div>
      )}
    </div>
  );
};
