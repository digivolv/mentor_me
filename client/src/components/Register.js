import { React } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
import Button from "@mui/material/Button";

function Register() {
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    let loginForm = document.getElementById("loginForm");
    const formData = new FormData(loginForm);

    const data = {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      city: formData.get("city"),
      country: formData.get("country"),
      picture: formData.get("picture"),
    };

    const headers = {
      "PRIVATE-KEY": process.env.REACT_APP_CHAT_PRIVATE_KEY,
    };

    // Request to add user to users database
    axios.post("http://localhost:8080/register", data).then((res) => {
      console.log("Added user to users table").catch((err) => {
        console.log("error:", err);
      });
    });

    // Request to add user to React Chat Engine
    axios
      .post(
        "https://api.chatengine.io/users/",
        {
          username: formData.get("username"),
          secret: formData.get("password"),
        },
        { headers: headers }
      )
      .then((res) => {
        console.log("Added user to react chat engine");
      })
      .catch((err) => {
        console.log("error:", err);
      });

    navigate(`/`);
  };

  return (
    <div className="registration">
      <div className="left">
        <div className="logo">
          <h1 className="title">Hello, Friend!</h1>
          <p>
            Enter your details to register and find a mentor
            <br /> to help with your coding questions today 👨🏻‍💻
          </p>
        </div>
      </div>
      <div className="right">
        <h1>Register </h1>
        <form id="loginForm" onSubmit={handleSubmit}>
          Username: <input type="text" name="username" />
          Name: <input type="text" name="name" />
          Email: <input type="text" name="email" />
          Password:
          <input type="password" name="password" />
          City: <input type="text" name="city" />
          Country:
          <input type="text" name="country" />
          Picture:
          <input type="text" name="picture" />
          <Button variant="contained" size="large" type="submit">
            Register
          </Button>
          <div>
            <br />
            Already registered? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
