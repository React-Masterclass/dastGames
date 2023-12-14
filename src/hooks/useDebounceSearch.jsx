import { useEffect, useState } from 'react';

function useDebouceSearch(query) {
  const [debounceValue, setDebouceValue] = useState(query);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setDebouceValue(query);
    }, 750);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [query])

  return debounceValue;
}

export default useDebouceSearch;