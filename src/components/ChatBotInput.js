import * as React from "react";
import {
  Box,
  TextField,
  Typography,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";

const ChatBotInput = () => {
  return (
    <Box>
      <TextField fullWidth={true} placeholder="Enter a prompt here" />
    </Box>
  );
};

export default ChatBotInput;
