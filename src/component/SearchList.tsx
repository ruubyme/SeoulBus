import { Link } from "react-router-dom";
import { Station } from "../type";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { useQuery } from "@tanstack/react-query";
import { getSearchStationNm } from "../../api";
import {
  removeSearchResults,
  setSearchAllKeyword,
  setSearchResults,
} from "../features/searchSlice";
import BookmarkButton from "./BookmarkButton";
import { useEffect } from "react";

interface SearchItemPros {
  station: Station;
}

const SearchItem: React.FC<SearchItemPros> = ({ station }) => {
  const { stId, stNm, arsId, tmX, tmY } = station;

  return (
    <div className="my-2 border-b border-gray-500 bg-gray-100 flex justify-between">
      <Link
        to={{ pathname: "/busStation" }}
        state={{ stId, stNm, arsId, tmX, tmY }}
      >
        <p className="text-lg m-1">{stNm}</p>
        <p className="text-red-600 m-1">{arsId}</p>
      </Link>
      <BookmarkButton station={station} />
    </div>
  );
};

const SearchList: React.FC = () => {
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );

  const searchAllKeyword = useSelector(
    (state: RootState) => state.search.searchAllKeyword
  );
  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("SearchList");
  }, [searchKeyword]);

  const { data: searchStationList, isLoading } = useQuery({
    queryKey: ["searchResults", searchKeyword],
    queryFn: async () => {
      //처음 검색한 keyword 일 때만 호출
      if (!searchAllKeyword.includes(searchKeyword)) {
        dispatch(setSearchAllKeyword(searchKeyword));
        const result = await getSearchStationNm(searchKeyword);
        if (result) {
          dispatch(setSearchResults({ keyword: searchKeyword, data: result }));
          return result;
        }
      } else {
        const searchData = searchResults[searchKeyword];
        const currentTime = Date.now();

        //일주일이 지났는지 확인
        if (currentTime - searchData.timestamp > 604800000) {
          dispatch(removeSearchResults(searchKeyword));
          const result = await getSearchStationNm(searchKeyword);
          if (result) {
            dispatch(
              setSearchResults({ keyword: searchKeyword, data: result })
            );
            return result;
          }
        }
      }
      return {};
    },
  });

  return (
    <>
      <SearchBar />
      <div className="mt-5">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin w-10 h-10 rounded-full border-t-2 border-blue-500"></div>
          </div>
        ) : searchResults[searchKeyword] ? (
          searchResults[searchKeyword].data.map((item: Station) => {
            return <SearchItem key={item.stId} station={item} />;
          })
        ) : (
          <div>정확한 정류소 이름을 다시 입력하세요.</div>
        )}
      </div>
    </>
  );
};

export default SearchList;
