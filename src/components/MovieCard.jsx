import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MovieCard = ({ movie }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition"
    >
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
          alt={movie.Title}
          className="w-full h-60 object-cover rounded-md"
        />
        <h2 className="text-lg font-bold mt-2 dark:text-white">{movie.Title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{movie.Year}</p>
      </Link>
    </motion.div>
  );
};

export default MovieCard;
