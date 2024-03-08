import { LatLong } from "../../type";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  currentPos: {
    latitude: number;
    longitude: number;
  };
  getPosSuccess: (pos: GeolocationPosition) => void;
  getCurrentPos: () => void;
  setCurrentPos: React.Dispatch<
    React.SetStateAction<{ latitude: number; longitude: number }>
  >;
}

const Map: React.FC<MapProps> = ({
  currentPos,
  getCurrentPos,
  getPosSuccess,
  setCurrentPos,
}) => {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();

  // useEffect(() => {
  //   // Load Kakao Maps
  //   window.kakao.maps.load(() => {
  //     const container = document.getElementById("map");
  //     const options = {
  //       center: new window.kakao.maps.LatLng(
  //         currentPos.latitude,
  //         currentPos.longitude
  //       ),
  //       level: 3,
  //     };

  //     setMap(new window.kakao.maps.Map(container, options));
  //     setMarker(new window.kakao.maps.Marker());
  //   });
  // }, [currentPos]);

  // const handleCurrentPosBtn = () => {
  //   getCurrentPos();
  //   const currentPosByLntLng = new window.kakao.maps.LatLng(
  //     currentPos.latitude,
  //     currentPos.longitude
  //   );
  //   map.panTo(currentPosByLntLng);
  //   // marker.setMap(null);
  //   marker.setPosition(currentPosByLntLng);
  //   marker.setMap(marker.getMap());
  //   // console.log(map.getCenter());
  //   // console.log(marker.getMap());
  // };

  // 1) 카카오맵 불러오기
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          currentPos.latitude,
          currentPos.longitude
        ),
        level: 3,
      };

      setMap(new window.kakao.maps.Map(container, options));
      setMarker(
        new window.kakao.maps.Marker({ map: map, position: options.center })
      );
      console.log(window.kakao.maps.event);
      console.log(window.kakao.maps.event.addListener);
      // window.kakao.maps.event.addListener(
      //   map,
      //   "click",
      //   function (mouseEvent: any) {
      //     console.log(mouseEvent.latLng);
      //   }
      // );
    });
  }, [currentPos]);

  // 2) 현재 위치 함수
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess2,
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  };

  // 3) 정상적으로 현재위치 가져올 경우 실행
  const getPosSuccess2 = (pos: GeolocationPosition) => {
    // 현재 위치(위도, 경도) 가져온다.
    let currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude, // 위도
      pos.coords.longitude // 경도
    );
    // 지도를 이동 시킨다.
    map.panTo(currentPos);

    // 기존 마커를 제거하고 새로운 마커를 넣는다.
    marker.setMap(null);
    marker.setPosition(currentPos);
    marker.setMap(map);
  };

  return (
    <div className="relative w-full h-screen lg:w-1/2">
      <div id="map" className="w-full h-full" />
      <button
        className="absolute bottom-4 left-4 rounded bg-white border border-black px-1 text-blue-500 z-10 sm: bottom-10"
        onClick={getCurrentPosBtn}
      >
        현재 위치
      </button>
    </div>
  );
};

//export default Map;
