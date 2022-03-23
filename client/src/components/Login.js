// NOTE - This file needs work
import { React, useState } from "react";
import axios from "axios";

function Login() {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // store the states in the form data
    const data = new FormData();
    data.append("username", formValue.username);
    data.append("password", formValue.password);
    console.log("DATA", data);

    axios
      .post("/login", {
        username: data.get("username"),
        password: data.get("password"),
      })
      .then((res) => {
        console.log("success!");
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formValue.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Enter Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
