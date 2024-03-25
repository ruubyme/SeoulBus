import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store";
import { setSearchKeyword } from "../features/searchSlice";
import { Station } from "../type";

const SearchBar: React.FC<{ bookmarks: Station[] }> = ({ bookmarks }) => {
  const navigate = useNavigate();
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async (keyword: string) => {
    if (!keyword) {
      alert("검색어를 입력해주세요.");
    } else {
      dispatch(setSearchKeyword(keyword));
      navigate(`/search?keyword=${keyword}`, { state: { bookmarks } });
    }
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
