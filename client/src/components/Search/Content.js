import { React, useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
function Content() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/mentors")
      .then((response) => {
        console.log("data!");
        setMentors(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  const handleClick = (id) => {
        navigate(`/mentors/${id}`);
    }
  return (
    <div>
      {mentors.map((mentor) => {
        return (
          <div>
          <ProfileCard
            key={mentor.id}
            id={mentor.id}
            name={mentor.name}
            picture={mentor.picture}
            jobTitle={mentor.job_title}
            yearsOfExperience={mentor.years_of_experience}
            price={mentor.price}
            city={mentor.city}
            country={mentor.country}
            
          />
            </div>
        );
      })}
    </div>
  );
}

export default Content;
