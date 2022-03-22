import { React, useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import NavBar from "../NavBar";
import List from "./List";
import "./styles.css";
import axios from "axios";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [list, setList] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([20, 60]);
  // const [experience, setExperience] = useState([]);

  const [allMentors, setAllMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState(allMentors);

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  // const handleExperienceChecked = (id) => {
  //   const experienceStateList = experience;
  //   const changeCheckedExperiences = experienceStateList.map((mentor) =>
  //     mentor.id === id ? { ...mentor, checked: !mentor.checked } : mentor
  //   );
  //   setExperience(changeCheckedExperiences);
  // };

  let all = [];
  const createSpecialtiesArr = (response) => {
    response.data.forEach((element) => {
      element.specialties = [element.specialty];
      let index = all.findIndex((mentor) => mentor.name === element.name);

      index === -1
        ? all.push(element)
        : all[index].specialties.push(element.specialty);
    });
    setAllMentors(all);
    setFilteredMentors(all);
  };

  const applyFilters = () => {
    let updated = allMentors;

    ///////// Years of Experience Filter  /////////////

    // const experiencesChecked = experience
    //   .filter((mentor) => mentor.checked)
    //   .map((mentor) => mentor.label.toLowerCase());

    // if (experiencesChecked.length) {
    //   updatedList = updatedList.filter((mentor) =>
    //     exprriencesChecked.includes(mentor.years_of_experience)
    //   );
    // }

    //////////////////////////////////////////////

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updated = updated.filter(
      (mentor) => mentor.price <= maxPrice && mentor.price >= minPrice
    );

    setFilteredMentors(updated);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/mentors/expertise")
      .then((response) => {
        createSpecialtiesArr(response);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedPrice]);

  return (
    <div className="search">
      <NavBar />
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
      <div className="content">
        <div className="filter-pane">
          Filters:
          <FilterPanel
            selectedPrice={selectedPrice}
            changePrice={handleChangePrice}
            // experiences={experience}
            // changeExperience={handleExperienceChecked}
          />
        </div>
        <div className="list-pane">
          <List list={filteredMentors} input={searchInput} />
        </div>
      </div>
    </div>
  );
}

export default Search;
