import * as React from "react";
import SendIcon from "@mui/icons-material/Send";
import { Box, TextField, Tooltip, IconButton } from "@mui/material";

const ChatBotInput = () => {
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
        fullWidth
        required
        multiline
        maxRows={4}
        placeholder="Enter a prompt here"
      />
      <Tooltip title="Send the message">
        <IconButton>
          <SendIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ChatBotInput;
