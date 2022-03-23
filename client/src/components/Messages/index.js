import React from "react";
import { ChatEngine, MessageFormSocial } from "react-chat-engine";
import NavBar from "../NavBar";

function Messages() {
  return (
    <div>
      <NavBar />
      <ChatEngine
        height="93vh"
        userName="linklink"
        userSecret="1234"
        projectID="941d22c2-8fa3-4667-8160-392008fb47f7"
      />
    </div>
  );
}

export default Messages;
