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
  const [bookmarksArrival, setBookmarksArrival] = useState<BusStation>();

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
          <BookmarkItem key={index} station={station} />
        ))
      )}
    </div>
  );
};

export default BookmarkList;
