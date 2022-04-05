import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Form/Input";

const { log } = console;

const Graphql = () => {
  const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [error, setError] = useState(null);
  // const [alert, setAlert] = useState({
  //     type: "d-none",
  //     message: ""
  // });

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    if (value.length > 2) {
      performSearch();
    } else {
      setMovies([]);
    }
  };

  const performSearch = async () => {
    const payload = `
            {
                search(titleContains: "${searchTerm}") {
                    id
                    title
                    runtime
                    year
                    description
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

    const response = await fetch(
      "http://localhost:4000/v1/graphql",
      requestOptions
    );
    const data = await response.json();
    log(data);

    if (len(data.data.search) > 0) {
      setMovies(data.data.search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    const getMovies = async () => {
      const payload = `
                {
                    list {
                        id
                        title
                        runtime
                        year
                        description
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

      const response = await fetch(
        "http://localhost:4000/v1/graphql",
        requestOptions
      );
      const data = await response.json();
      log(data.data.list);
      setMovies(data.data.list);
    };

    getMovies();
  }, []);

  return (
    <>
      <h2>Graphql</h2>
      <hr />

      <Input
        name="search"
        label="Search by Title"
        type="text"
        handleChange={handleChange}
      />

      <div className="list-group">
        {movies.map((m) => (
          <Link
            key={m.id}
            className="list-group-item list-group-item-action"
            to={`moviesgraphql/${m.id}`}
          >
            <strong>{m.title}</strong>
            <small className="text-muted">
              ({m.year}) - {m.runtime} minutes
            </small>
            <br />{m.description.slice(0, 100)}...
          </Link>
        ))}
      </div>
    </>
  );
};

export default Graphql;
