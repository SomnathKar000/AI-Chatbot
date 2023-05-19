import React, { useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Box, TextField, Tooltip, IconButton } from "@mui/material";
import { useChatContext } from "../context/chat-context";

const ChatBotInput = () => {
  const queryRef = useRef("");
  const { getAllMessage, openAlert } = useChatContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = queryRef.current.value;
    if (query.length < 1) {
      openAlert("Enter your prompt", "info");
      return;
    }
    getAllMessage(query);
    queryRef.current.value = "";
  };
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "150px",
        padding: "20px",
        backgroundColor: "background.paper",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <TextField
        inputRef={queryRef}
        fullWidth
        required
        multiline
        maxRows={4}
        placeholder="Enter a prompt here"
      />
      <Tooltip title="Send the message">
        <IconButton onClick={handleSubmit}>
          <SendIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ChatBotInput;
