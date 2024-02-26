import axios from "axios";
import { Bus, BusStation, Station } from "./src/type";

/**정류장 이름 검색 */
export const getSearchStationNm = async (keyword: string) => {
  const response = await axios.get(
    `http://localhost:3000/search?keyword=${keyword}`
  );
  const responseData: Station[] = response.data.msgBody.itemList;
  if (responseData) {
    const searchStationList: Station[] = responseData.map(
      ({ stId, stNm, arsId }) => ({
        stId,
        stNm,
        arsId,
      })
    );
    return searchStationList;
  } else {
    return false;
  }
};

/**해당 정류소 모든 노선 검색 */
export const getAllBusRoutesForStation = async (arsId: string) => {
  const response = await axios.get(
    `http://localhost:3000/busRoutes?arsId=${arsId}`
  );
  const responseData: Bus[] = response.data.msgBody.itemList;
  const busRouteList: Bus[] = responseData.map(
    ({ busRouteNm, busRouteId, busRouteType }) => ({
      busRouteNm,
      busRouteId,
      busRouteType,
    })
  );
  return busRouteList;
};

/**특정 버스의 정류소 순번 조회 */
export const getStationOrd = async (busRouteId: string, arsId: string) => {
  const response = await axios.get(
    `http://localhost:3000/stationOrd?busRouteId=${busRouteId}`
  );
  const busStationRouteAll = response.data.msgBody.itemList;
  let seq = "";
  let nextStationNm = "";
  //전체 노선에서 원하는 정류소의 정보 찾기
  const stationRoute = busStationRouteAll.find(
    (e: BusStation) => e.arsId === arsId
  );
  if (stationRoute) {
    seq = stationRoute.seq;
    const nextStation = busStationRouteAll.find(
      (e: BusStation) => e.seq === String(Number(seq) + 1)
    );
    if (nextStation) {
      nextStationNm = nextStation.stationNm;
    }
  }
  return { seq, nextStationNm };
};

/**정류소 버스도착정보 조회 */
export const getArrInfoByRouteList = async (
  busRouteId: string,
  stId: string,
  seq: string
) => {
  const response = await axios.get(`
    http://localhost:3000/busArriveInfo?busRouteId=${busRouteId}&stId=${stId}&seq=${seq}
  `);
  const responseData: { arrmsg1: string; arrmsg2: string }[] =
    response.data.msgBody.itemList;
  if (responseData) {
    return {
      arrmsg1: responseData[0].arrmsg1,
      arrmsg2: responseData[0].arrmsg2,
    };
  } else {
    return {
      arrmsg: "서울 외 지역버스",
      arrmsg2: "서울 외 지역버스",
    };
  }
};
