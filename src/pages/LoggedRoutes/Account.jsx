import { useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/Appcontext";
import useProfile from "../../hooks/useProfile";
import getProfileImg from "../../utils/getProfileImg";
import supabase from "../../supabase/client";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import moment from "moment";
import style from "../LoggedRoutes/Account.module.css";

export default function Account() {
  const { userSession } = useContext(AppContext);
  const { profile } = useProfile();
  const [comments, setComments] = useState(null);
  const [favorites, setFavorites] = useState(null);

  const getComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*, profile: profiles(username)")
      .eq("profile_id", userSession.user.id);
    if (error) {
      alert(error.message);
    } else {
      setComments(data);
    }
  };

  const getFavourites = async () => {
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("profile_id", userSession.user.id);
    if (error) {
      alert(error.message);
    } else {
      setFavorites(data);
    }
  };

  useEffect(() => {
    getComments();
    getFavourites();
  },[]);
  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className="tx-secondary text-center my-5">
          Ciao{" "}
          {profile &&
            (profile.username ||
              profile.first_name ||
              userSession.user.user_metadata.full_name)}
        </h1>
      </div>
      <div className="row my-5">
        {/* Sidebar */}
        <div className="col-12 col-md-4 col-lg-3 me-3">
          <div className="row flex-column border-end border-black">
            <div className="col-12 d-flex justify-content-center">
              <img
                src={profile && getProfileImg(profile.avatar_url)}
                alt=""
                style={{ width: "200px", height: "200px" }}
                className="img-fluid rounded-circle"
              />
            </div>
            <div className="col-12 d-flex my-4">
              <p className="tx-secondary">
                Nome: {profile && profile.first_name}
              </p>
            </div>
            <div className="col-12 d-flex my-4">
              <p className="tx-secondary">
                Cognome: {profile && profile.last_name}
              </p>
            </div>
            <div className="col-12 d-flex my-4">
              <p className="tx-secondary">Email: {userSession.user.email}</p>
            </div>
            <div className="col-12 d-flex my-4">
              <p className="tx-secondary">
                Username: {profile && profile.username}
              </p>
            </div>
            <div className="col-12">
              <Link to={"/account/settings"}>
                <p className="tx-secondary">
                  <IoMdSettings />
                </p>
              </Link>
            </div>
          </div>
        </div>
        {/* Commenti e Preferiti */}
        <div className="col-12 col-md-7 col-lg-8">
          <div className="row">
            <h2 className="tx-secondary text-center">I tuoi commenti</h2>
          </div>
          <div className="row my-5">
            {comments && comments.length > 0 ? (
              <Swiper
                modules={[Scrollbar]}
                spaceBetween={10}
                slidesPerView={2}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {comments.map((c) => (
                  <SwiperSlide
                    key={c.id}
                    className="bg-secondary rounded rounded-4"
                  >
                    <div>
                      <article>
                        <h4 className="tx-secondary text-center m-3 text-truncate">
                          {c.comment_title}
                        </h4>
                        <p
                          className="tx-secondary ms-5 my-5"
                          style={{ wordBreak: "break-word" }}
                        >
                          {c.comment_content}
                        </p>
                        <div>
                          <p
                            className="tx-secondary ms-4"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {moment(`${c.created_at}`).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )}{" "}
                            - {c.game_name}
                          </p>
                        </div>
                      </article>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="text-center tx-secondary">
                Non hai ancora inserito nessun commento
              </p>
            )}
          </div>
          <div className="row">
            <h2 className="text-center tx-secondary my-5">
              I tuoi giochi preferiti
            </h2>
          </div>
          <div className="row ">
            {favorites && favorites.length > 0 ? (
              <Swiper
                modules={[Scrollbar]}
                spaceBetween={10}
                slidesPerView={2}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className={style.swiper}
              >
                {favorites.map((gioco) => {
                  return (
                    <SwiperSlide key={gioco.id} className="mb-5">
                      <Link
                        to={`/game/${gioco.game_id}`}
                        className="text-decoration-none"
                      >
                        <button className=" button tx-primary">{gioco.game_name}</button>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <p className="text-center tx-secondary">
                Non hai ancora preferiti
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
