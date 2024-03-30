export interface Bus {
  busRouteId: string; //노선ID
  busRouteNm: string; //노선명
  busRouteType: string; //노선유형(간선, 마을 ..)
}

export interface Station {
  stId: string; //정류소ID
  stNm: string; //정류소명
  arsId: string; //정류소번호
  tmX?: string;
  tmY?: string;
}

export interface BusStation extends Bus, Station {
  seq: string; //노선 순번
  nextStationNm: string; //다음 정류장 이름
  arrmsg1?: string;
  arrmsg2?: string;
}

export interface LatLong {
  latitude: number;
  longitude: number;
}
