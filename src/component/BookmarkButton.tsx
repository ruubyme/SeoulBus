import { Station } from "../type";
import StarIconImage from "../../src/assets/images/starIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { useEffect, useState } from "react";
import { busAPI } from "../../api";
import { addBookmark, removeBookmark } from "../features/userSlice";

const BookmarkButton: React.FC<{ station: Station }> = ({ station }) => {
  const bookmarks = useSelector((state: RootState) => state.user.bookmarks);
  const [isBookMark, setIsBookMark] = useState(
    bookmarks.some((bookmark) => bookmark.stId === station.stId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("props drilling, BookmarkButton 렌더링");
  });

  /**북마크 추가 */
  const fetchAddBookmark = async () => {
    try {
      const response = await busAPI.post(`/bookmakrs`, station, {
        withCredentials: true, // 브라우저의 쿠키를 요청에 포함시키려면 true로 설정
      });
      dispatch(addBookmark(station));
    } catch (error) {
      console.error("북마크 추가 에러: ", error);
    }
  };

  useEffect(() => {
    console.log("bookmarkbutton");
  }, []);

  /**북마크 삭제 */
  const fetchRemoveBookmark = async () => {
    const stationId = station.stId;
    try {
      const response = await busAPI.delete(`/bookmarks/${stationId}`, {
        withCredentials: true, // 브라우저의 쿠키를 요청에 포함시키려면 true로 설정
      });
      dispatch(removeBookmark(stationId));
    } catch (error) {
      console.error("북마크 삭제 에러: ", error);
    }
  };

  const handleBookmarkToggle = () => {
    if (isBookMark) {
      fetchRemoveBookmark();
    } else {
      fetchAddBookmark();
    }
    setIsBookMark((prev) => !prev);
  };

  return (
    <button onClick={handleBookmarkToggle} className="p-2">
      <img
        src={StarIconImage}
        alt="bookmarkButton"
        className={isBookMark ? "w-10 h-10" : "w-10 h-10 grayscale"}
      />
    </button>
  );
};

export default BookmarkButton;
