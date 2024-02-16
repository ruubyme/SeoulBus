import { useQuery, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import {
  getAllBusRoutesForStation,
  getArrInfoByRouteList,
  getStationOrd,
} from "../api";
import { Station } from "../src/type";

export const BusStation: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const { stId, stNm, arsId }: Station = state;
  const queryClient = useQueryClient();
  const { data: busRouteList, isLoading } = useQuery(["busRouteList"], () =>
    getAllBusRoutesForStation(arsId)
  );
  const { data: busStationSeqList } = useQuery(
    ["busStationSeqList"],
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

  const { data: busArriveList } = useQuery(
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
    <>
      <></>
    </>
  );
};
