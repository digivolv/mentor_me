import { React, useState, useEffect } from "react";
// import CardProfile from "./CardProfile";
import { useNavigate, useParams } from "react-router-dom";
import {
  Link,
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
    description: "",
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

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "10em",
    maxHeight: "10em",
  });

  const dateFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    axios
      .put(
        `http://localhost:8080/users/${id}/mentors/${mentor_id}/sessions/${session_id}`,
        {
          user_id: id,
          mentor_id: mentor_id,
          session_id: session_id,
          description: state.description,
          rating: state.rating,
        }
      )
      .then(function (response) {
        console.log(response);
        // navigate(`/users/${id}/sessions`);
        window.location.reload(false);
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
        padding={10}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation="10">
          <Grid item paddingTop={6} paddingBottom={2} textAlign="center">
            <Typography variant="h6"> Mentorship Session Review </Typography>
            <Img src={state.sessions.picture}></Img>
            <Typography gutterBottom variant="subtitle1" component="div">
              Mentor:
              <Link href={`/mentors/${state.sessions.mentor_id}`}>
                {state.sessions.mentor_name}
              </Link>
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              Session Date:
              {new Date(state.sessions.date).toLocaleDateString(
                "EN-ca",
                dateFormatOptions
              )}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              Duration: {state.sessions.duration}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              Cost:
            </Typography>
          </Grid>
          {/* <h1>session_id {state.sessions.id}</h1> */}
          {/* <h1>mentor_id {state.sessions.mentor_id}</h1> */}
          {/* <h1>mentee_id {state.sessions.mentee_id}</h1> */}
          {/* <Grid item xs={9} margin="auto"> */}
          <Grid
            item
            width="100%"
            paddingLeft={10}
            paddingRight={10}
            paddingBottom={5}
            textAlign="center"
            justifyContent="center"
          >
            <Typography gutterBottom variant="subtitle1" component="div">
              Hello, {state.sessions.mentee_name} !
            </Typography>

            <Typography gutterBottom variant="subtitle1" component="div">
              How was your mentorship experience with{" "}
              {state.sessions.mentor_name}?
            </Typography>

            {/* <label for="rating">Rating:</label> */}

            {/* <Grid
              item
              width="100%"
              padding={10}
              textAlign="center"
              justifyContent="center"
            > */}
            <form className="form-control" onSubmit={onSubmitForm}>
              {/* <label for="message">Please tell us about your experience:</label> */}
              <TextField
                // size="medium"
                multiline
                label="Review"
                // style={{ width: "100%" }}
                style={{ width: "100%" }}
                // variant="outlined"
                id="outlined-multiline-static"
                rows={4}
                name="description"
                type="text"
                className="form-control"
                required
                // placeholder="Please write a brief description of how your message went with your mentor"
                value={state.description}
                onInput={(event) =>
                  setState({ ...state, description: event.target.value })
                }
              />
              <Grid>
                <Rating
                  name="size-medium"
                  defaultValue={3}
                  value={state.rating}
                  onChange={(event) =>
                    setState({ ...state, rating: event.target.value })
                  }
                />
              </Grid>
              <Grid>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid>
          {/* </Grid> */}
        </Paper>
      </Grid>
    </div>
  );
}

export default Session;
