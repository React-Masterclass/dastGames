import Card from "../../components/Card/Card";
import useRawgAPI from "../../hooks/useRawgAPI";
import SearchBar from "../../components/SearchBar/SearchBar";
import style from "../../pages/Home/Home.module.css";
import { Audio } from "react-loader-spinner";

function Home() {
  const {
    games,
    error,
    loading,
    search,
    setSearch,
    pagination,
    setPagination,
  } = useRawgAPI();
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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="d-flex flex-column">
      {loading && (
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
      )}
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
      <h1 className="text-center my-4 tx-secondary">Nuovi e di tendenza</h1>
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

export default Home;
