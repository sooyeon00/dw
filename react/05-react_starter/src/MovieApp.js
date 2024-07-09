import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import "./MovieApp.css";

function MovieApp(props) {
  const [movies, setMoives] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);
  const url = `https://yts.mx/api/v2/list_movies.json?minimum_rating=&&sort_by=year`;
  const getMovies = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const moviesArr = data.data.movies;
    setMoives(moviesArr);
    SetIsLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="container">
      {isLoading == true ? (
        <div className="loader">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
        </div>
      )}
    </div>
  );
}

export default MovieApp;
