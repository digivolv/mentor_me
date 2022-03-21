import { React, useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";

function Content(props) {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/mentors/expertise")
      .then((response) => {
        setMentors(response.data);
        console.log("DATA:", response.data);
        const newArr = [];
        response.data.forEach((element) => {
          console.log("NAME:", element.name);
          element.specialties = [element.specialty];
          console.log("ELEMENT:", element);
          let index = newArr.findIndex((mentor) => mentor.name == element.name);
          console.log("INDEX", index);

          index === -1
            ? newArr.push(element)
            : newArr[index].specialties.push(element.specialty);

          console.log("NEWARR:", newArr);
        });
        setMentors(newArr);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);

  return (
    <div>
      {mentors.map((mentor) => {
        return (
          mentor.name.toLowerCase().includes(props.input) && (
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
              specialties={mentor.specialties}
            />
          )
        );
      })}
    </div>
  );
}

export default Content;

// : (newArr[index].specialties.push = element.specialty);
