import React, { useRef } from "react";
import { Box, Typography, TextField, FormControl, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useChatContext } from "../context/chat-context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  gap: 3,
};

const LoginPage = () => {
  const { openAlert } = useChatContext();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (password.length < 5) {
      openAlert("Enter a valid password", "error");
      return;
    }
    console.log(email, password);
  };

  return (
    <Box>
      <FormControl sx={style} onSubmit={handleSubmit} component="form">
        <Box>
          <Typography textAlign="center" gutterBottom variant="h3">
            CHAT BOT
          </Typography>
        </Box>
        <TextField inputRef={emailRef} label="Email" fullWidth />
        <TextField inputRef={passwordRef} label="Password" fullWidth />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#6c63ff",
            "&:hover": { backgroundColor: "#5a50d3" },
          }}
        >
          Submit
        </Button>
        <Typography textAlign="center" variant="subtitle1" gutterBottom>
          DONT' HAVE AN ACCOUNT?{" "}
          <Link style={{ textDecoration: "none" }} to="/sign-up">
            REGISTER
          </Link>
        </Typography>
      </FormControl>
    </Box>
  );
};

export default LoginPage;
