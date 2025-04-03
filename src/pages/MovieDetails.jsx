import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieService";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError("");

      const data = await getMovieDetails(id);
      if (data.Response === "True") {
        setMovie(data);
      } else {
        setError(data.Error);
      }

      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  // Add to Favorites (Local Storage)
  const addToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Added to favorites!");
    } else {
      alert("Already in favorites!");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Movie Poster */}
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"}
          alt={movie.Title}
          className="w-full md:w-1/3 rounded-lg shadow-md"
        />

        {/* Movie Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{movie.Title}</h1>
          <p className="text-gray-500">{movie.Year} • {movie.Genre} • {movie.Runtime}</p>
          <p className="mt-4">{movie.Plot}</p>

          {/* Ratings */}
          <div className="mt-4">
            <h3 className="font-semibold">Ratings:</h3>
            {movie.Ratings?.map((rating, index) => (
              <p key={index} className="text-gray-600">{rating.Source}: {rating.Value}</p>
            ))}
          </div>

          {/* Director, Actors */}
          <p className="mt-4"><strong>Director:</strong> {movie.Director}</p>
          <p className="mt-2"><strong>Cast:</strong> {movie.Actors}</p>

          {/* Add to Favorites Button */}
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={addToFavorites}
          >
            Add to Favorites ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
