import { React } from "react";
import axios from "axios";
import "./register.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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
      "PRIVATE-KEY": "36cade4b-0f82-44e6-80ad-18e96d93e507",
    };

    ///////////////////// PROMISE VERSION  ////////////////////
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
      .then(
        axios.spread((...responses) => {
          console.log(JSON.stringify(responses[0].data));
          console.log(responses[0]);
          console.log("SUCCESS!");
          navigate(`/search`);
        })
      )
      .catch((err) => {
        console.log("ERROR:", err);
      });
  };

  ////////// ASYNC AWAIT VERSION ///////////////////

  // try {
  //   await axios.all([
  //     axios.post("http://localhost:8080/register", data),
  //     axios.post(
  //       "https://api.chatengine.io/users/",
  //       {
  //         username: formData.get("username"),
  //         secret: formData.get("password"),
  //       },
  //       { headers: headers }
  //     ),
  //   ]);

  //   console.log("success");
  //   navigate(`/search`);
  // } catch (err) {
  //   console.log("ERRORRRR:", err);
  // }
  // };
  ///////////////////////////////////////////////////

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
        </form>
      </div>
    </div>
  );
}

export default Register;
