import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const OneGenre = ({ location }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genreName, setGenreName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getOneGenre = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/v1/movies/${id}`);
        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);
          setMovies(data.movies);
          setGenreName(location.genreName);
        } else {
          setError(`Request for genre movies is invalid. Status: ${response.status}`);
        }
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      }
    };

    getOneGenre();
  }, []);

  if (error) return <div>{error}</div>;

  if (!movies) {
    setMovies([]);
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h2>Genre: {genreName}</h2>
      <div className="list-group">
        {movies &&
          movies.map((movie) => (
            <div key={movie.id}>
              <Link
                className="list-group-item list-group-item-action"
                to={`movies/${movie.id}`}
              >
                {movie.title}
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};

export default OneGenre;
