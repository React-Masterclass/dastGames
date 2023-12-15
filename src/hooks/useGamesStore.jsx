import { useEffect, useState } from "react";
import useDebouceSearch from "./useDebounceSearch";


export default function useGamesPlatform() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(1);
  const [search, setSearch] = useState("");
  const [store, setStore] = useState("");
  const debouncedSearch = useDebouceSearch(search);


  useEffect(() => {
    async function getAPI() {
      setError("");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page=${pagination}&page_size=20&stores=${store}&search=${search}`
        );
        if (response.ok) {
          const json = await response.json();
          setGames(json.results);
        } else {
          setError("Errore nella richiesta dei videogiochi");
        }
      } catch (error) {
        setError(`Errore nella richiesta - ${error.message} `);
      }
      setLoading(false);
    }

    getAPI();
  }, [pagination, debouncedSearch , store]);

  const setSearchAndFetch = (newSearch) => {
    setSearch(newSearch);
    setPagination(1); // Reset pagination when search changes
  };

  const setPaginationAndFetch = (newPagination) => {
    setPagination(newPagination);
  };

  const setStoreAndFetch = (newStore) =>{
    setStore(newStore);
  };

  return {
    games,
    error,
    loading,
    pagination,
    search,
    setStore : setStoreAndFetch,
    setSearch: setSearchAndFetch,
    setPagination: setPaginationAndFetch,
  };
}
