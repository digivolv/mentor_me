import React from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import Footer from "./Footer";

function Home() {
  let navigate = useNavigate();

  const handleFindAMentor = () => {
    navigate(`/search`);
  };

  const handleBeAMentor = () => {
    navigate(`/mentors/new`);
  };
  return (
    <div>
      <NavBar />
      <div className="tagLine">
        <div className="catchPhrase">
          <h1>Mentor Me</h1>
          <span>Get unstuck quickly by talking to a coding mentor now</span>
        </div>
        <br />
        <br />
        <ArrowDropDownCircleOutlinedIcon sx={{ fontSize: 100 }} />
      </div>

      <div className="navigationCard">
        <div className="mentorCard" onClick={handleFindAMentor}>
          <h1>FIND A MENTOR</h1>
        </div>
        <div className="mentorCard" onClick={handleBeAMentor}>
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
