import { React, useState, useEffect } from "react";
import axios from "axios";
import CardProfile from "./CardProfile";
import SearchBar from "./SearchBar";
import Filter from "./Filter";

function Search() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        console.log("data!");
        setUsers(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1> Search Page Here </h1>
      <div className="App">
        <SearchBar />
        <Filter />
        {users.map((user) => {
          return (
            <CardProfile
              id={user.id}
              email={user.email}
              password={user.password}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Search;
