function MovieCard({ movie }) {
  return (
    <div style={{
      textAlign: "center",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "10px",
      backgroundColor: "#f9f9f9"
    }}>
      <h3 style={{ fontSize: "16px" }}>{movie.Title}</h3>

      <img
        src={movie.Poster}
        alt={movie.Title}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />

      <p>{movie.Year}</p>
    </div>
  );
}

export default MovieCard;