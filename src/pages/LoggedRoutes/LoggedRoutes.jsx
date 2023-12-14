import { useContext } from "react";
import AppContext from "../../contexts/Appcontext";
import { Outlet, useNavigate } from "react-router-dom";
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import AppFooter from "../../components/AppFooter";

export default function Account() {
  const { userSession } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <>
      {userSession != null ? (
        <div className="d-flex flex-column min-vh-100" >
          <AppNavbar />
          <div className="flex-grow-1">

          <Outlet />
          </div>
          <AppFooter />
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
}
