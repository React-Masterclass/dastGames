import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import {  MdMail } from "react-icons/md";


function AppFooter() {
  return (
    <div className="container-fluid mt-5 ">
      <hr className="tx-secondary" />

      <div className="row m-0 my-5">
        <div className="col-5 col-md-2">
          <img
            src="https://djwpyiaajdldabatncon.supabase.co/storage/v1/object/public/avatars/dastgame-logo.png"
            alt=""
            className="img-fluid"
          />
        </div>
        <div className="col-12 col-md-4">
          <div className="row ">
            <h3 className="tx-secondary">Link utili</h3>
          </div>
          <ul className="list-unstyled">
            <Link to={'/'} className="tx-secondary text-decoration-none ">
                <li>Home</li>
            </Link>
            <Link to={'/account/accountPage'} className="tx-secondary text-decoration-none">
                <li>Account</li>
            </Link>
            <Link to={'/account/settings'} className="tx-secondary text-decoration-none">
                <li>Impostazioni</li>
            </Link>
          </ul>
        </div>
        <div className="col-12 col-md-4">
            <div className="row">
                <h3 className="tx-secondary text-left">Contatti</h3>
            </div>
            <div className="row">
            <ul className=" list-unstyled">
                <li className="tx-secondary text-decoration-none">
                   <FaHome /> Cagliari (CA)
                </li>
                <li className="tx-secondary text-decoration-none">
                   <MdMail /> ermellinodavide@gmail.com
                </li>
            </ul>
            </div>
        </div>
      </div>
      <hr className="tx-secondary" />
      <p className="tx-secondary text-center">© 2023 Copyright: Davide Ermellino</p>
    </div>
  );
}

export default AppFooter;
