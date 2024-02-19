import { useLocation, Link } from "react-router-dom";
import { Station } from "../src/type";
import { SearchBar } from "./SearchBar";
import { useEffect } from "react";

interface SearchItemPros {
  station: Station;
}

const SearchItem: React.FC<SearchItemPros> = ({ station }) => {
  const { stId, stNm, arsId } = station;
  return (
    <div className="my-2 border-b border-gray-500 bg-gray-100">
      <Link to={{ pathname: "/busStation" }} state={{ stId, stNm, arsId }}>
        <p className="text-lg m-1">{stNm}</p>
        <p className="text-red-600 m-1">{arsId}</p>
      </Link>
    </div>
  );
};

const SearchList: React.FC = () => {
  const { state, search } = useLocation();
  const searchStationList = state.latestSearchResults;
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  return (
    <>
      <SearchBar />
      <div className="mt-5">
        {searchStationList ? (
          searchStationList.map((item: Station) => {
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
