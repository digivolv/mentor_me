import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TechCard from "./TechCard";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function ListItem(props) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/mentors/${id}`);
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: 5,
        maxWidth: 1400,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase
            sx={{ width: 128, height: 128 }}
            variant="contained"
            onClick={() => {
              handleClick(props.id);
            }}
          >
            <Img alt="complex" src={props.picture} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {props.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Job Title: {props.jobTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Years of Experience: {props.yearsOfExperience}
              </Typography>
            </Grid>
            <Grid item>
              {/* Show list of expertise */}
              <TechCard user={props.id} />
              {/* <TechCard specialties={props.specialties} /> */}
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              Rate: ${props.price}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                handleClick(props.id);
              }}
            >
              View Profile
            </Button>
            <br />
            <br />
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/messages`);
                handleClick(props.id);
              }}
            >
              Message
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ListItem;
