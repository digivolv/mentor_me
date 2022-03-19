import { React, useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import axios from "axios";
import MentorProfile from "./Search/MentorProfile";
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
  
  
  return (
    <div>
      <h1>Mentors</h1>
      
      <p>{props.name}</p>
      <div className="App">
        {selectedUser.map((user) => {
          return (
            <div>
            <MentorProfile
            name={user.name}
            email={user.email}
              job_title={user.job_title}
              years_of_experience={user.years_of_experience}
            country={user.country}
            price={user.price}
            />
              <Button
                variant="contained"
                onClick={() =>
                  setSelectedUser(user)}
              >Message</Button>
              </div>
            );
          })}
      </div>
    </div>
    
  )
}

export default Mentors;