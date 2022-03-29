import { React, useState, useEffect } from "react";
import axios from "axios";
import "./TechCard.css";

function TechCard(props) {
  const [expertise, setExpertise] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/mentors/expertise")
      .then((response) => {
        setExpertise(response.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, []);

  return (
    <div>
      {expertise.map((el) => {
        return (
          props.user == el.user_id && (
            <span className="tech-card">{el.specialty}</span>
          )
        );
      })}
    </div>
  );
}

export default TechCard;
