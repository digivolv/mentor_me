import { React, useState, useEffect } from "react";
import SessionCard from "./SessionCard";
import SessionCardMentorsView from "./SessionCardMentorsView";
import { useNavigate, useParams } from "react-router-dom";
import {
  // ToggleButton,
  // ToggleButtonGroup,

  styled,
  Grid,
  Paper,
  Rating,
  Button,
  Typography,
} from "@mui/material";
import NavBar from "../NavBar";
import axios from "axios";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function Session() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [menteeSessions, setMenteeSessions] = useState([]);
  const [mentorSessions, setMentorSessions] = useState([]);
  const [userData, setUserData] = useState(id);
  const [pendingSessionCount, setPendingSessionsCount] = useState([]);
  const [menteePendingSessionCount, setMenteePendingSessionsCount] = useState(
    []
  );
  const [alignment, setAlignment] = useState("completed");
  const [format, setFormat] = useState("completed");

  useEffect(() => {
    axios.get(`http://localhost:8080/users/${id}`).then((response) => {
      console.log("data!");
      setUserData(response.data[0]);
      console.log(response.data[0]);
    });
    axios
      .get(`http://localhost:8080/users/${id}/sessions/`)
      .then((response) => {
        console.log("data!");
        setMenteeSessions(response.data);
        console.log(response.data);
      });
    axios
      .get(`http://localhost:8080/users/${id}/mentors/sessions/`)
      .then((response) => {
        console.log("data!");
        setMentorSessions(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
    axios
      .get(`http://localhost:8080/users/${id}/mentor_confirmed/`)
      .then((response) => {
        console.log("data!");
        //Loop through session data to see if there are any unconfirmed mentor sessions with corresponding userID
        let count = response.data[0].count;
        setPendingSessionsCount(count);
        console.log(count, "count");
        // const initialFormat = count > 0 ? "pending" : "completed";

        // setAlignment(initialFormat);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
    axios
      .get(`http://localhost:8080/users/${id}/mentee_confirmed/`)
      .then((response) => {
        console.log("data!");
        //Loop through session data to see if there are any unconfirmed mentor sessions with corresponding userID
        let menteeCount = response.data[0].count;
        setMenteePendingSessionsCount(menteeCount);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);

  // const handleFormat = (format) => {
  //   format === "completed" ? setFormat("upcoming") : setFormat("completed");

  //   console.log("format", format);
  // };

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      // setAlignment(newAlignment);
      setFormat(newAlignment);
    }
  };

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
            // elevation: 15,
          }}
          elevation="10"
        >
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="completed">Completed</ToggleButton>
            <ToggleButton value="upcoming">Upcoming</ToggleButton>
            <ToggleButton value="pending">
              Pending{" "}
              {userData.mentor === true
                ? pendingSessionCount
                : menteePendingSessionCount}
            </ToggleButton>
          </ToggleButtonGroup>
          {/* <ToggleButtonGroup
            color="primary"
            value={format}
            exclusive
            onClick={() => {
              handleFormat(format);
            }}
          >
            <ToggleButton value="completed">Completed Sessions</ToggleButton>
            <ToggleButton value="upcoming">Upcoming Sessions</ToggleButton>
            <ToggleButton value="pending">Pending Sessions</ToggleButton>
          </ToggleButtonGroup> */}

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
              {!userData.mentor && (
                <Grid item xs={12}>
                  <Typography variant="h3">Mentee Sessions</Typography>
                </Grid>
              )}
              {!userData.mentor &&
                menteeSessions.map((user) => {
                  return (
                    <SessionCard
                      price={user.price}
                      time={user.time}
                      mentor_confirmed={user.mentor_confirmed}
                      format={format}
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
                  );
                })}{" "}
              {userData.mentor && (
                <Grid item xs={12}>
                  <Typography variant="h3">Mentor Sessions</Typography>
                </Grid>
              )}
              {userData.mentor &&
                mentorSessions.map((user) => {
                  return (
                    // <Grid item xs={10} padding="10px">
                    <SessionCardMentorsView
                      price={user.price}
                      time={user.time}
                      mentor_confirmed={user.mentor_confirmed}
                      format={format}
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
