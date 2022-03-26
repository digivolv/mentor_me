// NOTE - This file needs work
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import "./register.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    // Post request to backend
    let loginForm = document.getElementById("loginForm");
    const formData = new FormData(loginForm);

    const loginData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    axios
      .post(`http://localhost:8080/login`, loginData)
      .then((res) => {
        console.log("RESPONSE:", res.data);
        localStorage.setItem("userID", res.data[0].id);
        localStorage.setItem("userPic", res.data[0].picture);
      })
      .catch((error) => console.log("ERROR:", error));

    // Post request to chat engine to set user
    const authObject = {
      "Project-ID": process.env.REACT_APP_CHAT_PROJECT_ID,
      "User-Name": username,
      "User-Secret": password,
    };

    axios
      .get("https://api.chatengine.io/chats", {
        headers: authObject,
      })
      .then(() => {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        navigate(`/`);
        setError("");
      })
      .catch((error) => {
        setError("Error, wrong username or password.");
      });
  };

  return (
    <div className="login">
      <div className="left">
        <div className="logo">
          <h1 className="title">Hello, Friend!</h1>
          <p>
            Enter your details to login and find a mentor
            <br /> to help with your coding questions today 👨🏻‍💻
          </p>
        </div>
      </div>
      <div className="right">
        <h1>Login </h1>
        <form id="loginForm" onSubmit={handleLogin}>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <Button variant="contained" size="large" type="submit">
            Login
          </Button>
        </form>
        <h3>{error}</h3>
        <div>
          New User? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
