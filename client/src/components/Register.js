// NOTE - This page needs WORK
import { React } from "react";
import axios from "axios";

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
    "PRIVATE-KEY": "36cade4b-0f82-44e6-80ad-18e96d93e507",
  };

  axios
    .all([
      axios.post("http://localhost:8080/register", data),
      axios.post(
        "https://api.chatengine.io/users/",
        {
          username: formData.get("username"),
          secret: formData.get("password"),
        },
        { headers: headers }
      ),
    ])
    .then((res) => {
      console.log("successful!");
      console.log(JSON.stringify(res.data));
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
