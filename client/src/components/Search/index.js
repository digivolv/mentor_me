import { React } from "react";
import { Grid } from "@mui/material";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import NavBar from "../NavBar";
import Content from "./Content";

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
          {/* <Content /> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default Search;
