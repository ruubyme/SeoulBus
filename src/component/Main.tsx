import { useEffect, useRef, useState } from "react";
import SearchBar, { SearchBarRef } from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { parseCookies, setCookie } from "nookies";
import { getUUID } from "../../api";
import BookmarkList from "./BookmarkList";
import busImage from "../assets/images/busImage.png";

export const Main: React.FC = () => {
  const navigator = useNavigate();
  useEffect(() => {
    getUUID();
  }, []);

  return (
    <>
      <SearchBar />
      <div className="pt-5 px-2">
        <div className="pb-2 bg-white p-2 flex cursor-pointer">
          <img src={busImage} width="30px" alt="busImage" className="" />
          <h2
            className="pb-2 text-blue-700 bg-white p-2"
            onClick={() => navigator(`/nearbyStation`)}
          >
            주변 정류장 확인
          </h2>
        </div>
        <h2 className="py-2 text-blue-700">자주 가는 정류장</h2>
        <BookmarkList />
      </div>
    </>
  );
};
