import { Bus, BusStation, Station } from "../../type";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getAllBusRoutesForStation,
  getArrInfoByRouteList,
  getStationOrd,
} from "../../../api";
import BookmarkButton from "../BookmarkButton";

const busTypeArray: Record<string, string> = {
  "0": "공용버스",
  "1": "공항버스",
  "2": "마을버스",
  "3": "간선버스",
  "4": "지선버스",
  "5": "순환버스",
  "6": "광역버스",
  "7": "인천버스",
  "8": "경기버스",
  "9": "폐지버스",
};
const busTypeColor: Record<string, string> = {
  "2": "text-green-500",
  "3": "text-blue-500",
  "4": "text-green-500",
  "5": "text-yellow-500",
  "6": "text-red-500",
  "9": "text-gray-500",
};

export const BusArriveItem: React.FC<{ bus: BusStation }> = ({ bus }) => {
  const getBusColor = (busRouteType: string) => {
    return busTypeColor[busRouteType] || "gray";
  };

  return (
    <li className="flex pl-2 py-2 border-b">
      <div className="w-60">
        <p className={`text-lg ${getBusColor(bus.busRouteType)}`}>
          {bus.busRouteNm}
        </p>
        <p className="text-sm text-gray-500">{bus.nextStationNm || "종점"}</p>
      </div>
      <div>
        <p className="text-sm">{bus.arrmsg1}</p>
        <p className="text-sm">{bus.arrmsg2}</p>
      </div>
    </li>
  );
};

export const BusArriveList: React.FC<{
  busArriveList?: BusStation[];
  busTypeNm: boolean;
}> = ({ busArriveList, busTypeNm }) => {
  const groupedByBusType: Record<string, BusStation[]> = {};

  //버스 유형별로 그룹화
  busArriveList?.forEach((bus) => {
    const { busRouteType } = bus;
    if (!groupedByBusType[busRouteType]) {
      groupedByBusType[busRouteType] = [];
    }
    groupedByBusType[busRouteType].push(bus);
  });
  return (
    <>
      {Object.entries(groupedByBusType).map(([type, buses]) => (
        <div key={type} className="bg-white">
          {busTypeNm && (
            <h2 className="bg-gray-200 text-gray-500 text-sm pl-2">
              {busTypeArray[type]}
            </h2>
          )}
          <ul>
            {buses.map((bus) => (
              <BusArriveItem key={bus.busRouteId} bus={bus} />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export const BusStationInfo: React.FC<{
  station: Station;
  busTypeNm: boolean;
}> = ({ station, busTypeNm }) => {
  const { stId, stNm, arsId } = station;

  const { data: busRouteList, isLoading: isLoadingBusRoute } = useQuery({
    queryKey: ["busRouteList", arsId],
    queryFn: () => getAllBusRoutesForStation(arsId),
  });

  const busStationSeqListQueries = useQueries({
    queries:
      busRouteList?.map((item) => ({
        queryKey: ["busStationSeqList", item.busRouteId],
        queryFn: async () => {
          const { seq, nextStationNm } = await getStationOrd(
            item.busRouteId,
            arsId
          );
          return { ...item, seq, stId, nextStationNm, stNm, arsId };
        },
        enabled: !!busRouteList,
      })) ?? [],
  });

  const busStationSeqDataList = busStationSeqListQueries.map((result) => {
    return result.data;
  });

  const busStationSeqList = busStationSeqDataList.filter(
    (item) => item !== undefined
  ) as BusStation[];

  const busArriveListQueries = useQueries({
    queries: busStationSeqList?.map((item) => ({
      queryKey: ["busArriveList", item.busRouteId],
      queryFn: async () => {
        const { arrmsg1, arrmsg2 } = await getArrInfoByRouteList(
          item.busRouteId,
          item.stId,
          item.seq
        );
        return { ...item, arrmsg1, arrmsg2 };
      },
      enabled: !!busStationSeqList,
    })),
  });

  const busArriveDataList = busArriveListQueries.map((result) => result.data);
  const busArriveList = busArriveDataList.filter(
    (item) => item !== undefined
  ) as BusStation[];

  // const busStationSeqListQueriesResults = useQueries(busStationSeqListQueries);
  // const busStationSeqList = busStationSeqListQueriesResults
  //   .filter((result) => result.data !== undefined)
  //   .map((result) => {
  //     console.log("busStationSeqList", result.data);
  //     return result.data;
  //   });

  // const busArriveListQueries = busStationSeqList.map<UseQueryOptions<BusStation[]>>((item) => {
  //   return {
  //     queryKey: ["busArriveList", item],
  //     queryFn: async () => {
  //       if (item) {
  //         const { arrmsg1, arrmsg2 } = await getArrInfoByRouteList(
  //           item.busRouteId,
  //           item.stId,
  //           item.seq
  //         );
  //         return { ...item, arrmsg1, arrmsg2 };
  //       } else {
  //         return {}
  //       }
  //     },
  //     enabled: !!busStationSeqList,
  //   };
  // });
  // const busArriveListQueriesResults = useQueries(busArriveListQueries);
  // const busArriveList = busArriveListQueriesResults
  // .filter((result) => result !== undefined)
  // .map((result) => {
  //   console.log("busArrList:", result.data);
  //   return result.data;
  // });
  // const busArriveListQueriesResults = useQueries(busArriveListQueries);
  // const busArriveList = busArriveListQueriesResults.map(
  //   (result) => result.data
  // );

  //promise 사용---------------------------
  // const { data: busStationSeqList, isLoading: isLoadingBusStationSeqList } =
  //   useQuery(
  //     ["busStationSeqList", busRouteList],
  //     async () => {
  //       const busStationList = await Promise.all(
  //         busRouteList?.map(async (item) => {
  //           const { seq, nextStationNm } = await getStationOrd(
  //             item.busRouteId,
  //             arsId
  //           );
  //           return { ...item, seq, stId, nextStationNm, stNm, arsId };
  //         }) || []
  //       );
  //       return busStationList;
  //     },
  //     { enabled: !!busRouteList }
  //   );
  // console.log(busStationSeqList);
  // const { data: busArriveList, isLoading: isLoadingBussArriveList } = useQuery(
  //   ["busArrive"],
  //   async () => {
  //     const busArrList = await Promise.all(
  //       busStationSeqList?.map(async (item) => {
  //         const { arrmsg1, arrmsg2 } = await getArrInfoByRouteList(
  //           item.busRouteId,
  //           item.stId,
  //           item.seq
  //         );
  //         return { ...item, arrmsg1, arrmsg2 };
  //       }) || []
  //     );
  //     return busArrList;
  //   },
  //   { enabled: !!busStationSeqList }
  // );

  return (
    <>
      {isLoadingBusRoute ? (
        // ||
        // isLoadingBusStationSeqList ||
        // isLoadingBussArriveList
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin w-10 h-10 rounded-full border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <BusArriveList busArriveList={busArriveList} busTypeNm={busTypeNm} />
      )}
    </>
  );
};
