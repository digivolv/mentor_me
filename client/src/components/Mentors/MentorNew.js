import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import NavBar from "../NavBar";
import "./MentorNew.css";
import { useNavigate } from "react-router-dom";

function MentorNew() {
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    let becomeMentorForm = document.getElementById("becomeMentorForm");
    const formData = new FormData(becomeMentorForm);
    const user_id = localStorage.getItem("userID");

    const specialties = [];

    const specialtyFormFields = [
      "expertise1",
      "expertise2",
      "expertise3",
      "expertise4",
      "expertise5",
    ];
    for (let field of specialtyFormFields) {
      if (formData.get(field)) {
        specialties.push(formData.get(field));
      }
    }

    console.log("SPECIALTIES", specialties);

    const data = {
      user_id: user_id,
      job_title: formData.get("jobTitle"),
      years_of_experience: formData.get("experience"),
      price: formData.get("rate"),
      specialties: specialties,
    };

    axios
      .post("http://localhost:8080/mentors/new", data)
      .then((response) => {})
      .catch((err) => {
        console.log("ERROR:", err);
      });

    navigate(`/search`);
  };

  return (
    <div>
      <NavBar />
      <div className="becomeMentor">
        <h1>Sign Up to be a Mentor</h1>
        <form id="becomeMentorForm" onSubmit={handleSubmit}>
          Job Title: <input type="text" name="jobTitle" />
          Years of Experience: <input type="number" name="experience" />
          Rate per 15 minutes ($): <input type="number" name="rate" />
          Expertise:
          <i>
            Please provide 1-5 technologies that you have the most experience
            with. This will be displayed on your profile.
          </i>
          <br />
          <select id="expertise" name="expertise1">
            <option disabled selected value>
              Select an option
            </option>
            <option value="CSS/SaSS">CSS/SaSS</option>
            <option value="Git">Git</option>
            <option value="HTML">HTML</option>
            <option value="Javascript">Javascript</option>
            <option value="jQuery">jQuery</option>
            <option value="Node/Express">Node/Express</option>
            <option value="Ruby/Ruby on Rails">Ruby/Ruby on Rails</option>
            <option value="SQL">SQL</option>
          </select>
          <br />
          <select id="expertise" name="expertise2">
            <option disabled selected value>
              Select an option
            </option>
            <option value="CSS/SaSS">CSS/SaSS</option>
            <option value="Git">Git</option>
            <option value="HTML">HTML</option>
            <option value="Javascript">Javascript</option>
            <option value="jQuery">jQuery</option>
            <option value="Node/Express">Node/Express</option>
            <option value="Ruby/Ruby on Rails">Ruby/Ruby on Rails</option>
            <option value="SQL">SQL</option>
          </select>
          <br />
          <select id="expertise" name="expertise3">
            <option disabled selected value>
              Select an option
            </option>
            <option value="CSS/SaSS">CSS/SaSS</option>
            <option value="Git">Git</option>
            <option value="HTML">HTML</option>
            <option value="Javascript">Javascript</option>
            <option value="jQuery">jQuery</option>
            <option value="Node/Express">Node/Express</option>
            <option value="Ruby/Ruby on Rails">Ruby/Ruby on Rails</option>
            <option value="SQL">SQL</option>
          </select>
          <br />
          <select id="expertise" name="expertise4">
            <option disabled selected value>
              Select an option
            </option>
            <option value="CSS/SaSS">CSS/SaSS</option>
            <option value="Git">Git</option>
            <option value="HTML">HTML</option>
            <option value="Javascript">Javascript</option>
            <option value="jQuery">jQuery</option>
            <option value="Node/Express">Node/Express</option>
            <option value="Ruby/Ruby on Rails">Ruby/Ruby on Rails</option>
            <option value="SQL">SQL</option>
          </select>
          <br />
          <select id="expertise" name="expertise5">
            <option disabled selected value>
              Select an option
            </option>
            <option value="CSS/SaSS">CSS/SaSS</option>
            <option value="Git">Git</option>
            <option value="HTML">HTML</option>
            <option value="Javascript">Javascript</option>
            <option value="jQuery">jQuery</option>
            <option value="Node/Express">Node/Express</option>
            <option value="Ruby/Ruby on Rails">Ruby/Ruby on Rails</option>
            <option value="SQL">SQL</option>
          </select>
          <br />
          <Button variant="contained" size="large" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default MentorNew;
