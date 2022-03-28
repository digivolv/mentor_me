import React from "react";
import { Link } from "react-router-dom";
import {
  alignment,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  Button,
  Paper,
  Grid,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import moment from "moment";

const SessionCard = (props) => {
  const {
    time,
    mentor_confirmed,
    mentor_id,
    mentee_id,
    mentee_name,
    format,
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

  // const Img = styled("img")({
  //   margin: "auto",
  //   display: "block",
  //   maxWidth: "70%",
  //   maxHeight: "70%",
  // });


  const dateFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // let date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})

  return (
   
    <Paper>
        {mentor_confirmed && review && rating && format === "completed" ? (
          
          <Grid
            container
            direction="row"
            justifyContent="center"
            padding="10px"
            textAlign="center"
            spacing={2}
            width="75%"
            marginLeft="10%"
          margin="auto"
          
          >
          <Grid>
            <Avatar
              container xs={3}
              alt="Remy Sharp"
              src={picture}
              sx={{ width: 150, height: 150 }}
            />
            
        </Grid>
         
          <Grid container xs={9} direction="row" justifyContent="center">
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Mentor:`}{" "}
                <Link to={`/mentors/${mentor_id}`}>{mentor_name}</Link>
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
                Time: {moment(time).format("LTS")}
              </Typography>

              <Typography gutterBottom variant="subtitle1" component="div">
                Duration: {duration}
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

         
        ) :

        (mentor_confirmed && !review && !rating && format === "upcoming") ? (
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
              <Avatar
        alt="Remy Sharp"
        src={picture}
              sx={{ width: 150, height: 150 }}
      />
            </Grid>
            <Grid container xs={7} direction="column" justifyContent="center">
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Mentor:`}{" "}
                <Link to={`/mentors/${mentor_id}`}>{mentor_name}</Link>
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
              <Button
                href={`/users/${mentee_id}/mentors/${mentor_id}/sessions/${session_id}`}
                variant="contained"
              >
                Review Session
              </Button>
            </Grid>
          </Grid>
        ) : 
            (!mentor_confirmed && format === "pending") ? (
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
              <Avatar
        alt="Remy Sharp"
        src={picture}
              sx={{ width: 150, height: 150 }}
      />
            </Grid>
            <Grid container xs={7} direction="column" justifyContent="center">
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Mentor:`}{" "}
                <Link to={`/mentors/${mentor_id}`}>{mentor_name}</Link>
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
        ) : <></> }      
        
      </Paper>
  );
};

export default SessionCard;
