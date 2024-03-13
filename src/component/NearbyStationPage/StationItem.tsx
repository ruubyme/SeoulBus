import { Station } from "../../type";
import { Link } from "react-router-dom";

const StationItem: React.FC<{ station: Station }> = ({ station }) => {
  const { stId, stNm, arsId } = station;
  return (
    <div className="left-4 bottom-5 bg-white z-10 ">
      <Link to={{ pathname: "/busStation" }} state={{ stId, stNm, arsId }}>
        <p className="text-lg">{stNm}</p>
        <p className="text-gray-500">{arsId}</p>
      </Link>
    </div>
  );
};

export default StationItem;
