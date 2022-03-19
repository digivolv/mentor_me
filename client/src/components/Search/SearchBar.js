import { React, useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { List } from "@mui/material";

const SearchBar = (props) => {
  const styles = {
    border: "1px solid rgba(0, 0, 0, 0.5)",
    marginLeft: "100px",
    marginBottom: "50px",
    paddingLeft: "15px",
    textAlign: "left",
  };

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
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
          label="Search"
        />
      </div>
      <List input={inputText} />
    </div>
  );
};

export default SearchBar;
