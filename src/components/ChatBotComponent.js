import React from "react";
// import ChatMsg from "@mui-treasury/components/chatMsg/ChatMsg";
import ChatMsg from "./ChatMessage";
import { Box } from "@mui/material";

const ChatBotComponent = () => {
  return (
    <Box>
      <ChatMsg
        avatar={""}
        messages={[
          "Hi Jenny, How r u today? Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.",
        ]}
      />
      <ChatMsg
        side={"right"}
        messages={[
          "Great! What's about you?",
          "Of course I did. Speaking of which check this out",
        ]}
      />
      <ChatMsg avatar={""} messages={["Im good.", "See u later."]} />
    </Box>
  );
};

export default ChatBotComponent;
