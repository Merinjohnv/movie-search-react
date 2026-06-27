import "./MovieCard.css";

const FALLBACK_IMAGE = "https://via.placeholder.com/200x300?text=No+Poster";

function MovieCard({ movie }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_IMAGE;

  return (
    <div className="movie-card" role="article" aria-label={movie.Title}>
      <div className="movie-poster">
        <img
          src={poster}
          alt={`${movie.Title} poster`}
          loading="lazy"
          onError={(e) => {
            e.target.src = FALLBACK_IMAGE;
          }}
        />
        <div className="movie-overlay">
          <span className="movie-type">{movie.Type}</span>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
