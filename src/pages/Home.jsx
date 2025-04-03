import React, { useState } from "react";
import { searchMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState(""); // Movie Type Filter

  // Handle Search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    
    const data = await searchMovies(query, 1, filter);
    
    if (data.Response === "True") {
      setMovies(data.Search);
      setTotalPages(Math.ceil(data.totalResults / 10)); // OMDB returns 10 results per page
    } else {
      setMovies([]);
      setError(data.Error);
    }

    setLoading(false);
    setPage(1);
  };

  // Handle Pagination
  const changePage = async (newPage) => {
    setLoading(true);
    
    const data = await searchMovies(query, newPage, filter);
    
    if (data.Response === "True") {
      setMovies(data.Search);
      setPage(newPage);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Movie Search App 🎬</h1>
      
      {/* Search Form */}
      <form className="flex gap-3 mb-6" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="p-3 border rounded-lg shadow-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600">Search</button>
      </form>

      {/* Loading Indicator */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Movies List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
          >
            Prev
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded-lg">{page} / {totalPages}</span>
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            disabled={page === totalPages}
            onClick={() => changePage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
