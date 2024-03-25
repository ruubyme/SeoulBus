import { Link, useLocation } from "react-router-dom";

import { BusStationInfo } from "./BusArriveList";
import { useEffect } from "react";
import BookmarkButton from "../BookmarkButton";
import mapIcon from "../../assets/images/mapIcon.png";

export const BusStationPage: React.FC = () => {
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="h-screen">
        <div className="h-1/4 flex flex-col items-center justify-center  bg-gray-400 pt-5 min-h-[150px]">
          <p className="text-lg text-white">{state.arsId}</p>
          <p className="text-white text-xl">{state.stNm}</p>
          <div className="flex items-center">
            <div className="text-white block border rounded-lg p-1 px-2 flex">
              <img src={mapIcon} width="25px" alt="mapIcon"></img>
              <a
                href={`https://map.kakao.com/link/map/${state.tmY},${state.tmX}`}
                target="_blank"
                className="px-1"
              >
                지도
              </a>
            </div>
            <BookmarkButton station={state} bookmarks={state.bookmarks} />
          </div>
        </div>
        <BusStationInfo station={state} busTypeNm={true} />
      </div>
    </div>
  );
};
