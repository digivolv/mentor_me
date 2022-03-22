import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Grid, Rating, styled } from "@mui/material";

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
  } = props;

  const styles = {
    border: "1px solid rgba(0, 0, 0, 0.05)",
  };

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  return (
    <div style={styles}>
      {/* <h3>{`mentor_ID: ${mentor_id}`}</h3> */}
      {/* <h3>{`mentee_id: ${mentee_id}`}</h3> */}
      {/* <h2>{`mentee_name: ${mentee_name}`}</h2> */}
      <Grid container spacing={1}>
        <Grid item>
          {/* <Img src={picture} /> */}
          <Avatar src={picture} />
        </Grid>
      </Grid>
      <Link to={`/mentors/${mentor_id}`}>{`Mentor: ${mentor_name}`}</Link>
      <p>{`Mentorship Date: ${date}`}</p>
      <p>{`Duration: ${duration}`}</p>
      <p>
        {`Rating: ${rating}`}
        <Rating name="read-only" readOnly defaultValue={3} value={rating} />
      </p>

      <p>{`Review: ${review}`}</p>
    </div>
  );
};

export default SessionCard;
