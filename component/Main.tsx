import { useState } from "react";
import { getSearchStationNm } from "../api";
import { SearchBar } from "./SearchBar";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Station } from "../src/type";

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchKeyword, setSearchKeyword] = useState("");
  const { data: searchStationList, isLoading } = useQuery(
    ["searchResults"],
    () => getSearchStationNm(searchKeyword),
    {
      enabled: false,
    }
  );

  const handleSearch = async (keyword: string) => {
    await queryClient.prefetchQuery("searchStationList", () =>
      getSearchStationNm(keyword)
    );

    const latestSearchResults =
      queryClient.getQueryData<Station[]>("searchStationList");
    navigate(`/search?keyword=${searchKeyword}`, {
      state: { latestSearchResults },
    });
  };

  return (
    <>
      <SearchBar
        keyword={searchKeyword}
        setKeyword={setSearchKeyword}
        onSearch={handleSearch}
      />

      {/* {isLoading && <div>Loading...</div>} */}

      {/* <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          busResultList.map((busResults, index) => {
            const stationName = busResults[0].stNm;
            const nextStationName = busResults[0].nextStationName;
            const busInfoList = busResults.map((busResult) => {
              return (
                <li key={busResult.rtNm} className="flex justify-start">
                  <div
                    className={
                      busResult.routeType === "2" || busResult.routeType === "4"
                        ? "text-green-500 flex items-center w-40"
                        : busResult.routeType === "3"
                        ? "text-blue-500 flex items-center w-40"
                        : ""
                    }
                  >
                    {busResult.rtNm}
                  </div>
                  <div className="flex flex-col ml-10">
                    <div>{busResult.arrmsg1}</div>
                    <div>{busResult.arrmsg2}</div>
                  </div>
                </li>
              );
            });

            return (
              <div key={index} className="bg-zinc-50 divide-y my-1 pl-2 py-1">
                <div>
                  <div className="text-lg">{stationName}</div>
                  <div className="text-m text-gray-400">{nextStationName}</div>
                </div>
                <div>
                  <ul className="divide-y">{busInfoList}</ul>
                </div>
              </div>
            );
          })
        )}
      </div> */}
    </>
  );
};
