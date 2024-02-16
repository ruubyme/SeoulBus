import { useLocation, Link } from "react-router-dom";
import { Station } from "../src/type";
import { SearchBar } from "./SearchBar";

interface SearchItemPros {
  station: Station;
}

const SearchItem: React.FC<SearchItemPros> = ({ station }) => {
  const { stId, stNm, arsId } = station;
  return (
    <div>
      <Link to={{ pathname: "/busStation" }} state={{ stId, stNm, arsId }}>
        <p>{arsId}</p>
        <p>{stNm}</p>
      </Link>
    </div>
  );
};

const SearchList: React.FC = () => {
  const { state, search } = useLocation();
  const searchStationList = state.latestSearchResults;
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");
  console.log(keyword);
  return (
    <>
      {searchStationList ? (
        searchStationList.map((item: Station) => {
          return <SearchItem key={item.stId} station={item} />;
        })
      ) : (
        <div>정확한 정류소 이름을 다시 입력하세요.</div>
      )}
    </>
  );
};

export default SearchList;
