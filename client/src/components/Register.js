// NOTE - This page needs WORK
import { React } from "react";
import axios from "axios";

const handleSubmit = (event) => {
  event.preventDefault();
  let loginForm = document.getElementById("loginForm");
  const formData = new FormData(loginForm);
  // for (let key of formData.keys()) {
  //   console.log("KEY:", key);
  // }
  // for (let value of formData.values()) {
  //   console.log("VALUES:", value);
  // }

  console.log("USERNAME:", formData.get("username"));
  axios
    .post("http://localhost:8080/register", {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      city: formData.get("city"),
      country: formData.get("country"),
      picture: formData.get("picture"),
    })
    .then((res) => {
      console.log("successful!");
    })
    .catch((err) => {
      console.log("ERROR:", err);
    });
};

function Register() {
  return (
    <div>
      <h1>Registration Page </h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        Username: <input type="text" name="username" />
        Name: <input type="text" name="name" />
        Email: <input type="text" name="email" />
        Password: <input type="password" name="password" />
        City: <input type="text" name="city" />
        Country: <input type="text" name="country" />
        Picture: <input type="text" name="picture" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
