import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBusRoutesForStation,
  getBookmarks,
  getStationOrd,
} from "../../api";
import { setBookmarks } from "../features/userSlice";
import { RootState } from "../stores/store";
import { BusStation, Station } from "../type";
import { useState } from "react";
import { BusStationInfo } from "./BusStationPage/BusArriveList";

const BookmarkItem: React.FC<{ station: Station }> = ({ station }) => {
  return (
    <div>
      <p>{station.stNm}</p>
    </div>
  );
};

const BookmarkList: React.FC = () => {
  const dispatch = useDispatch();

  const bookmarkList = useSelector((state: RootState) => state.user.bookmarks);

  const { data: bookmarks } = useQuery(["bookmarks"], async () => {
    const result = await getBookmarks();
    dispatch(setBookmarks(result));
    return result;
  });

  return (
    <div>
      {bookmarkList.length === 0 ? (
        <div>즐겨찾는 정류장이 없습니다.</div>
      ) : (
        bookmarkList.map((station: Station, index) => (
          <div key={index} className="bg-white text-sm my-2">
            <h3 className="border-b px-2 py-1 font-semibold">{station.stNm}</h3>
            <BusStationInfo station={station} busTypeNm={false} />
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarkList;
