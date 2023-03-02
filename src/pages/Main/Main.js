import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Main.css";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

function Main() {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    authCtx.signOut();
    navigate("/");
  };

  useEffect(() => {
    if (
      authCtx.accessToken === undefined ||
      authCtx.accessToken === "" ||
      authCtx.accessToken === null
    ) {
      handleLogout();
    }
  }, [authCtx.accessToken]);
  return (
    <div className="Main">
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              <Link to="/main/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/main/products">Products</Link>
            </li>
            <li className="logout">
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
