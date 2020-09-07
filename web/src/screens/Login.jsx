import React, { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
var validator = require("email-validator");

const LOGIN = "login";
const REGISTER = "register";

const Login = () => {
  const [func, setFunc] = useState(LOGIN);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const history = useHistory();
  const handleRegisterClick = () => {
    resetStates();
    setFunc(REGISTER);
  };

  const handleLoginClick = () => {
    resetStates();
    setFunc(LOGIN);
  };

  const resetStates = () => {
    setUsername("");
    setPassword("");
    setConfPassword("");
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confPassword":
        setConfPassword(value);
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (func === LOGIN) {
      login();
    } else {
      register();
    }
  };

  const register = () => {
    if (!username) {
      return toast("Please enter user name");
    }
    if (!validator.validate(username)) {
      return toast("Invalid email address");
    }
    if (!password) {
      return toast("Please enter password");
    }
    if (password !== confPassword) {
      return toast("Password dose not match");
    }
    axios
      .post(
        "https://us-central1-ar-card-cb010.cloudfunctions.net/app/api/users",
        { username, password }
      )
      .then((result) => {
        toast("register successfully");
        console.log(result.data); // user id
        axios
          .post(
            "https://us-central1-ar-card-cb010.cloudfunctions.net/app/api/profiles",
            { id: result.data, userId: result.data }
          )
          .then(() => {
            // handle update success
          })
          .catch((err) => {
            console.log(err);
            toast("err");
          });
      })
      .catch((err) => {
        err.response.status === 409
          ? toast("Username already registered")
          : toast("Internal server error");
      });
  };

  const login = () => {
    axios
      .post(
        "https://us-central1-ar-card-cb010.cloudfunctions.net/app/api/users/login",
        { username, password }
      )
      .then((result) => {
        toast("Login successfully");
        history.push({ pathname: "/home", state: { userId: result.data.id } });
        console.log(result.data.id);
      })
      .catch((err) => {
        console.log(err);
        err.response.status === 400
          ? toast("Wrong username or password!")
          : toast("Internal server error");
      });
  };
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-4 m-auto">
          {func === LOGIN && (
            <div>
              <h2>Login</h2>
              <form onSubmit={handleSubmit}>
                <Input
                  label="Email"
                  name="username"
                  onChange={handleInputChange}
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                />
                <button type="submit" class="btn btn-info">
                  Login
                </button>
                <button
                  className="btn btn-warning ml-2"
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
              </form>
            </div>
          )}
          {func === REGISTER && (
            <div>
              <h2>Register</h2>
              <form onSubmit={handleSubmit}>
                <Input
                  label="User name"
                  name="username"
                  onChange={handleInputChange}
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                />
                <Input
                  label="Confirm password"
                  type="password"
                  name="confPassword"
                  onChange={handleInputChange}
                />
                <button type="submit" class="btn btn-info">
                  Login
                </button>
                or
                <button
                  onClick={handleLoginClick}
                  className="btn btn-warning ml-2"
                >
                  Register
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
