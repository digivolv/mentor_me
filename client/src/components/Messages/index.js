import React from "react";
import { ChatEngine } from "react-chat-engine";
import NavBar from "../NavBar";

function Messages() {
  return (
    <div>
      <NavBar />
      <ChatEngine
        height="93vh"
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
        projectID={process.env.REACT_APP_CHAT_PROJECT_ID}
      />
    </div>
  );
}

export default Messages;
