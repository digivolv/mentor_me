import { React, useState } from "react";
import { TextField } from "@mui/material";
import "./SearchBar.css";
import List from "../List";

const SearchBar = ({ value, changeInput }) => {
  return (
    <div className="main">
      <h3>Find a Mentor:</h3>
      <br />
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={changeInput}
          value={value}
          variant="outlined"
          fullWidth
          label="Search Technology"
        />
      </div>
      {/* <List input={value} /> */}
    </div>
  );
};

export default SearchBar;
