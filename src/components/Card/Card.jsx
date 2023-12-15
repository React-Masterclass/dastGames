import { useState } from "react";
import { Link } from "react-router-dom";
import style from "../Card/Card.module.css";

/* eslint-disable react/prop-types */
export default function Card({ game }) {
  const [footerVisible, setFooterVisible] = useState(false);

  return game ? (
    <div
      className={`card ${style.cardBody} my-4`}
      onMouseEnter={() => setFooterVisible(true)}
      onMouseLeave={() => setFooterVisible(false)}
    >
      <div className={`${style.imgContainer} imgContainer`}>
        <img
          src={game.background_image}
          alt=""
          className={`${style.imgHeight} img-fluid rounded ronuded-1`}
        />
      </div>
      <div className="card-body">
        <Link to={`/game/${game.id}`} className="text-decoration-none">
          <h3 className="text-center tx-secondary text-truncate">
            {game.name}
          </h3>
        </Link>
        <p
          className={`tx-secondary text-center ${style.pFooter} ${style.scopri} mt-3`}
          onClick={() => setFooterVisible(!footerVisible)}
        >
          {footerVisible ? "scopri di meno" : "scopri di piu"}
        </p>
      </div>
      <div
        className={`${style.cardFooter} ${!footerVisible ? "d-none" : ""}`}
      >
        <hr className="tx-secondary w-75 mx-auto" />
        <div className="row">
          <div className="col-6">
            <p className={`${style.pFooter} text-secondary ms-5`}>
              Data di rilascio :{" "}
            </p>
          </div>
          <div className="col-6">
            <p className={`${style.pFooter} text-secondary`}>
              {game.released}
            </p>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-6">
            <p className={`${style.pFooter} text-secondary ms-5`}>Generi: </p>
          </div>
          <div className="col-6">
            <p key={game.id} className={`${style.pFooter} text-secondary`}>
              {game.genres.map((genre) => genre.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
