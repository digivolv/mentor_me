import { React, useState, useEffect } from 'react';
import axios from "axios";
import NavBar from '../NavBar';
import FavouriteMentor from './FavouriteMentor'

export default function Favourites() {
  const [favourites, setFavourites] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8080/favourites/${localStorage.userID}`).then((response) => {
      console.log("data!");
      setFavourites(response.data);
      console.log(response.data);
    }); 
  }, []);

  return (
    <>
      <NavBar />
      <h1>Favourites</h1>
      {favourites.map((favourite) => {
        return (
          <>
          <br></br>
          <FavouriteMentor
            mentor_name={favourite.name}
            picture={favourite.picture}
            job_title={favourite.job_title}
            price={favourite.price}
            city={favourite.city}
            mentor_id={favourite.mentor_id}
              />
            <br></br>
            </>
        )
      })}
      </>
  )
}