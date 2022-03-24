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
        // projectID="941d22c2-8fa3-4667-8160-392008fb47f7"
        projectID={process.env.REACT_APP_CHAT_PROJECT_ID}
      />
    </div>
  );
}

export default Messages;
