import { LatLong } from "../../type";
import { useKakaoMapScript } from "./useKakaoMapScript";
import { useRef, useEffect } from "react";

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

/**주소로 좌표 검색 함수 */
const createGeocoder = async (address: string): Promise<LatLong> => {
  return new Promise((resolve, reject) => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder(); //주소-좌표 반환 객체 생성

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve({
            latitude: result[0].y,
            longitude: result[0].x,
          });
        } else {
          reject(new Error("Geocoder: Address search failed"));
        }
      });
    });
  });
};

/**정적 지도 생성 */
const createStaticMap = (longitude: number, latitude: number) => {
  window.kakao.maps.load(() => {
    const staticMapContainer: HTMLElement | null =
      document.getElementById("staticMap");
    //마커표시
    const markerPosition = new window.kakao.maps.LatLng(longitude, latitude);
    const marker = {
      position: markerPosition,
    };

    if (staticMapContainer) {
      const staticOption = {
        center: new window.kakao.maps.LatLng(longitude, latitude),
        level: 3,
        marker: marker,
      };
      const staticMap = new window.kakao.maps.StaticMap(
        staticMapContainer,
        staticOption
      );
    }
  });
};

const Map: React.FC = () => {
  const mapRef = useRef<any>(null);
  const isScriptLoaded = useKakaoMapScript();

  /**map 생성 함수 */
  const createMap = async (address: string) => {
    const onLoadKakaoMap = async () => {
      try {
        let coords = { latitude: 37.517198, longitude: 126.891434 };
        if (address) {
          coords = await createGeocoder(address);
        }
        const kakaoCoords: kakao.maps.LatLng = new window.kakao.maps.LatLng(
          coords.latitude,
          coords.longitude
        );
        const container = document.getElementById("map");
        const options = {
          center: kakaoCoords,
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;
      } catch (error) {
        console.error(error);
      }
    };
    onLoadKakaoMap();
  };

  useEffect(() => {
    if (isScriptLoaded) {
      createMap("문래로 8길 5");
    }
  });

  return (
    <>
      <div>
        <div className="relative w-full h-[80vh]">
          <div id="map" className="w-full h-full" />
        </div>
      </div>
    </>
  );
};

export default Map;
