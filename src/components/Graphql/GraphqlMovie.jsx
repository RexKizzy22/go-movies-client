import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GraphqlMovie = () => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getOneMovie = async () => {
      setIsLoading(true);

      const payload = `
                {
                    movie(id: ${id}) {
                        id
                        title
                        runtime
                        year
                        description
                        mpaa_rating
                        poster
                    }
                }
            `;

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        body: payload,
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "http://localhost:4000/v1/graphql",
          requestOptions
        );
        if (response.ok) {
          const data = await response.json();
        //   log(data);
          setMovie(data.data.movie);
        } else {
          setError(`Request for movies is invalid. Status: ${response.status}`);
        }
      } catch (error) {
        setError(error.message);
        console.error(error.message);
      }

      setIsLoading(false);
    };

    getOneMovie();
  }, []);

  if (error) return <div>{error}</div>;

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h2>
        Movie: {movie.title} {movie.year}
      </h2>

      {movie.poster !== "" && (
          <div>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster}`} alt="poster" />
          </div>
      )}

      <div className="float-start">
        <small>Rating: {movie.mpaa_rating}</small>
      </div>
      {/* <div className="float-end">
        {movie.genres.map((m, index) => {
          <span className="badge bg-secondary me-1" key={index}>
            {m}
          </span>;
        })}
      </div> */}

      <hr />

      <table className="table table-compact table-striped">
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <strong>Title:</strong>
            </td>
            <td>
              {movie.title} {movie.id}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Runtime:</strong>
            </td>
            <td>{movie.runtime} minutes</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GraphqlMovie;
