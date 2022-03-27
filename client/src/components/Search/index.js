import { React, useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import NavBar from "../NavBar";
import List from "./List";
import "./styles.css";
import axios from "axios";
import { min } from "date-fns";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  // const [list, setList] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([20, 60]);
  const [experienceList, setExperienceList] = useState([
    { id: 1, checked: true, label: "> 15 years" },
    { id: 2, checked: true, label: "5-15 years" },
    { id: 3, checked: true, label: "5 years" },
  ]);

  const [allMentors, setAllMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState(allMentors);

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const handleChangeExperience = (id) => {
    const experienceStateList = experienceList;
    const changeCheckedExperience = experienceStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setExperienceList(changeCheckedExperience);
  };

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
    console.log("UPDATED LIST 1", updated);

    ///////// Years of Experience Filter  /////////////
    console.log("EXPERIENCE LIST", experienceList);

    // const experienceChecked = experienceList.filter((item) => item.checked);

    const experienceChecked = experienceList.filter((item) => item.checked);

    console.log("EXP CHECK", experienceChecked);

    if (experienceChecked) {
      let mentorsToKeep = [];
      experienceChecked.forEach((exp) => {
        let toKeep = [];
        if (exp.id === 1) {
          toKeep = updated.filter((m) => m.years_of_experience >= 15);
          toKeep.forEach((m) => mentorsToKeep.push(m));
        } else if (exp.id === 2) {
          toKeep = updated.filter(
            (m) => m.years_of_experience <= 15 && m.years_of_experience >= 5
          );
          toKeep.forEach((m) => mentorsToKeep.push(m));
        } else if (exp.id === 3) {
          toKeep = updated.filter(
            (m) => m.years_of_experience <= 5 && m.years_of_experience >= 0
          );
          toKeep.forEach((m) => mentorsToKeep.push(m));
        }
      });
      updated = mentorsToKeep;
    }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updated = updated.filter(
      (mentor) => mentor.price <= maxPrice && mentor.price >= minPrice
    );

    console.log("UPDATED LIST 2", updated);

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
  }, [selectedPrice, experienceList, searchInput]);

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
            experienceList={experienceList}
            changeExperience={handleChangeExperience}
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
