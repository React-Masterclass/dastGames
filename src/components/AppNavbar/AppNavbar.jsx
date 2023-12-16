import { Link } from "react-router-dom";
import AppContext from "../../contexts/Appcontext";
import style from "../AppNavbar/AppNavbar.module.css";
import { useContext } from "react";
import getProfileImg from "../../utils/GetProfileImg.js";
import useProfile from "../../hooks/useProfile";

 function AppNavbar() {
  const { userSession, signOut } = useContext(AppContext);
 const {profile} = useProfile();

  return (
    <nav className={`navbar navbar-expand-lg  ${style.navbar}`}>
      <div className="container-fluid">
        <Link to={"/"} className="text-decoration-none ms-3">
          <img
            src="../../../public/dastgame-logo.png"
            alt="logo"
            className={`${style.logo} img-fluid`}
          />
          <p className={style.siteName}>Dastgames</p>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userSession == null ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* registrazione */}
              <li className="nav-item">
                <Link to={"/login"} className="text-decoration-none">
                  <a
                    className={` ${style.buttons} nav-link active btn my-3 ms-2 my-lg-0 text-center`}
                    href="#"
                  >
                    Login
                  </a>
                </Link>
              </li>
              {/* login */}
              <li className="nav-item">
                <Link to={"/register"} className="text-decoration-none">
                  <a
                    className={` ${style.buttons} nav-link active btn ms-2 text-center`}
                    href="#"
                  >
                    Registrati
                  </a>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-3 dropstart">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle "
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                  src={profile && getProfileImg(profile.avatar_url)}
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                  className="img-fluid rounded-circle "
                />

                </a>
                <ul className="dropdown-menu-dark dropdown-menu">
                  <li>
                    <Link className="dropdown-item tx-secondary" to={"/account/accountPage"}>
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item tx-secondary" to={"/account/settings"}>
                      Impostazioni
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"} className={`btn btn-outline-danger ${style.logoutButton}`} onClick={signOut}>
                        LogOut
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
