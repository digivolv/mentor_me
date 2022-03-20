import React from "react";

const CardProfile = (props) => {
  const { id, email, password, country } = props;

  const styles = {
    border: "1px solid rgba(0, 0, 0, 0.5)",
    marginLeft: "600px",
    marginBottom: "50px",
    paddingLeft: "15px",
    textAlign: "left",
    // margin: "0px 100px",
  };

  return (
    <div style={styles}>
      <h3>{`ID: ${id}`}</h3>
      <h2>{`Email: ${email}`}</h2>
      <p>{`Password: ${password}`}</p>
      <p>{`Country: ${country}`}</p>
    </div>
  );
};

export default CardProfile;
