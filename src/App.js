import React, { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");       
  const [movies, setMovies] = useState([]);     
  const [error, setError] = useState("");

  const apiKey = "c3b52665"; 

  
  const searchMovies = async () => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movies.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎬 Movie Database</h1>

      {}
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />
      <button onClick={searchMovies} style={{ padding: "10px 20px", marginLeft: "10px" }}>
        Search
      </button>

      {}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "20px" }}>
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              margin: "10px",
              padding: "10px",
              width: "200px",
            }}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}
              alt={movie.Title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
