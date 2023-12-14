import { useEffect, useState } from "react";

export default function usePlatforms() {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    async function getRawgPlatforms() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}platforms?key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const json = await response.json();
      setPlatforms(json.results);
    }
    getRawgPlatforms();
  },[]);

  return platforms
}
