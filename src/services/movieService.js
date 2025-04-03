import axios from "axios";

const API_KEY = "http://www.omdbapi.com/?i=tt3896198&apikey=353ee81e"; // Replace with your OMDB API key
const BASE_URL = "https://www.omdbapi.com/";

// Function to search movies by title
export const searchMovies = async (query, page = 1, type = "") => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        s: query,
        page,
        type, // Movie type filter (movie, series, episode)
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { Response: "False", Error: "Failed to fetch movies" };
  }
};

// Function to get movie details by ID
export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        i: movieId,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return { Response: "False", Error: "Failed to fetch movie details" };
  }
};
