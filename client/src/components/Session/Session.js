import { React, useState, useEffect } from "react";
// import CardProfile from "./CardProfile";
import { useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Paper,
  Rating,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "../NavBar";
import axios from "axios";

function Session() {
  let { id, mentor_id, session_id } = useParams();
  let navigate = useNavigate();

  const [state, setState] = useState({
    sessions: {},
    message: "",
    rating: "",
  });

  useEffect(() => {
    axios
      //axios url path still hardcoded
      .get(
        `http://localhost:8080/users/${id}/mentors/${mentor_id}/sessions/${session_id}`
      )
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

    axios
      .post(
        `http://localhost:8080/users/${id}/mentors/${mentor_id}/sessions/${session_id}`,
        {
          user_id: id,
          mentor_id: mentor_id,
          session_id: session_id,
          message: state.message,
          rating: state.rating,
        }
      )
      .then(function (response) {
        console.log(response);
        navigate(`/users/${id}/sessions`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item>
          <Paper>
            <Typography> Session Page </Typography>
            {/* <h1>session_id {state.sessions.id}</h1> */}
            {/* <h1>mentor_id {state.sessions.mentor_id}</h1> */}
            {/* <h1>mentee_id {state.sessions.mentee_id}</h1> */}
            <h1>Hi, mentee_name {state.sessions.mentee_name}</h1>
            <h1>
              How was your mentorship experience with{" "}
              {state.sessions.mentor_name}?
            </h1>
            <h1>Date: {state.sessions.date}</h1>
            <h1>Duration: {state.sessions.duration}</h1>
            <h1>Cost: </h1>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <form className="form-control" onSubmit={onSubmitForm}>
              <label for="message">Please tell us about your experience:</label>
              <TextField
                variant="outlined"
                id="message"
                name="message"
                type="text"
                className="form-control"
                required
                // placeholder="Please write a brief description of how your message went with your mentor"
                value={state.message}
                onInput={(event) =>
                  setState({ ...state, message: event.target.value })
                }
              />
              <label for="rating">Rating ( 0 and 5):</label>

              <Rating
                name="size-medium"
                defaultValue={3}
                value={state.rating}
                onChange={(event) =>
                  setState({ ...state, rating: event.target.value })
                }
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Session;
