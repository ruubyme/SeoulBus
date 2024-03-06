import { LatLong } from "../../type";
import { useRef, useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

declare namespace kakao.maps {
  export class LatLng {
    constructor(latitude: number, longitude: number);
  }
}

const Map: React.FC = () => {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  // const isScriptLoaded = useKakaoMapScript();

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, []);

  /**현재 위치 가져오기 */
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  };

  /**현재 위치를 가져오는데 성공할 경우 실행 */
  const getPosSuccess = (pos: GeolocationPosition) => {
    var currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude
    );

    map.panTo(currentPos); //지도 이동

    //현재위치에 마커생성
    marker.setMap(null);
    marker.setPosition(currentPos);
    marker.setMap(map);
  };

  return (
    <div className="w-full h-screen">
      <div id="map" className="w-full h-1/3" />
      <button className="bottom-4 right-4 rounded " onClick={getCurrentPosBtn}>
        현재 위치
      </button>
    </div>
  );
};

export default Map;
