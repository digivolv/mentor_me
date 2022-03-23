import { React, useState, useEffect } from "react";
// import CardProfile from "./CardProfile";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  styled,
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

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "10em",
    maxHeight: "10em",
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
      .put(
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
        // spacing={8}
        // paddingTop={10}
      >
        <Grid
          container
          padding={10}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation="10" padding={10}>
            <Grid container>
              <Grid item padding={6}>
                <Typography variant="h2"> Session Page </Typography>
                <Img src={state.sessions.picture}></Img>
              </Grid>
              {/* <h1>session_id {state.sessions.id}</h1> */}
              {/* <h1>mentor_id {state.sessions.mentor_id}</h1> */}
              {/* <h1>mentee_id {state.sessions.mentee_id}</h1> */}

              <Grid
                item
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                >
                  <Typography>
                    <Typography variant="body">
                      Hi, mentee_name {state.sessions.mentee_name}{" "}
                    </Typography>
                  </Typography>
                  <Typography variant="body">
                    How was your mentorship experience with{" "}
                    {state.sessions.mentor_name}?
                  </Typography>
                  <Typography variant="body">
                    Date: {state.sessions.date}
                  </Typography>
                  <Typography variant="body">
                    Duration: {state.sessions.duration}
                  </Typography>
                  <Typography variant="body">Cost:</Typography>
                </Grid>
                <form className="form-control" onSubmit={onSubmitForm}>
                  <label for="message">
                    Please tell us about your experience:
                  </label>
                  <TextField
                    label="Review"
                    style={{ width: "100%", padding: "5%" }}
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
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Session;
