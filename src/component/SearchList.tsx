import { Link } from "react-router-dom";
import { Station } from "../type";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { useQuery } from "react-query";
import { getSearchStationNm } from "../../api";
import { setSearchAllKeyword, setSearchResults } from "../features/searchSlice";
import BookmarkButton from "./BookmarkButton";

interface SearchItemPros {
  station: Station;
}

const SearchItem: React.FC<SearchItemPros> = ({ station }) => {
  const { stId, stNm, arsId } = station;

  return (
    <div className="my-2 border-b border-gray-500 bg-gray-100 flex justify-between">
      <Link to={{ pathname: "/busStation" }} state={{ stId, stNm, arsId }}>
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

  const { data: searchStationList, isLoading } = useQuery(
    ["searchResults", searchKeyword],
    async () => {
      //처음 검색한 keyword 일 때만 호출
      if (!searchAllKeyword.includes(searchKeyword)) {
        dispatch(setSearchAllKeyword(searchKeyword));
        const result = await getSearchStationNm(searchKeyword);
        if (result) {
          dispatch(setSearchResults({ keyword: searchKeyword, data: result }));
          return result;
        }
      }
    },
    {
      cacheTime: 60000,
      staleTime: 50000,
    }
  );

  return (
    <>
      <SearchBar />
      <div className="mt-5">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin w-10 h-10 rounded-full border-t-2 border-blue-500"></div>
          </div>
        ) : searchResults[searchKeyword] ? (
          searchResults[searchKeyword].map((item: Station) => {
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
