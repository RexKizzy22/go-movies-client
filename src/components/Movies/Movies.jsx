import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      
      try {
        const response = await fetch("http://localhost:4000/v1/movies");
        if (response.ok) {
          const data = await response.json();
          setMovies(data.movies);
        } else {
          setError(`Request for movies is invalid. Status: ${response.status}`);
        }
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      }
    };

    getMovies();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return !isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="list-group">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          className="list-group-item list-group-item-action"
          to={`movie/${movie.id}`}
        >
          {movie.title}
        </Link>
      ))}
    </div>
  );
};

export default Movies;
