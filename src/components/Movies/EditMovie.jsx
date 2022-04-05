import { useEffect, useState } from "react";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import Select from "../Form/Select";
import "./EditMovie.css";
import { Link, useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const { log } = console;

const EditMovie = (props) => {
  const history = useHistory();
  const [movie, setMovie] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const ratings = ["G", "PG", "PG13", "R", "NC17"];

  useEffect(() => {
    if (props.jwt === "") {
      history.push("/login");
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setMovie((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const payload = Object.fromEntries(data.entries());
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${props.jwt}`);

    const options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers
    };

    try {
      const response = await fetch(
        "http://localhost:4000/v1/admin/edit-movie",
        options
      );
      if (response.ok) {
        const resData = await response.json();
        console.log(resData);
      } else {
        let err = new Error(
          "Unsuccessful post request. Status " + response.status
        );
        console.error(err.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const hasError = (key) => {
    return movie.title.indexOf(key) !== -1;
  };

  const confirmDelete = () => {
    confirmAlert({
      title: "Delete?",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await fetch(
                `http://localhost:4000/v1/admin/delete-movie${movie.id}`
              );
              if (response.ok) {
                const data = response.json();
                if (data.error) {
                  setError(data.error.message);
                  alert({ type: "alert-danger", message: data.error.message });
                } else {
                  alert({
                    type: "alert-success",
                    message: `Successfully deleted movie ${movie.id}`,
                  });
                  history.push("/admin");
                }
              }
            } catch (error) {
              setError(error.message);
              console.error(error.message);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  if (error) return <div>{error}</div>;

  return isLoaded ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1>Add/Edit Movie</h1>
      <hr />
      <form method="POST" onSubmit={handleSubmit}>
        <input type="hidden" id="id" name="id" value={movie.id} />

        <Input
          type="text"
          name="title"
          // value={movie.title}
          handleChange={handleChange}
          label="Title"
        />

        <Input
          type="date"
          name="release_date"
          // value={movie.release_date}
          handleChange={handleChange}
          label="Release Date"
        />

        <Input
          type="text"
          name="runtime"
          // value={movie.runtime}
          handleChange={handleChange}
          label="Runtime"
        />

        <Select
          name="mpaa_rating"
          // value={movie.mpaa_rating}
          label="MPAA Rating"
          handleChange={handleChange}
          ratings={ratings}
          placeholder="Choose..."
        />

        <Input
          type="text"
          name="rating"
          // value={movie.rating}
          handleChange={handleChange}
          label="Rating"
          ratings={ratings}
        />

        <Textarea
          name="description"
          value={movie.description}
          handleChange={handleChange}
          label="Description"
        />

        <hr />

        <div className="buttons">
          <button className="btn btn-primary">Save</button>

          <Link to="/admin" className="btn btn-warning ms-1">
            Cancel
          </Link>

          <Link to="/danger" className="btn btn-danger ms-1">
            Delete
          </Link>

          {movie.id > 0 && (
            <a
              href="#!"
              onClick={() => confirmDelete()}
              className="btn btn-danger ms-1"
            >
              Delete
            </a>
          )}
        </div>
      </form>
    </>
  );
};

export default EditMovie;
