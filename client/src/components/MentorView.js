import { React, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import MentorProfile from "./Search/MentorProfile";
import {useParams} from "react-router-dom";

function Mentor(props) {
  const [users, setUsers] = useState([]);
  let { id } = useParams();
  
  useEffect(() => {
    axios
      .get(`http://localhost:8080/mentors/${id}`)
      .then((response) => {
        // console.log("data!");
        setUsers(response.data);
        // console.log(response);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Mentor</h1>
      
      <p>{props.name}</p>
      <div className="App">
        {users.map((user) => {
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
              onClick={() => alert("go to messages")}>Message</Button>
              </div>
            );
          })}
      </div>
    </div>
    
  )
}

export default Mentor;