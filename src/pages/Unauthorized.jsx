import { Link } from "react-router-dom";
import Btn from "../components/Btn";

function Unauthorized() {
  return (
    <div>
      <h2>Access Denied 🚫</h2>
      <p>You don’t have permission to view this page.</p>
      <Link to={"/"}>
        <Btn btnText={"Home"} />
      </Link>
    </div>
  );
}

export default Unauthorized;
