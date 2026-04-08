import { useState } from "react";
import MovieCard from "./MovieCard";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const API_KEY = "7820d872";
  const fetchMovies = async () => {
    setLoading(true);
    setHasSearched(true);

    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`,
    );
    const data = await response.json();

    setMovies(data.Search || []);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Movie Search App</h1>

      <div
        style={{
          position: "relative",
          display: "inline-block",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchMovies();
            }
          }}
          style={{
            padding: "10px 35px 10px 10px", 
            width: "250px",
          }}
        />

        {search && (
          <span
            onClick={() => {
              setSearch("");
              setMovies([]);
              setHasSearched(false);
            }}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            X
          </span>
        )}
      </div>

      <button
        onClick={fetchMovies}
        style={{ marginLeft: "10px", padding: "10px 20px", cursor: "pointer" }}
      >
        Search
      </button>

      {loading && <p>Loading...</p>}
      {hasSearched && !loading && movies.length === 0 && <p>No movies found</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 250px))",
          gap: "20px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
