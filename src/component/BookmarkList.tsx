import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks } from "../../api";
import { setBookmarks } from "../features/userSlice";
import { RootState } from "../stores/store";
import { Station } from "../type";
import { BusStationInfo } from "./BusStationPage/BusArriveList";

const BookmarkList: React.FC = () => {
  const dispatch = useDispatch();

  const bookmarkList = useSelector((state: RootState) => state.user.bookmarks);

  const { data: bookmarks } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const result = await getBookmarks();
      dispatch(setBookmarks(result));
      return result;
    },
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
