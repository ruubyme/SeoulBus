import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { parseCookies, setCookie } from "nookies";
import { getBookmarks, getUUID } from "../../api";
import BookmarkList from "./BookmarkList";
import busImage from "../assets/images/busImage.png";
import { useQuery } from "@tanstack/react-query";
import { Station } from "../type";

export const Main: React.FC = () => {
  const navigator = useNavigate();
  useEffect(() => {
    getUUID();
  }, []);

  const [bookmarks, setBookmarks] = useState<Station[]>([]);

  const { data: bookmarksList } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getBookmarks(),
    initialData: [],
  });

  useEffect(() => {
    setBookmarks(bookmarksList);
  }, [bookmarksList]);

  return (
    <>
      <SearchBar bookmarks={bookmarks} setBookmarks={setBookmarks} />
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
        <BookmarkList bookmarks={bookmarks} />
      </div>
    </>
  );
};
