import React from "react";
import "./Movie.css";
import tempImg from "./assets/라춘.jpg";

function Movie({ movie }) {
  const { title, year, medium_cover_image, genres, summary } = movie;
  return (
    <div className="movie">
      <img className="movie-img" src={medium_cover_image} />
      <div>
        <h2 className="movie-title">
          <span>{title}</span>
        </h2>
        <h3 className="movie-year">{year}</h3>
        <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
        <ul className="movie-genres">
          <li>
            {genres.map((g) => {
              return <li key={g}>{g}</li>;
            })}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Movie;
