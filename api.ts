import axios from "axios";
import { Bus, BusStation, Station } from "./src/type";
import { parseCookies, setCookie } from "nookies";

export const busAPI = axios.create({
  baseURL: "http://3.39.195.106:3000",
});

export const getUUID = async () => {
  const cookies = parseCookies();
  const userUUID = cookies.userUUID;
  if (!userUUID) {
    try {
      const response = await busAPI.get("/");
      const responseData = response.data;

      setCookie(null, "userUUID", responseData.uuid, {
        maxAge: 9000000,
        path: "/",
      });
    } catch (error) {
      console.error("Error uuid", error);
    }
  }
};

/**정류장 이름 검색 */
export const getSearchStationNm = async (keyword: string) => {
  const response = await busAPI.get(`/search?keyword=${keyword}`);
  const responseData: Station[] = response.data.msgBody.itemList;
  if (responseData) {
    const searchStationList: Station[] = responseData.map(
      ({ stId, stNm, arsId, tmX, tmY }) => ({
        stId,
        stNm,
        arsId,
        tmX,
        tmY,
      })
    );
    return searchStationList;
  } else {
    return undefined;
  }
};

/**해당 정류소 모든 노선 검색 */
export const getAllBusRoutesForStation = async (arsId: string) => {
  const response = await busAPI.get(`/busRoutes?arsId=${arsId}`);
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
  const response = await busAPI.get(`/stationOrd?busRouteId=${busRouteId}`);
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
  const response =
    await busAPI.get(`/busArriveInfo?busRouteId=${busRouteId}&stId=${stId}&seq=${seq}
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
      arrmsg1: "서울 외 지역버스",
      arrmsg2: "서울 외 지역버스",
    };
  }
};

/**좌표로 버스정류장 조회 */
export const getSearchStationPos = async (
  latitude: number,
  longitude: number
) => {
  const response = await busAPI.get(
    `/searchBusStationPos?latitude=${latitude}&longitude=${longitude}`
  );
  const responseData: {
    arsId: string;
    stationNm: string;
    stationId: string;
  }[] = response.data.msgBody.itemList;
  if (responseData) {
    if (responseData.length >= 2) {
      throw new Error("특정 정류소 하나만 클릭해주세요.");
    } else if (responseData.length === 1) {
      const { arsId, stationNm, stationId } = responseData[0];
      const searchStation: Station = {
        arsId,
        stId: stationId,
        stNm: stationNm,
      };

      return searchStation;
    }
  } else {
    return null;
  }
};

/**즐겨찾는 정류장 조회 */
export const getBookmarks = async () => {
  try {
    const response = await busAPI.get("/bookmarks", {
      withCredentials: true, // 브라우저의 쿠키를 요청에 포함시키려면 true로 설정
    });
    const responseData: Station[] = response.data;
    return responseData;
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};
