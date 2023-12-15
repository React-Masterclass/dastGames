import { useEffect, useState } from "react";

export default function usePublishers() {
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    async function getRawgPublishers() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}publishers?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const json = await response.json();
      setPublishers(json.results);
    }
    getRawgPublishers();
  },[]);

  return publishers
}
