import { useEffect, useState } from "react";

export default function useStores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function getRawgStores() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}stores?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const json = await response.json();
      setStores(json.results);
    }
    getRawgStores();
  },[]);

  return stores
}
