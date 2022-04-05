import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../Form/Input";

const { error, log } = console;

const Login = (props) => {
    const history = useHistory();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
//   const [error, setError] = useState(null);
//   const [errors, setErrors] = useState([]);
  const [alert, setAlert] = useState({
    type: "d-none",
    message: "",
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    setLogin((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const payload = Object.fromEntries(data.entries());

    const requestOption = {
        method: "POST",
        body: JSON.stringify(payload)
    };

    try {
        const response = await fetch("http://localhost:4000/v1/signin", requestOption);
        if (response.ok) {
            const json = await response.json();
            // log(json);
            if (json.error) {
                setAlert({ type: "alert-danger", message: json.error.message });
            } else {
                props.handleJWT(json);
                localStorage.setItem("jwt", JSON.stringify(json.response))
                history.push("/admin");
            }
        } else {
            const err = new Error("Invalid Credentials");
            error(err);
        }
    } catch (error) {
        error(error.message);
    }

  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  return (
    <>
      <h2>Login</h2>
      <hr />

      {/* <Alert alertType={alert.type} alertMessage={alert.message} /> */}

      <form className="p3" onSubmit={handleSubmit}>
        <Input
          name={"email"}
        //   value={login.email}
          label="Email"
          type="text"
          handleChange={handleChange}
        />

        <Input
          name={"password"}
        //   value={login.password}
          label="Password"
          type="text"
          handleChange={handleChange}
        />

          <button className="btn btn-primary">Login</button>
      </form>
    </>
  );
};

export default Login;
