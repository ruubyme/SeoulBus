import { useRef } from "react";
import SearchBar, { SearchBarRef } from "./SearchBar";

export const Main: React.FC = () => {
  const searchBarRef = useRef<SearchBarRef>(null);

  const getRecentKeywordsFromLocalStorage = () => {
    const recentKeywordsToLocal = localStorage.getItem("recentKeywords");
    return recentKeywordsToLocal ? JSON.parse(recentKeywordsToLocal) : [];
  };
  const recentKeywords: string[] = getRecentKeywordsFromLocalStorage();

  const handleRecentKeywordClick = (keyword: string) => {
    if (searchBarRef.current) {
      searchBarRef.current.handleSearch(keyword);
    }
  };

  return (
    <>
      <SearchBar ref={searchBarRef} />
      <div className="pt-5 px-2">
        <h2 className="pb-2">최근 검색어</h2>
        {recentKeywords.length === 0 ? (
          <div>최근 검색어가 없습니다.</div>
        ) : (
          recentKeywords.map((keyword, index) => (
            <p key={index} onClick={() => handleRecentKeywordClick(keyword)}>
              {keyword}
            </p>
          ))
        )}
      </div>
    </>
  );
};
