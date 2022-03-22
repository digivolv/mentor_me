import { React, useState, useEffect } from "react";
import SessionCard from "./SessionCard";
import { useNavigate, useParams } from "react-router-dom";
import { styled, Grid, Paper, Rating, Button, Typography } from "@mui/material";
import NavBar from "../NavBar";
import axios from "axios";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

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
    <div className="">
      <NavBar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={8} md={8}>
          <Paper>
            <Typography>
              <h1>Sessions</h1>
            </Typography>
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
                    review={user.description}
                  />
                </div>
              );
            })}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Session;
