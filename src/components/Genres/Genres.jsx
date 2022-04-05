import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Genres = (props) => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getGenres = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:4000/v1/genres");
        if (response.ok) {
          const data = await response.json();
          // console.log(data.genres);
          setGenres(data.genres);
          setIsLoading(false);
        } else {
          setError(`Request for genres is invalid. Status: ${response.status}`);
        }
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      }
    };

    getGenres();
  }, []);

  if (error) return <div>{error}</div>;

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <h2>Genres</h2>
      <div className="list-group">
        {genres.map((m) => {
          return (
            <Link
              key={m.id}
              className="list-group-item list-group-item-action"
              to={{
                pathname: `genre/${m.id}`,
                genreName: m.genre_name,
              }}
            >
              {m.genre_name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Genres;
