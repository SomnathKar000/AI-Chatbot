import * as React from "react";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Box, Paper, Typography, Tooltip, IconButton } from "@mui/material";
import { useChatContext } from "../context/chat-context";

const ChatMessage = (props) => {
  const { copyMessage } = useChatContext();
  if (props.side === "right") {
    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", padding: 3, gap: 1 }}
      >
        {props.messages.map((msg, index) => {
          return <Typography key={index}>{msg}</Typography>;
        })}
      </Box>
    );
  }
  return (
    <Paper
      elevation={8}
      sx={{ display: "flex", justifyContent: "space-between", marginY: 2 }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", padding: 3, gap: 1 }}
      >
        {props.messages.map((msg, index) => {
          return <Typography key={index}>{msg}</Typography>;
        })}
      </Box>
      <Box component="span">
        <Tooltip title="Copy this text">
          <IconButton
            onClick={() => {
              copyMessage(props.messages);
            }}
          >
            <ContentPasteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default ChatMessage;
