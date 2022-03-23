import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Paper, Grid, Rating, styled, Typography } from "@mui/material";

const SessionCard = (props) => {
  const {
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

  // let date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})

  return (
    <div style={styles}>
      {/* <h3>{`mentor_ID: ${mentor_id}`}</h3> */}
      {/* <h3>{`mentee_id: ${mentee_id}`}</h3> */}
      {/* <h2>{`mentee_name: ${mentee_name}`}</h2> */}
      <Paper>
        {review && rating && (
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
                {`Mentee: `}
                {mentee_name}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="div">
                {`Mentorship Date: `}{" "}
                {new Date(date).toLocaleDateString("EN-ca", dateFormatOptions)}
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

          // <Grid
          //   container
          //   direction="row"
          //   // justifyContent="center"
          //   padding="1.5%"
          //   // padding="10px"
          //   // textAlign="center"
          //   // spacing={2}
          //   width="75%"
          //   marginLeft="10%"
          //   // margin="auto"
          // >
          //   <Grid item xs={5} margin="auto">
          //     {/* <Img src={picture} /> */}
          //     <Img src={picture} />
          //   </Grid>
          //   <Grid container xs={7} direction="column" justifyContent="center">
          //     <Typography gutterBottom variant="subtitle1" component="div">
          //       {`Mentor:`}{" "}
          //       <Link to={`/mentors/${mentor_id}`}>{mentor_name}</Link>
          //     </Typography>
          //     <Typography gutterBottom variant="subtitle1" component="div">
          //       {`Mentorship Date: `}{" "}
          //       <Link
          //         to={`/users/${mentee_id}/mentors/${mentor_id}/sessions/${session_id}`}
          //       >
          //         {new Date(date).toLocaleDateString(
          //           "EN-ca",
          //           dateFormatOptions
          //         )}
          //       </Link>
          //     </Typography>
          //     <Typography gutterBottom variant="subtitle1" component="div">
          //       {`Duration: ${duration}`}
          //     </Typography>

          //     <Grid item>
          //       <Typography gutterBottom variant="subtitle1" component="div">
          //         {/* Review: ${review} */}
          //       </Typography>
          //     </Grid>
          //     <Typography gutterBottom variant="subtitle1" component="div">
          //       {/* <Grid vertical-align="auto"> */}
          //       {/* {`Rating: ${rating}`} */}
          //       <Rating
          //         name="read-only"
          //         readOnly
          //         defaultValue={3}
          //         value={rating}
          //       />
          //       {/* </Grid> */}
          //     </Typography>
          //   </Grid>
          // </Grid>
        )}
      </Paper>
    </div>
  );
};

export default SessionCard;
