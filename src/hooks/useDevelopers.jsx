import { useEffect, useState } from "react";

export default function useDevelopers() {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    async function getRawgDevelopers() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}developers?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const json = await response.json();
      setDevelopers(json.results);
    }
    getRawgDevelopers();
  },[]);

  return developers
}
