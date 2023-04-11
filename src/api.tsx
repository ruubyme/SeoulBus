import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

interface BusInfo {
  stId: string;
  busRouteId: string;
  ord: string;
}

const busInfos: BusInfo[] = [
  { stId: "118000225", busRouteId: "118900006", ord: "29" },
  { stId: "118000225", busRouteId: "100100094", ord: "94" },
];

/**정류소 버스도착정보 조회 */
const getArrInfoByRouteList = async (busInfos: BusInfo[]) => {
  const resultList = [];

  for (const { stId, busRouteId, ord } of busInfos) {
    const url = `https://cors-anywhere.herokuapp.com/http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRoute?ServiceKey=${API_KEY}&stId=${stId}&busRouteId=${busRouteId}&ord=${ord}&resultType=json`;
    const response = await axios.get(url);
    resultList.push(response.data.msgBody.itemList);
  }
  return resultList;
};

/**routeId 얻어오기 */
// const getRouteId = async (arsId: string) => {
//   const url = `https://cors-anywhere.herokuapp.com/http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation?ServiceKey=${API_KEY}&arsId=${arsId}&resultType=json`;

//   const response = await axios.get(url);
//   busRouteIds.push(
//     response.data.msgBody.itemList.map((item: string) => {
//       return item.busRouteId;
//     })
//   );
//   console.log(busRouteIds);
// };

// /**routeId 얻어오기 */
// const getRouteId = async () => {
//   // const url = `https://cors-anywhere.herokuapp.com/http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation?ServiceKey=${API_KEY}&arsId=${arsId}&resultType=json`;
//   // const response = await axios.get(url);
//   // busRouteIds.push(
//   //   response.data.msgBody.itemList.map((item: string) => {
//   //     return item.busRouteId;
//   //   })
//   // );
//   // console.log(busRouteIds);
//   //2번째 방법 : 문제점있음
//   // const RouteIds = await Promise.all(
//   //   arsIds.map(async (arsId) => {
//   //     const url = `https://cors-anywhere.herokuapp.com/http://ws.bus.go.kr/api/rest/stationinfo/getRouteByStation?ServiceKey=${API_KEY}&arsId=${arsId}&resultType=json`;
//   //     const response = await axios.get(url);
//   //     return response.data.msgBody.itemList.map(
//   //       (item: string) => item.busRouteId
//   //     );
//   //   })
//   // );
//   // console.log(busRouteIds);
// };

export { getArrInfoByRouteList };
