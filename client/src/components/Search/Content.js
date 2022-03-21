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
        const newArr = [];
        response.data.forEach((element) => {
          element.specialties = [element.specialty];
          let index = newArr.findIndex((mentor) => mentor.name == element.name);

          index === -1
            ? newArr.push(element)
            : newArr[index].specialties.push(element.specialty);
        });
        setMentors(newArr);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, []);

  const mentorContainsSpecialty = (specialties, input) => {
    let found = false;
    if (specialties) {
      found =
        specialties.map((s) => s.toLowerCase()).filter((x) => x.includes(input))
          .length > 0;
    }
    return found;
  };

  return (
    <div>
      {mentors
        .filter((m) => mentorContainsSpecialty(m.specialties, props.input))
        .map((mentor) => {
          return (
            <ProfileCard
              key={mentor.id}
              id={mentor.user_id}
              name={mentor.name}
              picture={mentor.picture}
              jobTitle={mentor.job_title}
              yearsOfExperience={mentor.years_of_experience}
              price={mentor.price}
              city={mentor.city}
              country={mentor.country}
              specialties={mentor.specialties}
            />
          );
        })}
    </div>
  );
}

export default Content;
