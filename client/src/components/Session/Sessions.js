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
  // .sort(({ session_id: a }, { session_id: b }) => b - a) //

  return (
    <div className="">
      <NavBar />
      <Grid
        container
        direction="row"
        // justifyContent="center"
        padding="10px"
        // textAlign="center"
      >
        <Paper
          sx={{
            p: 5,
            paddingTop: "15",
            margin: "auto",
            maxWidth: 1400,
            flexGrow: 1,
          }}
        >
          <Grid
            container
            direction="row"
            // justifyContent="center"
            // padding="10px"
            // textAlign="center"
            // spacing={2}
            marginLeft="10%"
            // margin="auto"
          >
            <Grid item xs={12} sm container>
              <Grid item xs={12}>
                <Typography variant="h3">Sessions</Typography>
              </Grid>
              {selectedUser.map((user) => {
                return (
                  <Grid item xs={10} padding="10px">
                    <SessionCard
                      session_id={user.id}
                      mentor_id={user.mentor_id}
                      mentee_id={user.mentee_id}
                      mentee_name={user.mentee_name}
                      mentor_name={user.mentor_name}
                      date={user.date}
                      duration={user.duration}
                      rating={user.rating}
                      review={user.description}
                      picture={user.picture}
                    />
                  </Grid>
                );
              })}{" "}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

export default Session;
