import React from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Button,
  Avatar,
  Paper,
  Grid,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";

const SessionCard = (props) => {
  const {
    price,
    time,
    mentor_confirmed,
    format,
    mentor_id,
    mentee_id,
    mentee_name,
    mentor_name,
    date,
    duration,
    rating,
    review,
    picture,
    session_id,
  } = props;

  const styles = {
    border: "1px solid rgba(0, 0, 0, 0.05)",
  };

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "70%",
    maxHeight: "70%",
  });

  const dateFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let navigate = useNavigate();

  const onClickConfirmSession = async (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:8080/users/${mentor_id}/sessions/confirm`, {
        mentor_confirmed: true,
        session_id: session_id,
      })
      .then(function (response) {
        console.log(response);
        navigate(`/users/${mentor_id}/sessions`);
        window.location.reload();
        // window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onClickDeleteSession = async (event) => {
    event.preventDefault();

    axios
      .delete(`http://localhost:8080/users/${mentor_id}/sessions/delete`, {
        data: {
          session_id: session_id,
        },
      })
      .then(function (response) {
        console.log(response);
        navigate(`/users/${mentor_id}/sessions`);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // let date = new Date().toLocaleDateString("en-us", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // });

  return (
    <div style={styles}>
      {/* <h3>{`mentor_ID: ${mentor_id}`}</h3> */}
      {/* <h3>{`mentee_id: ${mentee_id}`}</h3> */}
      {/* <h2>{`mentee_name: ${mentee_name}`}</h2> */}
      <Paper>
        {mentor_confirmed && review && rating && format === "completed" && (
          <Grid
            container
            direction="row"
            // justifyContent="center"
            padding="1.5%"
            // padding="10px"
            // textAlign="center"
            // spacing={2}
            width="75%"
            marginLeft="10%"
            // margin="auto"
          >
            <Grid item xs={5} margin="auto">
              {/* <Img src={picture} /> */}
              <Img src={picture} />
            </Grid>
            <Grid container xs={7} direction="column" justifyContent="center">
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Mentee:`} {mentee_name}
                {/* <Link to={`/mentors/${mentor_id}`}>{mentor_name}</Link> */}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Mentorship Date: `}{" "}
                {/* <Link
                  to={`/users/${mentee_id}/mentors/${mentor_id}/sessions/${session_id}`}
                > */}
                {new Date(date).toLocaleDateString("EN-ca", dateFormatOptions)}
                {/* </Link> */}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Time: ${moment(time).format("LTS")}`}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Duration: ${duration}`}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                Price: ${(price * (duration / 15)).toFixed(2)}
              </Typography>
              <Grid item>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Review: {review}
                </Typography>
              </Grid>
              <Typography gutterBottom variant="subtitle1" component="div">
                {/* <Grid vertical-align="auto"> */}
                {/* {`Rating: ${rating}`} */}
                <Rating
                  name="read-only"
                  readOnly
                  defaultValue={3}
                  value={rating}
                />
                {/* </Grid> */}
              </Typography>
            </Grid>
          </Grid>
        )}

        {mentor_confirmed && !review && !rating && format === "upcoming" && (
          <Grid
            container
            direction="row"
            // justifyContent="center"
            padding="1.5%"
            // padding="10px"
            // textAlign="center"
            // spacing={2}
            width="75%"
            marginLeft="10%"
            // margin="auto"
          >
            <Grid item xs={5} margin="auto">
              {/* <Img src={picture} /> */}
              <Img src={picture} />
            </Grid>
            <Grid container xs={7} direction="column" justifyContent="center">
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Mentee:`} {mentee_name}
                {/* <Link to={`/mentors/${mentor_id}`}>{mentor_name}</Link> */}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Mentorship Date: `}{" "}
                <Link
                  to={`/users/${mentee_id}/mentors/${mentor_id}/sessions/${session_id}`}
                >
                  {new Date(date).toLocaleDateString(
                    "EN-ca",
                    dateFormatOptions
                  )}
                </Link>
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Time: ${moment(time).format("LTS")}`}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Duration: ${duration}`}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                Price: ${(price * (duration / 15)).toFixed(2)}
              </Typography>
              <Grid item>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Review: {review}
                </Typography>
              </Grid>
              <Typography gutterBottom variant="subtitle1" component="div">
                {/* <Grid vertical-align="auto"> */}
                {/* {`Rating: ${rating}`} */}
                <Rating
                  name="read-only"
                  readOnly
                  defaultValue={3}
                  value={rating}
                />
                {/* </Grid> */}
              </Typography>
            </Grid>
          </Grid>
        )}

        {!mentor_confirmed && format === "pending" && (
          <Grid
            container
            direction="row"
            // justifyContent="center"
            padding="1.5%"
            // padding="10px"
            // textAlign="center"
            // spacing={2}
            width="75%"
            marginLeft="10%"
            // margin="auto"
          >
            <Grid item xs={5} margin="auto">
              {/* <Img src={picture} /> */}
              <Img src={picture} />
            </Grid>
            <Grid container xs={7} direction="column" justifyContent="center">
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Mentee:`} {mentee_name}
                {/* <Link to={`/mentors/${mentor_id}`}>{mentor_name}</Link> */}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Mentorship Date: `}{" "}
                {new Date(date).toLocaleDateString("EN-ca", dateFormatOptions)}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Time: ${moment(time).format("LTS")}`}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Duration: ${duration}`}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                Price: ${(price * (duration / 15)).toFixed(2)}
              </Typography>
              <Grid item>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Review: {review}
                </Typography>
              </Grid>
              <Typography gutterBottom variant="subtitle1" component="div">
                {/* <Grid vertical-align="auto"> */}
                {/* {`Rating: ${rating}`} */}
                <Rating
                  name="read-only"
                  readOnly
                  defaultValue={3}
                  value={rating}
                />
                {/* </Grid> */}
              </Typography>
              <Button onClick={onClickConfirmSession} variant="contained">
                Confirm Session
              </Button>
              <Button onClick={onClickDeleteSession} variant="contained">
                Delete Session
              </Button>
            </Grid>
          </Grid>
        )}
      </Paper>
    </div>
  );
};

export default SessionCard;
