import { useState, useEffect, useContext } from "react";
import supabase from "../../supabase/client";
import AppContext from "../../contexts/Appcontext.jsx";
import Avatar from "../../components/Avatar";
import style from "../../pages/Register/Register.module.css";

export default function Settings() {
  const { userSession } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [first_name, setfirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setLoading(true);
      const { user } = userSession;

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, first_name, last_name, avatar_url`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setfirstName(data.first_name);
          setLastName(data.last_name);
          setAvatarUrl(data.avatar_url);
        }
      }

      setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [userSession]);

  async function updateProfile(event, avatarUrl) {
    event.preventDefault();

    if (username && username.length < 3) {
      setError("Il nome utente deve contenere almeno 3 caratteri.");
      return;
    } else {
      setError(null);
    }

    setLoading(true);
    const { user } = userSession;

    const updates = {
      id: user.id,
      username,
      first_name,
      last_name,
      avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    } else {
      setAvatarUrl(avatarUrl);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={(e) => updateProfile(e, avatar_url)} className={`container`}>
      <div className="row">
        <h1 className="tx-secondary my-5 text-center">Impostazioni Profilo</h1>
      </div>
      <div className="row justify-content-center my-4">
        <div className="col-12 d-flex justify-content-start justify-content-md-center">
          <Avatar
            url={avatar_url}
            size={150}
            onUpload={(event, url) => {
              updateProfile(event, url);
            }}
          />
        </div>
      </div>

      <div className="row w-75 mx-auto my-4">
        <div className="col-12 col-lg-6 d-flex flex-column align-items-center ">
          <label htmlFor="first_name">
            <p className="tx-secondary">Nome</p>
            <input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="First name"
              className={`${style.field}`}
              value={first_name || ""}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </label>
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column align-items-center ">
          <label htmlFor="last_name" className="tx-secondary">
            <p>Cognome</p>
            <input
              type="text"
              id="last_name"
              name="last_name"
              placeholder="Last name"
              className={`${style.field}`}
              value={last_name || ""}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="row w-75 mx-auto my-4">
        <div className="col-12 col-lg-6 d-flex flex-column align-items-center ">
          <label htmlFor="email">
            <p className="tx-secondary">Email</p>
            <input
              id="email"
              type="text"
              className={`${style.field}`}
              value={userSession.user.email}
              disabled
            />
          </label>
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column align-items-center ">
          <label htmlFor="username">
            <p className="tx-secondary">Username</p>
            <input
              id="username"
              type="text"
              className={`${style.field}`}
              value={username || ""}
              placeholder="Username"
              onChange={(e) => {
                const value = e.target.value;
                value == 0 ? setUsername(null) : setUsername(value);
                setError(value.length < 3 && value.length != 0 ? "Il nome utente deve contenere almeno 3 caratteri." : null);
              }}
            />
          </label>
          {error && (
            <div style={{ color: "red" }}>
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="row justify-content-center w-25 mx-auto my-5">
        <button
          type="submit"
          disabled={loading}
          className=" mx-auto tx-secondary btn btn-success"
        >
          {loading ? "Caricamento ..." : "Aggiorna Profilo"}
        </button>
      </div>
      <div className="row w-75 mx-auto ">
        <div className="col-12 d-flex justify-content-center">
          <button
            className="btn btn-danger tx-secondary"
            type="button"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    </form>
  );
}
