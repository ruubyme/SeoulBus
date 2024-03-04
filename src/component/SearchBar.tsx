import { useEffect, useState } from "react";
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

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async (keyword: string) => {
    dispatch(setSearchKeyword(keyword));
    navigate(`/search?keyword=${keyword}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(inputValue);
    }
  };

  const handleSearchClick = () => {
    handleSearch(inputValue);
  };

  //페이지 이동 시 해당 페이지의 검색어를 input에 반영
  useEffect(() => {
    const prevKeyword = new URLSearchParams(location.search).get("keyword");
    if (prevKeyword !== null && prevKeyword !== searchKeyword) {
      dispatch(setSearchKeyword(prevKeyword));
      setInputValue(prevKeyword);
    }
  }, [location.search]);

  return (
    <div className="p-2">
      <input
        value={inputValue}
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

export default SearchBar;
