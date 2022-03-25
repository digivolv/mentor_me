import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";

function BecomeMentor() {
  const handleSubmit = (event) => {
    event.preventDefault();

    let becomeMentorForm = document.getElementById("becomeMentorForm");
    const formData = new FormData(becomeMentorForm);
    const user_id = localStorage.getItem("userID");

    const data = {
      user_id: user_id,
      job_title: formData.get("jobTitle"),
      years_of_experience: formData.get("experience"),
      price: formData.get("rate"),
    };

    // Add user to mentor table
    axios
      .post("http://localhost:8080/mentors", data)
      .then((response) => {
        // console.log("RESPONSE:", response);
        console.log("Added user to mentor table!");
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });

    // Update user table to reflect mentor field is true
    axios
      .patch(`http://localhost:8080/users/${user_id}`, { mentor: true })
      .then((response) => {
        // console.log("RESPONSE2:", response);
        console.log("Changed mentor field to true!");
      })
      .catch((err) => {
        console.log("ERROR2:", err);
      });
  };

  return (
    <div>
      <h1>Become A Mentor Page</h1>
      <form id="becomeMentorForm" onSubmit={handleSubmit}>
        Job Title: <input type="text" name="jobTitle" />
        Years of Experience: <input type="number" name="experience" />
        Rate per 15 minutes ($): <input type="number" name="rate" />
        <Button variant="contained" size="large" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default BecomeMentor;
