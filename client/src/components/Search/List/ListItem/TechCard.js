import { React, useState, useEffect } from "react";
import axios from "axios";

function TechCard(props) {
  console.log("props:", props);
  const [expertise, setExpertise] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/mentors/expertise")
      .then((response) => {
        console.log("data!");
        setExpertise(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);

  return (
    <div>
      {expertise.map((el) => {
        return props.user == el.user_id && <p>{el.specialty}</p>;
      })}
    </div>
  );
}

export default TechCard;
