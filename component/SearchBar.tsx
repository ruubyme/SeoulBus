import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getSearchStationNm } from "../api";
import { Station } from "../src/type";
import { useNavigate } from "react-router-dom";

export interface SearchBarRef {
  handleSearch: (keyword: string) => void;
}

const SearchBar: React.ForwardRefRenderFunction<SearchBarRef, {}> = (
  props,
  ref
) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: searchStationList, isLoading } = useQuery(
    ["searchResults"],
    () => getSearchStationNm(keyword),
    {
      enabled: false,
    }
  );

  const saveKeywordToLocalStorage = (keyword: string) => {
    const storedKeywords = localStorage.getItem("recentKeywords");
    const recentKeywords: string[] = storedKeywords
      ? JSON.parse(storedKeywords)
      : [];
    const updatedKeywords = [...recentKeywords, keyword];
    localStorage.setItem("recentKeywords", JSON.stringify(updatedKeywords));
  };

  const handleSearch = async (keyword: string) => {
    await queryClient.prefetchQuery("searchStationList", () =>
      getSearchStationNm(keyword)
    );

    const latestSearchResults =
      queryClient.getQueryData<Station[]>("searchStationList");
    navigate(`/search?keyword=${keyword}`, {
      state: { latestSearchResults },
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      saveKeywordToLocalStorage(keyword);
      handleSearch(keyword);
    }
  };

  const handleSearchClick = () => {
    saveKeywordToLocalStorage(keyword);
    handleSearch(keyword);
  };
  //부모 컴포넌트에서 handleSearch()함수 호출
  useImperativeHandle(ref, () => ({
    handleSearch,
  }));

  //페이지 이동 시 해당 페이지의 검색어를 input에 반영
  useEffect(() => {
    const prevKeyword = new URLSearchParams(location.search).get("keyword");
    if (prevKeyword !== null) {
      setKeyword(prevKeyword);
    }
  }, [location.search]);

  return (
    <div className="p-2">
      <input
        value={keyword}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="정류소명을 입력하세요."
      ></input>
      <button onClick={handleSearchClick} className="px-2">
        검색
      </button>
    </div>
  );
};

export default forwardRef(SearchBar);
