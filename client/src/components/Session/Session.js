import { React, useState, useEffect } from "react";
// import CardProfile from "./CardProfile";
import axios from "axios";

function Session() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/1/sessions")
      .then((response) => {
        console.log("data!");
        //Need first row of data only
        setSessions(response.data[0]);
        console.log(response.data);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);


  return (
        <div>
          <h1> Session Page </h1>
          {/* <div> */}
            <aside>
              <span>Thank you</span>
              <h1>session_id {sessions.id}</h1>
              <h1>mentor_id {sessions.mentor_id}</h1>
              <h1>mentee_id {sessions.mentee_id}</h1>
              <h1>Hi, mentee_name {sessions.mentee_name}</h1>
              <h1>How was your mentor message with mentor_name {sessions.mentor_name}?</h1>
              <h1>date {sessions.date}</h1>
              <h1>duration {sessions.duration}</h1>

              <form className="" method="POST" action>
              <label for="message">How was your experience:</label>
                <input
                  id="message"
                  name="message"
                  type="text"
                  className="form-control"
                  placeholder="Please write a brief description of how your message went with your mentor"
                  >
                </input>
                <label for="rating">Rating ( 0 and 5):</label>
                  <input 
                    type="range" 
                    id="rating" 
                    name="rating" 
                    min="0" 
                    max="5">
                  </input>
                  <input type="submit" value="Submit"></input>
              </form>
            </aside>
          {/* </div> */}
        </div>
      );
    }


//   return (
//     <div>
//       <h1> Session Page </h1>
//       <div className="App">
//         {users.map((user) => {
//           return (
//             <CardProfile
//               id={user.id}
//               email={user.email}
//               password={user.password}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

export default Session;



// import React from "react";

// const CardProfile = (props) => {
//   const { id, email, password } = props;

//   const styles = {
//     border: "1px solid rgba(0, 0, 0, 0.05)",
//   };

//   return (
//     <div style={styles}>
//       <h3>{`ID: ${id}`}</h3>
//       <h2>{`Email: ${email}`}</h2>
//       <p>{`Password: ${password}`}</p>
//     </div>
//   );
// };

// export default CardProfile;
