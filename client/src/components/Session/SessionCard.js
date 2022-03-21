import React from "react";

const SessionCard = (props) => {
  const { mentor_id, mentee_id, mentee_name, mentor_name, date, duration } =
    props;

  const styles = {
    border: "1px solid rgba(0, 0, 0, 0.05)",
  };

  return (
    <div style={styles}>
      <h3>{`ID: ${mentor_id}`}</h3>
      <h3>{`mentee_id: ${mentee_id}`}</h3>
      <h2>{`mentee_name: ${mentee_name}`}</h2>
      <p>{`mentor_name: ${mentor_name}`}</p>
      <p>{`date: ${date}`}</p>
      <p>{`duration: ${duration}`}</p>
    </div>
  );
};

export default SessionCard;

{
  /* <aside>
  <span>Thank you</span>
  <h1>session_id {user.id}</h1>
  <h1>mentor_id {user.mentor_id}</h1>
  <h1>mentee_id {user.mentee_id}</h1>
  <h1>Hi, mentee_name {user.mentee_name}</h1>
  <h1>
    How was your experience with mentor_name {user.mentor_name}?
  </h1>
  <h1>date {user.date}</h1>
  <h1>duration {user.duration}</h1>
</aside>

*/
}
