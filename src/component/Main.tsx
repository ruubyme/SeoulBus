import { useEffect, useRef, useState } from "react";
import SearchBar, { SearchBarRef } from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { parseCookies, setCookie } from "nookies";
import { getUUID } from "../../api";
import BookmarkList from "./BookmarkList";

export const Main: React.FC = () => {
  // const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const navigator = useNavigate();

  // const getRecentKeywordsFromLocalStorage = () => {
  //   const recentKeywordsToLocal = localStorage.getItem("recentKeywords");
  //   return recentKeywordsToLocal ? JSON.parse(recentKeywordsToLocal) : [];
  // };

  // const handleRecentKeywordClick = (keyword: string) => {
  //   if (searchBarRef.current) {
  //     searchBarRef.current.handleSearch(keyword);
  //   }
  // };

  // const deleteRecentKeyword = (keywordToDelete: string) => {
  //   const recentKeywords = getRecentKeywordsFromLocalStorage();
  //   const updatedKeywords = recentKeywords.filter(
  //     (keyword: string) => keyword !== keywordToDelete
  //   );
  //   setRecentKeywords(updatedKeywords);
  //   localStorage.setItem("recentKeywords", JSON.stringify(updatedKeywords));
  // };

  useEffect(() => {
    getUUID();
    // const recentKeywords = getRecentKeywordsFromLocalStorage();
    // setRecentKeywords(recentKeywords);
  }, []);

  return (
    <>
      <SearchBar />
      <div className="pt-5 px-2">
        <h2 className="pb-2 text-blue-700">최근 검색어</h2>
        {/* {recentKeywords.length === 0 ? (
          <div className="text-gray-500">최근 검색어가 없습니다.</div>
        ) : (
          recentKeywords.map((keyword, index) => (
            <div key={index}>
              <span
                className="pr-1 cursor-pointer"
                onClick={() => handleRecentKeywordClick(keyword)}
              >
                {keyword}
              </span>
              <button onClick={() => deleteRecentKeyword(keyword)}>✖️</button>
            </div>
          ))
        )} */}
        <h2 className="pb-2 text-blue-700">자주 가는 정류장</h2>
        <BookmarkList />
        <h2
          className="pb-2 text-blue-700"
          onClick={() => navigator(`/nearbyStation`)}
        >
          주변 정류장 확인
        </h2>
      </div>
    </>
  );
};
