import React from "react";
import { PopupButton } from "react-calendly";
import NavBar from "./NavBar";
const Calendar = () => {
  return (
    <div className="Calendar">
      <NavBar/>
      <PopupButton
        url="https://calendly.com/j-jaeykim/30min?month=2022-03"
        /*
         * react-calendly uses React's Portal feature (https://reactjs.org/docs/portals.html) to render the popup modal. As a result, you'll need to
         * specify the rootElement property to ensure that the modal is inserted into the correct domNode.
         */
        rootElement={document.getElementById("root")}
        text="Click here to schedule!"
      />
    </div>
  );
};

export default Calendar;