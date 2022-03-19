import { React, useState, useEffect } from "react";
// import CardProfile from "./CardProfile";
import axios from "axios";

function Session() {
  const [sessions, setSessions] = useState([]);
  // const [message, setMessage] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/1/sessions/1")
      .then((response) => {
        console.log("data!");
        //Need first row of data only
        setSessions(response.data[0]);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1> Session Page </h1>
      {/* <div> */}
      <aside>
        <span>Thank you</span>
        <h1>session_id {sessions.id}</h1>
        <h1>mentor_id {sessions.mentor_id}</h1>
        <h1>mentee_id {sessions.mentee_id}</h1>
        <h1>Hi, mentee_name {sessions.mentee_name}</h1>
        <h1>
          How was your mentor message with mentor_name {sessions.mentor_name}?
        </h1>
        <h1>date {sessions.date}</h1>
        <h1>duration {sessions.duration}</h1>

        <form className="form-control">
          <label for="message">How was your experience:</label>
          <input
            id="message"
            name="message"
            type="text"
            className="form-control"
            placeholder="Please write a brief description of how your message went with your mentor"
          ></input>
          <label for="rating">Rating ( 0 and 5):</label>
          <input type="range" id="rating" name="rating" min="0" max="5"></input>
          <input type="submit" value="Submit"></input>
        </form>
      </aside>
      {/* </div> */}
    </div>
  );
}

export default Session;
