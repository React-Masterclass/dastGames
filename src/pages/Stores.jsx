import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Card from "../components/Card/Card";
import useGamesStore from "../hooks/useGamesStore";
import useStores from "../hooks/useStores";
import SearchBar from "../components/SearchBar/SearchBar";
import style from "../pages/Home/Home.module.css"

export default function Stores() {
  const { storeId } = useParams();
  const stores = useStores();

  let storeName;
console.log(stores);
  stores.map((store) => {
    if (store.id == storeId) {
      storeName = store.name;
    }
  });

  const {
    games,
    error,
    loading,
    pagination,
    search,
    setStore,
    setSearch,
    setPagination,
  } = useGamesStore();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePaginationClicknext = () => {
    setPagination(pagination + 1);
    handleScrollToTop();

  };
  const handlePaginationClickbef = () => {
    if (pagination > 1) {
      setPagination(pagination - 1);
    handleScrollToTop();

    }
  };

  useEffect(() => {
    setStore(storeId);
  },[]);

  return (
    <div className="d-flex flex-column">
      {loading && "Caricamento..."}
      {error && (
        <article
          style={{
            backgroundColor: "red",
            color: "white",
          }}
        >
          {error}
        </article>
      )}
      <h1 className="text-center my-4 tx-secondary">Giochi disponibili su {storeName}</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="container-fluid">
        <div className="row justify-content-center">
          {games.map((game) => {
            return (
              <div key={game.id} className="col-12 col-md-6 col-lg-4">
                <Card game={game} />
              </div>
            );
          })}
        </div>
      </div>
      <hr className="tx-secondary" />
      <div className="row w-100 m-0 justify-content-between">
        <div className="col-4 d-flex justify-content-end">
          <button
            className={style.pageButton}
            onClick={handlePaginationClickbef}
          >
            -
          </button>
        </div>
        <div className="col-4 d-flex justify-content-center tx-secondary">
          <p>{pagination}</p>
        </div>
        <div className="col-4 d-flex justify-content-start">
          <button
            className={style.pageButton}
            onClick={handlePaginationClicknext}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
