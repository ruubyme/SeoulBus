import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getSearchStationNm } from "../../api";
import { Station } from "../type";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store";
import {
  setSearchKeyword,
  setSearchAllKeyword,
  setSearchResults,
} from "../features/SearchSlice";

export interface SearchBarRef {
  handleSearch: (keyword: string) => void;
}

const SearchBar: React.ForwardRefRenderFunction<SearchBarRef, {}> = (
  props,
  ref
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );
  const dispatch = useDispatch();

  // const { data: searchStationList, isLoading } = useQuery(
  //   ["searchResults"],
  //   () => getSearchStationNm(keyword),
  //   {
  //     enabled: false,
  //   }
  // );

  // const saveKeywordToLocalStorage = (keyword: string) => {
  //   const storedKeywords = localStorage.getItem("recentKeywords");
  //   const recentKeywords: string[] = storedKeywords
  //     ? JSON.parse(storedKeywords)
  //     : [];
  //   //중복 저장 방지
  //   if (!recentKeywords.includes(keyword)) {
  //     const updatedKeywords = [...recentKeywords, keyword];
  //     localStorage.setItem("recentKeywords", JSON.stringify(updatedKeywords));
  //   }
  // };

  const handleSearch = async (keyword: string) => {
    dispatch(setSearchAllKeyword(keyword));

    await queryClient.prefetchQuery("searchStationList", () =>
      getSearchStationNm(keyword)
    );

    const latestSearchResults =
      queryClient.getQueryData<Station[]>("searchStationList");

    if (latestSearchResults) {
      dispatch(setSearchResults({ keyword, data: latestSearchResults }));
    }

    navigate(`/search?keyword=${keyword}`, {
      state: { latestSearchResults },
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKeyword(event.target.value));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(searchKeyword);
    }
  };

  const handleSearchClick = () => {
    handleSearch(searchKeyword);
  };
  //부모 컴포넌트에서 handleSearch()함수 호출
  useImperativeHandle(ref, () => ({
    handleSearch,
  }));

  //페이지 이동 시 해당 페이지의 검색어를 input에 반영
  useEffect(() => {
    const prevKeyword = new URLSearchParams(location.search).get("keyword");
    if (prevKeyword !== null) {
      dispatch(setSearchKeyword(prevKeyword));
    }
  }, [location.search]);

  return (
    <div className="p-2">
      <input
        value={searchKeyword}
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
