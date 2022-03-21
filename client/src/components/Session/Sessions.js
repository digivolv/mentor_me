import { React, useState, useEffect } from "react";
import SessionCard from "./SessionCard";
import { useNavigate, useParams } from "react-router-dom";
import { Rating, Button } from "@mui/material";

import axios from "axios";

function Session() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    axios
      //axios url path still hardcoded
      .get(`http://localhost:8080/users/${id}/sessions/`)
      .then((response) => {
        console.log("data!");
        setSelectedUser(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <h1>Sessions</h1>
      {selectedUser.map((user) => {
        return (
          <div>
            <SessionCard
              mentor_id={user.mentor_id}
              mentee_id={user.mentee_id}
              mentee_name={user.mentee_name}
              mentor_name={user.mentor_name}
              date={user.date}
              duration={user.duration}
              rating={user.rating}
              review={user.review}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Session;
