// NOTE - This file needs work
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import "./register.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const authObject = {
      "Project-ID": process.env.REACT_APP_CHAT_PROJECT_ID,
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      navigate(`/search`);
      setError("");
    } catch (err) {
      setError("Error, wrong username or password.");
    }
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          Password:
          <input
            type="password"
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
      </div>
    </div>

    ////////////////////// OLD VERSION ////////////////////////////
    // <div>
    //   <h1>Login Page</h1>
    //   <form onSubmit={handleLogin}>
    //     <input
    //       type="text"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //       placeholder="Enter Username"
    //       required
    //     />
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Enter Password"
    //       required
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    //   <h3>{error}</h3>
    // </div>

    ////////////////////////////////////////////////////////////////
  );
}

export default Login;
