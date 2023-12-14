import { useEffect, useState } from "react";

export default function useGenres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function getRawgGenres() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}genres?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const json = await response.json();
      setGenres(json.results);
    }
    getRawgGenres();
  },[]);

  return genres
}
