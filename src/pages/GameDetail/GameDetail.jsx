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
import { Pagination, Scrollbar,Navigation } from "swiper/modules";
import { IoMdSend } from "react-icons/io";
import { LuStarOff } from "react-icons/lu";
import { LuStar } from "react-icons/lu";
import AppContext from "../../contexts/Appcontext";
import { Audio } from "react-loader-spinner";
import { Media, Video } from "@vidstack/player-react";

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
  const game = useLoaderData();
  const { profile } = useProfile();
  const [favorites, setFavorites] = useState([]);
  const [gamesScreenshoots, setGameScreenshoots] = useState({});
  const [loadingScreenshoots, setLoadingScreenshoots] = useState(true);
  const [gamesMovies, setGameMovies] = useState({});
  const [loadingMovies, setLoadingMovies] = useState(true);
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

  const getGamesMovies = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}games/${game.id}/movies?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const json = await response.json();
      setGameMovies(json);
    } catch (error) {
      console.error("Error fetching game data:", error);
    } finally {
      setLoadingMovies(false);
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
          game_name: game.name,
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
    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("id", favorites[0].id)
        .eq("game_id", game.id)
        .eq("profile_id", userSession.user.id)
        .eq("game_name", game.name);

      if (error) {
        console.error("Error removing from favorites:", error.message);
      } else {
        getFavGame();
        console.log("in teoria cancellato");
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
    getGamesMovies();
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
        {/* tempo medio di gioco e preferiti, copertina e piattaforme */}
        <div className="col-12 col-lg-6">
          <div className="row my-2">
            {/* tempo medio di gioco */}
            <div className="col-6 d-flex align-items-center">
              <p className="tx-secondary m-0">
                Tempo di gioco medio : {game.playtime} ore
              </p>
            </div>
            {/* preferiti */}
            <div className="col-6 d-flex align-items-center m-0">
              {profile && (
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
              )}
            </div>
          </div>
          {/* immagine compertina */}
          <div className="row">
            <img src={game.background_image} alt="" className="img-fluid" />
          </div>
          {/* lista piattaforme */}
          <section>
            <div className="row">
              <h4 className="tx-secondary my-3">Piattaforme compatibili</h4>
            </div>
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
          </section>
          {/* Game screenshots */}
          <section>
            <Swiper
              // install Swiper modules
              modules={[Scrollbar]}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {loadingScreenshoots ? (
                <Audio
                  height="40"
                  width="40"
                  radius="9"
                  color="grey"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                  className="mt-5"
                />
              ) : (
                gamesScreenshoots.results.map((img) => {
                  if (img.id != -1) {
                    return (
                      <SwiperSlide key={img.id}>
                        <img src={img.image} alt="" className="img-fluid" />
                      </SwiperSlide>
                    );
                  }
                })
              )}
            </Swiper>
          </section>
        </div>
        {/* live chat e commenti */}
        <div className="col-12 col-lg-6">
          {/* live chat */}
          <section>
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
                          <button type="submit" className={`btn btn-success`}>
                            <IoMdSend />
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
          </section>
          {/* commenti */}
          <section>
            <div className="row">
              <h3 className="tx-secondary text-center my-5">Commenti</h3>
            </div>
            <div className="row">
              <Comments game={game} />
            </div>
            <div className="row">
              {profile ? (
                <Link to={`/game/${game.id}/comment`} state={game}>
                  <button
                    type="submit"
                    className={`${style.buttons} w-100 mt-3`}
                  >
                    Aggiungi un commento
                  </button>
                </Link>
              ) : (
                <p className="text-center tx-secondary my-4">
                  Fai il login per inviare un commento
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
      {/* descrizione */}
      <div className="row my-4">
        <div className="row">
          <h3 className="tx-secondary text-center">Descrizione</h3>
        </div>
        <div className="row">
          <p className="tx-secondary">{game.description_raw}</p>
        </div>
      </div>
{
  gamesMovies.count !== 0 ? <section>
  <div className="row mt-5">
    <h3 className="text-center tx-secondary">
      Trailers
    </h3>
    <p className="tx-secondary text-center">scorri per vederli tutti</p>
  </div>
  <Swiper
    // install Swiper modules
    modules={[Scrollbar, Pagination]}
    spaceBetween={10}
    slidesPerView={1}

    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
  >
    {loadingMovies ? (
      <Audio
        height="40"
        width="40"
        radius="9"
        color="grey"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
        className="mt-5"
      />
    ) : (

      gamesMovies.results.map((movie) => {
        return (
          <SwiperSlide key={movie.id}>
            <Media>
              <Video
                loading="visible"
                poster={movie.preview}
                controls
                preload="true"
              >
                <video
                  loading="visible"
                  poster={movie.preview}
                  src={movie.data.max}
                  preload="none"
                  data-video="0"
                  controls
                />
              </Video>
            </Media>
          </SwiperSlide>
        );
      })
    )}
  </Swiper>
</section> : <p className="tx-secondary text-center">nessun trailer disponibile</p>
}

    </div>
  );
}
