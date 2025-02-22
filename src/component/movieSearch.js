import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movieSlice";
import "../App.css";

const MovieSearch = () => {
  const dispatch = useDispatch();
  const { movies, loading, error, page, totalPages } = useSelector(
    (state) => state.movies
  );
  const [query, setQuery] = useState(""); 

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        dispatch(fetchMovies({ query, page: 1 }));
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchMovies({ query, page: newPage }));
  };

  return (
    <div className="movie-search-container">
      <h1>Movie Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search movies..."
      />

      {loading && <div className="loader"></div>}
      {error && <p className="error-message">Error: {error}</p>}

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
            </div>
          ))
        ) : !loading && query.trim() ? (
          <p className="no-results">No movies found</p>
        ) : null}
      </div>


      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieSearch;
