import React from "react";
import NavBar from "./NavBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import Footer from "./Footer";

function Home() {
  let navigate = useNavigate();

  const handleClick = () => {
    // console.log("clicked");
    navigate(`/search`);
  };
  return (
    <div>
      <NavBar />
      <div class="tagLine">
        <h1>Mentor Me</h1>
        <span>Get unstuck quickly by talking to a coding mentor now</span>
        <br />
        <br />
        <ArrowDropDownCircleOutlinedIcon sx={{ fontSize: 100 }} />
      </div>

      <div className="navigationCard">
        <div className="mentorCard" onClick={handleClick}>
          <h1>FIND A MENTOR</h1>
        </div>
        <div className="mentorCard" onClick={handleClick}>
          <h1>BE A MENTOR</h1>
        </div>
      </div>
      <div className="about">
        <h1>How It Works</h1>
        <div className="instructions">
          <p>1) Search for a mentor by technology eg, Javascript</p>
          <p>2) Find a mentor who can help</p>
          <p>3) Message the mentor to schedule a session </p>
          <p>4) Connect with the mentor to get the help you need</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
