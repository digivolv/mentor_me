import { React } from "react";
import ListItem from "./ListItem";

function List({ list, input }) {
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
      {list
        .filter((m) => mentorContainsSpecialty(m.specialties, input))
        .map((mentor) => {
          return (
            <ListItem
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

export default List;
