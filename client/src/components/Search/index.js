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
      <NavBar />
      <SearchBar />
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Filter />
        </Grid>
        <Grid item xs={8}>
          <Content />
        </Grid>
      </Grid>
      <h1> Search Page Here </h1>
      <div className="App">
        <SearchBar />
        <Filter />
        {/* {users.map((user) => {
          return (
            <ProfileCard
              id={user.id}
              email={user.email}
              password={user.password}
              country={user.country}
            />
          );
        })} */}
      </div>
    </div>
  );
}

export default Search;
