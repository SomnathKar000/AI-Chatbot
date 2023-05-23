import React, { useRef, useEffect } from "react";
import ChatMsg from "./ChatMessage";
import { Box, Button } from "@mui/material";
import { useChatContext } from "../context/chat-context";

const ChatBotComponent = () => {
  const { messages } = useChatContext();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: chatContainerRef.current.offsetTop,
      behavior: "instant",
    });
  }, [messages]);

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
      <Button disabled={true} ref={chatContainerRef}></Button>
    </Box>
  );
};

export default ChatBotComponent;
