import { useLoaderData } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useProfile from "../../hooks/useProfile";
import supabase from "../../supabase/client";
import Messages from "../../components/Messages/Messages";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Comments from "../../components/Comments/Comments";
import style from "../GameDetail/GameDetail.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import { IoMdSend } from "react-icons/io";
import { LuStarOff } from "react-icons/lu";
import { LuStar } from "react-icons/lu";
import AppContext from "../../contexts/Appcontext";

export async function getSingleGame({ params }) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}games/${params.gameId}?key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const json = await response.json();
  return json;
}


export default function GameDetail() {
  const game  = useLoaderData();
  const { profile } = useProfile();
  const [favorites, setFavorites] = useState([]);
  const [gamesScreenshoots, setGameScreenshoots] = useState({});
  const [loadingScreenshoots, setLoadingScreenshoots] = useState(true);
  const { userSession } = useContext(AppContext);
  const SignupSchema = Yup.object().shape({
    content: Yup.string().required(),
  });
  const getGamesScreenshoots = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}games/${game.id}/screenshots?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const json = await response.json();
      setGameScreenshoots(json);
    } catch (error) {
      console.error("Error fetching game data:", error);
    } finally {
      setLoadingScreenshoots(false);
    }
  };

  const getFavGame = async () => {
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("game_id", game.id)
      .eq("profile_id", userSession.user.id);
    if (error) {
      alert(error.message);
    } else {
      setFavorites(() => [...data]);
    }
  };

  const addToFavorites = async () => {
    const { error } = await supabase
      .from("favorites")
      .insert([
        {
          game_id: game.id,
          profile_id: profile && profile.id,
          game_name : game.name,
        },
      ])
      .select();
    if (error) {
      alert(error.message);
    } else {
      getFavGame();
    }
  };

  const removeFromFavorites = async () => {
    console.log(favorites[0].game_id);
    console.log(game.id);
    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("game_id", favorites[0].game_id)
        .eq("profile_id", userSession.user.id);

      if (error) {
        console.error("Error removing from favorites:", error.message);
      } else {
        getFavGame();
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  const sendMessage = async (values, { resetForm }) => {
    try {
      const { error } = await supabase
        .from("messages")
        .insert([
          {
            content: values.content,
            profile_id: profile.id,
            game_id: game.id,
          },
        ])
        .select();
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.error_description || error.message);
      } else {
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGamesScreenshoots();
    if (userSession) {
      getFavGame();
    }
  }, []);
  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center my-5 tx-secondary">{game.name}</h1>
      </div>
      <div className="row mt-4">
        <div className="col-12 col-lg-6">
          {/* tempo medio di gioco */}
          <div className="row my-2">
            <div className="col-6 d-flex align-items-center">
              <p className="tx-secondary m-0">
                Tempo di gioco medio : {game.playtime} ore
              </p>
            </div>
            <div className="col-6 d-flex align-items-center m-0">
              {profile &&
                <div>
                  {favorites.length !== 0 ? (
                <button
                  type="button"
                  className={`${style.favoriteButton}`}
                  onClick={removeFromFavorites}
                >
                  <LuStarOff />{" "}
                </button>
              ) : (
                <button
                  type="button"
                  className={style.favoriteButton}
                  onClick={addToFavorites}
                >
                  <LuStar />

                </button>
              )}
                </div>
            }

            </div>
          </div>
          {/* immagine compertina */}
          <div className="row">
            <img src={game.background_image} alt="" className="img-fluid" />
          </div>
          <h4 className="tx-secondary my-3">Piattaforme compatibili</h4>
          <p className="tx-secondary">
            {game.platforms.map((data) => {
                  return (
                    <button
                      key={data.platform.id}
                      className={style.platformsButton}
                    >
                      {data.platform.name}
                    </button>
                  );
                })}
          </p>

          <div>
            <Swiper
              // install Swiper modules
              modules={[Scrollbar]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {loadingScreenshoots
                ? "Caricamento"
                : gamesScreenshoots.results.map((img) => {
                    if (img.id != -1) {
                      return (
                        <SwiperSlide key={img.id}>
                          <img src={img.image} alt="" className="img-fluid" />
                        </SwiperSlide>
                      );
                    }
                  })}
            </Swiper>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="row">
            <h3 className="m-0 text-center tx-secondary">Live chat</h3>
          </div>
          <div className="row">
            {profile ? (
              <div>
                <div id="chat-container" className="row mx-auto my-5">
                  <Messages game={game} />
                </div>
                <Formik
                  initialValues={{
                    content: "",
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={sendMessage}
                >
                  {({ errors, touched }) => (
                    <Form className="row align-items-center">
                      <div className="col-9">
                        <Field
                          type="text"
                          className={`w-100 ${style.sendMessageInput}`}
                          name="content"
                          placeholder={
                            errors.content && touched.content
                              ? errors.content
                              : "Invia un messaggio"
                          }
                        />
                      </div>
                      <div className="col-3">
                        <button type="submit" className={style.buttons}>
                          Invia <IoMdSend />
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            ) : (
              <div className="row">
                <p className="text-center tx-secondary my-4">
                  Fai il login per chattare con gli altri gamer
                </p>
              </div>
            )}
          </div>
          <div className="row">
            <h3 className="tx-secondary text-center my-5">Commenti</h3>
          </div>
          <div className="row">
            <Comments game={game} />
          </div>
          <div className="row">
            {profile ? (
              <Link to={`/game/${game.id}/comment`} state={game}>
                <button type="submit" className={`${style.buttons} w-100 mt-3`}>
                  Aggiungi un commento
                </button>
              </Link>
            ) : (
              <p className="text-center tx-secondary my-4">
                Fai il login per inviare un commento
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="row">
          <h3 className="tx-secondary text-center">Descrizione</h3>
        </div>
        <div className="row">
          <p className="tx-secondary">{game.description_raw}</p>
        </div>
      </div>
    </div>
  );
}
