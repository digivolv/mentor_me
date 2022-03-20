import React from "react";

const CardProfile = (props) => {
  const { id, name, email, job_title, years_of_experience, country, price, onMentorClick } = props;

  const styles = {
    border: "1px solid rgba(0, 0, 0, 0.05)",
  };


  return (
    <div style={styles}>
      <h3>{`ID: ${id}`}</h3>
      <h3>{`Name: ${name}`}</h3>
      <h2>{`Email: ${email}`}</h2>
      <p>{`Job Title: ${job_title}`}</p>
      <p>{`Years of Experience: ${years_of_experience}`}</p>
      <p>{`Country: ${country}`}</p>
      <p>{`Price: ${price}`}</p>

    </div>
  );
};

export default CardProfile;
