import { Link } from "react-router-dom";
import notFound from "../assets/notFound.png";
import { FaHome } from "react-icons/fa";

export function NotFound() {
  return (
    <div className="container text-center align-items-center pb-2">
      <div>
        <img src={notFound} alt="there is no data to show" />
      </div>
      <Link to={"/"} className="btn btn-dark ms-3 " style={{ width: "150px" }}>
        <FaHome style={{ width: "20px", height: "20px", color: "white" }} />
      </Link>
    </div>
  );
}
