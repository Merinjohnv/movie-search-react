import { useState, useEffect, useRef, useCallback } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY || "7820d872";

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (term) => {
    if (!term.trim()) return;
    setLoading(true);
    setHasSearched(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(term)}&apikey=${API_KEY}`
      );
      if (!response.ok) throw new Error("Network error. Please try again.");
      const data = await response.json();
      if (data.Error) throw new Error(data.Error);
      setMovies(data.Search || []);
    } catch (err) {
      setMovies([]);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Debounced version — fires 500ms after user stops typing
  const debouncedFetch = useCallback(
    debounce((term) => fetchMovies(term), 500),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      debouncedFetch(value);
    } else {
      setMovies([]);
      setHasSearched(false);
      setError("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchMovies(search);
  };

  const handleClear = () => {
    setSearch("");
    setMovies([]);
    setHasSearched(false);
    setError("");
  };

  return (
    <div className="app">
      <h1>🎬 Movie Search</h1>

      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="search-input"
          aria-label="Search movies"
        />
        {search && (
          <button
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <button
          className="search-btn"
          onClick={() => fetchMovies(search)}
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {loading && <p className="status-msg">Loading...</p>}

      {error && <p className="error-msg" role="alert">{error}</p>}

      {hasSearched && !loading && !error && movies.length === 0 && (
        <p className="status-msg">No movies found for "{search}"</p>
      )}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;