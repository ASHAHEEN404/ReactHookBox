import { useEffect, useState } from "react";

const KEY = "8575c005"; // My Key. YOU can get yours at https://www.omdbapi.com

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setErrorMessage("");
          const res = await fetch(
            `https://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something Went Wrong While Fetching Movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setErrorMessage("");
        } catch (error) {
          if (error.name !== "AbortError") {
            setErrorMessage(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setErrorMessage("");
        return;
      }
      // handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, errorMessage };
}
