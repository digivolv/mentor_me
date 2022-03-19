import { React, useState, useEffect } from "react";
// import CardProfile from "./CardProfile";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

import axios from "axios";

function Session() {
  let navigate = useNavigate();
  // const [sessions, setSessions] = useState([]);
  // const [message, setMessage] = useState("");

  const [state, setState] = useState({
    sessions: [],
    message: "",
    rating: "",
  });

  useEffect(() => {
    axios
      //axios url path still hardcoded
      .get("http://localhost:8080/users/1/sessions/1")
      .then((response) => {
        console.log("data!");
        //Need first row of data only
        setState({ sessions: response.data[0] });
        console.log(response.data);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    // try {
    //   // const body = state.message;
    //   const response = await fetch("http://localhost:8080/users/1/sessions/1", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(state.message),
    //   });
    //   console.log(response);
    // } catch (error) {
    //   console.error(error.message);
    // }

    axios
      .post("http://localhost:8080/users/1/sessions/1", {
        //hardcoded user_id
        user_id: 1,
        message: state.message,
        rating: state.rating,
      })
      .then(function (response) {
        console.log(response);
        navigate(`/`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1> Session Page </h1>
      {/* <div> */}
      <aside>
        <span>Thank you</span>
        <h1>session_id {state.sessions.id}</h1>
        <h1>mentor_id {state.sessions.mentor_id}</h1>
        <h1>mentee_id {state.sessions.mentee_id}</h1>
        <h1>Hi, mentee_name {state.sessions.mentee_name}</h1>
        <h1>
          How was your experience with mentor_name {state.sessions.mentor_name}?
        </h1>
        <h1>date {state.sessions.date}</h1>
        <h1>duration {state.sessions.duration}</h1>

        <form className="form-control" onSubmit={onSubmitForm}>
          <label for="message">How was your experience:</label>
          <input
            id="message"
            name="message"
            type="text"
            className="form-control"
            // placeholder="Please write a brief description of how your message went with your mentor"
            value={state.message}
            onInput={(event) =>
              setState({ ...state, message: event.target.value })
            }
          ></input>
          <label for="rating">Rating ( 0 and 5):</label>

          <input
            type="range"
            id="rating"
            name="rating"
            min="0"
            max="5"
            value={state.rating}
            onInput={(event) =>
              setState({ ...state, rating: event.target.value })
            }
          ></input>
          <button className="btn btn-success">Submit</button>
          {/* <input type="submit" value="Submit"></input> */}
        </form>
      </aside>
      {/* </div> */}
    </div>
  );
}

export default Session;
