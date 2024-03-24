import { Bus, BusStation, Station } from "../../type";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getAllBusRoutesForStation,
  getArrInfoByRouteList,
  getStationOrd,
} from "../../../api";
import BookmarkButton from "../BookmarkButton";
import { useEffect, useState } from "react";

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

  //test code

  const { data: busSeqList1 } = useQuery({
    queryKey: ["busSeqList1"],
    queryFn: async () => {
      const { seq, nextStationNm } = await getStationOrd("118900006", arsId);
      if (busRouteList && busRouteList[0]) {
        return { ...busRouteList[0], seq, stId, nextStationNm, stNm, arsId };
      }
    },
    enabled: !!busRouteList,
  });

  const { data: busSeqList2 } = useQuery({
    queryKey: ["busSeqList2"],
    queryFn: async () => {
      const { seq, nextStationNm } = await getStationOrd("100100094", arsId);
      if (busRouteList && busRouteList[1]) {
        return { ...busRouteList[1], seq, stId, nextStationNm, stNm, arsId };
      }
    },
    enabled: !!busRouteList,
  });

  const { data: busSeqList3 } = useQuery({
    queryKey: ["busSeqList3"],
    queryFn: async () => {
      const { seq, nextStationNm } = await getStationOrd("100100303", arsId);
      if (busRouteList && busRouteList[2]) {
        return { ...busRouteList[2], seq, stId, nextStationNm, stNm, arsId };
      }
    },
    enabled: !!busRouteList,
  });

  const { data: busSeqList4 } = useQuery({
    queryKey: ["busSeqList4"],
    queryFn: async () => {
      const { seq, nextStationNm } = await getStationOrd("219000008", arsId);
      if (busRouteList && busRouteList[3]) {
        return { ...busRouteList[3], seq, stId, nextStationNm, stNm, arsId };
      }
    },
    enabled: !!busRouteList,
  });

  const { data: busSeqList5 } = useQuery({
    queryKey: ["busSeqList5"],
    queryFn: async () => {
      const { seq, nextStationNm } = await getStationOrd("218000001", arsId);
      if (busRouteList && busRouteList[4]) {
        return { ...busRouteList[4], seq, stId, nextStationNm, stNm, arsId };
      }
    },
    enabled: !!busRouteList,
  });

  const { data: busArrList1 } = useQuery({
    queryKey: ["busArrList1"],
    queryFn: async () => {
      if (busSeqList1) {
        const { arrmsg1, arrmsg2 } = await getArrInfoByRouteList(
          busSeqList1?.busRouteId,
          busSeqList1?.stId,
          busSeqList1?.seq
        );
        return { ...busSeqList1, arrmsg1, arrmsg2 };
      }
    },
    enabled: !!busSeqList1,
  });

  const { data: busArrList2 } = useQuery({
    queryKey: ["busArrList2"],
    queryFn: async () => {
      if (busSeqList2) {
        const { arrmsg1, arrmsg2 } = await getArrInfoByRouteList(
          busSeqList2?.busRouteId,
          busSeqList2?.stId,
          busSeqList2?.seq
        );
        return { ...busSeqList2, arrmsg1, arrmsg2 };
      }
    },
    enabled: !!busSeqList2,
  });

  const { data: busArrList3 } = useQuery({
    queryKey: ["busArrList3"],
    queryFn: async () => {
      if (busSeqList3) {
        const { arrmsg1, arrmsg2 } = await getArrInfoByRouteList(
          busSeqList3?.busRouteId,
          busSeqList3?.stId,
          busSeqList3?.seq
        );
        return { ...busSeqList3, arrmsg1, arrmsg2 };
      }
    },
    enabled: !!busSeqList3,
  });

  const { data: busArrList4 } = useQuery({
    queryKey: ["busArrList4"],
    queryFn: async () => {
      if (busSeqList4) {
        const { arrmsg1, arrmsg2 } = await getArrInfoByRouteList(
          busSeqList4?.busRouteId,
          busSeqList4?.stId,
          busSeqList4?.seq
        );
        return { ...busSeqList4, arrmsg1, arrmsg2 };
      }
    },
    enabled: !!busSeqList4,
  });

  const { data: busArrList5 } = useQuery({
    queryKey: ["busArrList5"],
    queryFn: async () => {
      if (busSeqList5) {
        const { arrmsg1, arrmsg2 } = await getArrInfoByRouteList(
          busSeqList5?.busRouteId,
          busSeqList5?.stId,
          busSeqList5?.seq
        );
        return { ...busSeqList5, arrmsg1, arrmsg2 };
      }
    },
    enabled: !!busSeqList5,
  });

  // const busStationSeqListQueries = useQueries({
  //   queries:
  //     busRouteList?.map((item) => ({
  //       queryKey: ["busStationSeqList", item.busRouteId],
  //       queryFn: async () => {
  //         const { seq, nextStationNm } = await getStationOrd(
  //           item.busRouteId,
  //           arsId
  //         );
  //         return { ...item, seq, stId, nextStationNm, stNm, arsId };
  //       },
  //       enabled: !!busRouteList,
  //       refetchInterval: 60000,
  //     })) ?? [],
  // });

  // const busStationSeqDataList = busStationSeqListQueries.map((result) => {
  //   return result.data;
  // });

  // const busStationSeqList = busStationSeqDataList.filter(
  //   (item) => item !== undefined
  // ) as BusStation[];

  // const busArriveListQueries = useQueries({
  //   queries: busStationSeqList?.map((item) => ({
  //     queryKey: ["busArriveList", item.busRouteId],
  //     queryFn: async () => {
  //       const { arrmsg1, arrmsg2 } = await getArrInfoByRouteList(
  //         item.busRouteId,
  //         item.stId,
  //         item.seq
  //       );
  //       return { ...item, arrmsg1, arrmsg2 };
  //     },
  //     enabled: !!busStationSeqList,
  //     refetchInterval: 60000,
  //   })),
  // });

  // const busArriveDataList = busArriveListQueries.map((result) => result.data);
  // const busArriveList = busArriveDataList.filter(
  //   (item) => item !== undefined
  // ) as BusStation[];

  return (
    <>
      {isLoadingBusRoute ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin w-10 h-10 rounded-full border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <></>
        // <BusArriveList busArriveList={busArrList} busTypeNm={busTypeNm} />
      )}
    </>
  );
};
