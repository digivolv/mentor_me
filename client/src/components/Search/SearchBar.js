import { React, useState } from "react";
import { TextField } from "@mui/material";
import "./SearchBar.css";
import Content from "./Content";

const SearchBar = (props) => {
  const [inputText, setInputText] = useState("");

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <div className="main">
      <h3>Find a Mentor:</h3>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search Technology"
        />
      </div>
      <Content input={inputText} />
    </div>
  );
};

export default SearchBar;
