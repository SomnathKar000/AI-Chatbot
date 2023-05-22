import React from "react";
import ChatMsg from "./ChatMessage";
import { Box } from "@mui/material";
import { useChatContext } from "../context/chat-context";

const ChatBotComponent = () => {
  const { messages } = useChatContext();

  return (
    <Box>
      <ChatMsg
        avatar={""}
        messages={[
          "Hello! Welcome to our chatbot. How may I assist you today?",
        ]}
      />

      {messages &&
        messages.map((item, index) => {
          const { role, message } = item;
          const side = role === "assistant" ? "left" : "right";
          return <ChatMsg side={side} messages={message} key={index} />;
        })}
    </Box>
  );
};

export default ChatBotComponent;
