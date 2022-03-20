import { React } from "react";
import { Grid } from "@mui/material";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import NavBar from "../NavBar";
import Content from "./Content";
import ProfileCard from "./ProfileCard";

function Search() {
  return (
    <div>
      <Navbar />
      <h1> Search Page Here </h1>
      <div className="App">
        <SearchBar />
        <Filter />
        <Content />
        {users.map((user) => {
          return (
            <ProfileCard
              id={user.id}
              email={user.email}
              password={user.password}
              country={user.country}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Search;
