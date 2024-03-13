//import Map from "../KakaoMap/Map";
import { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getSearchStationPos } from "../../../api";
import { useQuery } from "react-query";
import StationItem from "./StationItem";

const NearbyStationPage: React.FC = () => {
  const [currentPos, setCurrentPos] = useState({
    center: {
      lat: 0,
      lng: 0,
    },
    isPanto: false,
  });
  const [clickPos, setClickPos] = useState<{
    lat: number;
    lng: number;
  }>();

  /**정류소 marker 클릭 */
  const { data: station, error } = useQuery(
    ["station", clickPos],
    async () => {
      if (clickPos) {
        const result = await getSearchStationPos(clickPos.lat, clickPos.lng);
        console.log(result);
        return result;
      }
    },
    {
      onError: (error: Error) => {
        alert(error.message);
      },
    }
  );

  /**현재 위치 받아오기 */
  const getCurrentPos = () => {
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

  /**getCurrentPos -> success callback */
  const getPosSuccess = (pos: GeolocationPosition) => {
    console.log("g");
    setCurrentPos({
      center: {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      },
      isPanto: true,
    });
  };

  useEffect(() => {
    getCurrentPos();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-center bg-white p-2 border-b-2 border-gray-300 ">
        주변 정류장
      </h1>
      <div className=" w-full h-full">
        <Map
          center={currentPos.center}
          isPanto={currentPos.isPanto}
          style={{ width: "100%", height: "100%" }}
          level={2}
          onClick={(_, mouseEvent) => {
            const latlng = mouseEvent.latLng;
            setClickPos({
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            });
          }}
          onDragEnd={(map) => {
            const latlng = map.getCenter();
            setCurrentPos({
              center: {
                lat: latlng.getLat(),
                lng: latlng.getLng(),
              },
              isPanto: true,
            });
          }}
        >
          <MapMarker
            position={
              clickPos
                ? {
                    lat: clickPos.lat,
                    lng: clickPos.lng,
                  }
                : { lat: currentPos.center.lat, lng: currentPos.center.lng }
            }
          ></MapMarker>
        </Map>
      </div>
      <button
        className="absolute bottom-4 right-4 rounded bg-white border border-black px-1 text-blue-500 z-20 sm: bottom-10"
        onClick={() => {
          getCurrentPos();
          setClickPos(undefined);
        }}
      >
        현재 위치
      </button>

      {station && <StationItem station={station} />}
    </div>
  );
};

export default NearbyStationPage;
