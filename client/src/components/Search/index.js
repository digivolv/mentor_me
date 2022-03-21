import { React, useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Filter from "./FilterPanel";
import NavBar from "../NavBar";
import List from "./List";
import "./styles.css";
import axios from "axios";

function Search() {
  const [searchInput, setSearchInput] = useState("");
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
          <Filter />
        </div>
        <div className="list-pane">
          <List mentors={mentors} input={searchInput} />
        </div>
      </div>
    </div>
  );
}

export default Search;
