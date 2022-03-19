import React from "react";

const SearchBar = (props) => {
  const styles = {
    border: "1px solid rgba(0, 0, 0, 0.5)",
    marginLeft: "100px",
    marginBottom: "50px",
    paddingLeft: "15px",
    textAlign: "left",
  };

  return (
    <div style={styles}>
      <h3>Search Bar</h3>
      <button>Search</button>
    </div>
  );
};

export default SearchBar;
