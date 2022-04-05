import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from "react-router-dom";

import Home from "./components/Home/Home";
import Movies from "./components/Movies/Movies";
import OneMovie from "./components/Movies/OneMovie";
import EditMovie from "./components/Movies/EditMovie";
import Genres from "./components/Genres/Genres";
import Admin from "./components/Admin/Admin";
import OneGenre from "./components/Genres/OneGenre";
import Login from "./components/Login/Login";
import GraphqlMovie from "./components/Graphql/GraphqlMovie";

// import "./App.css";
import Graphql from "./components/Graphql/Graphql";

const { log } = console;

const App = () => {
  const [jwt, setJWT] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      if (jwt === "") {
        setJWT(JSON.parse(token));
      }
    }
    log("APP", jwt);
  }, []);

  const handleJWT = (jwt) => {
    setJWT(jwt);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setJWT("");
  };

  let LoginLink;

  if (jwt === "") {
    LoginLink = <NavLink to="/login">Login</NavLink>;
  } else {
    LoginLink = (
      <NavLink to="/logout" onClick={logout}>
        Logout
      </NavLink>
    );
  }

  return (
    <Router>
      <div className="container">
        <div className="row">
          <div className="col mt-3">
            <h1 className="mt-3">Go Watch a Movie!</h1>
          </div>

          <div className="col mt-3 text-end">{LoginLink}</div>
        </div>

        <hr className="mb-3" />

        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/movies">Movies</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/genres">Genres</Link>
                </li>
                {jwt !== "" && (
                  <>
                    <li className="list-group-item">
                      <Link to="/admin/add">Add Movie</Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/admin">Manage Catalogue</Link>
                    </li>
                  </>
                )}
                <li className="list-group-item">
                  <Link to="/graphql">GraphQL</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-md-10">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/movie/:id" component={OneMovie} />

              <Route exact path="/moviesgraphql/:id" component={GraphqlMovie} />

              <Route exact path="/genres">
                <Genres />
              </Route>

              <Route exact path="/graphql">
                <Graphql />
              </Route>

              <Route exact path="/genre/:id" component={OneGenre} />

              <Route
                exact
                path="/admin/add"
                component={(props) => <EditMovie {...props} jwt={jwt} />}
              />

              <Route exact path="/movies">
                <Movies />
              </Route>

              <Route
                exact
                path="/login"
                component={(props) => (
                  <Login {...props} handleJWT={handleJWT} />
                )}
              />

              <Route
                exact
                path="/admin"
                component={(props) => (
                  <Admin {...props} jwt={jwt} setJWT={setJWT} />
                )}
              />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
