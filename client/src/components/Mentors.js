import { React, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import MentorProfile from "./Search/MentorProfile";
import { useNavigate } from "react-router-dom";

function Mentors(props) {
  const [selectedUser, setSelectedUser] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/mentors")
      .then((response) => {
        console.log("data!");
        setSelectedUser(response.data);
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
  };
  return (
    <div>
      <h1>Mentors</h1>
      <div className="App">
        {selectedUser.map((user) => {
          return (
            <div>
              <MentorProfile
                id={user.id}
                name={user.name}
                email={user.email}
                job_title={user.job_title}
                years_of_experience={user.years_of_experience}
                country={user.country}
                price={user.price}
              />
              <Button
                variant="contained"
                onClick={() => {
                  handleClick(user.id);
                }}
              >
                View Profile
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Mentors;
