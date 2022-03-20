import React from "react";

const CardProfile = (props) => {
  const { id, email, password } = props;

  const styles = {
    border: "1px solid rgba(0, 0, 0, 0.05)",
  };

  return (
    <div style={styles}>
      <h3>{`ID: ${id}`}</h3>
      <h2>{`Email: ${email}`}</h2>
      <p>{`Password: ${password}`}</p>
    </div>
  );
};

export default CardProfile;
