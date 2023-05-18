import React from "react";
import ChatBotComponent from "../components/ChatBotComponent";
import ChatBotInput from "../components/ChatBotInput";
import Container from "@mui/material/Container";

const ChatBotPage = () => {
  return (
    <Container
      className="container"
      maxWidth="sm"
      sx={{
        marginTop: 3,
      }}
    >
      <ChatBotComponent />
      <ChatBotInput />
    </Container>
  );
};

export default ChatBotPage;
