import React, { useRef } from "react";
// import ChatBotIcon from "../components/ChatBotIcon";
import { Link } from "react-router-dom";
import { useChatContext } from "../context/chat-context";
import { Box, Typography, TextField, FormControl, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  gap: 3,
};

const SignUpPage = () => {
  const { openAlert } = useChatContext();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (name.trim().length < 4) {
      openAlert("Please enter a valid name.", "error");
      return;
    }
    if (password.length < 5) {
      openAlert("Password must be at least 5 characters", "error");
      return;
    }
    if (password !== confirmPassword) {
      openAlert("Passwords do not match.", "error");
      return;
    }
    console.log(name, email, password, confirmPassword);
  };
  return (
    <Box>
      <FormControl onSubmit={handleSubmit} sx={style} component="form">
        <Box>
          <Typography textAlign="center" gutterBottom variant="h3">
            CHAT BOT
          </Typography>
        </Box>
        <TextField
          inputRef={nameRef}
          type="text"
          label="Name"
          fullWidth
          required
        />
        <TextField
          inputRef={emailRef}
          type="email"
          label="Email"
          fullWidth
          required
        />
        <TextField inputRef={passwordRef} label="Password" fullWidth required />
        <TextField
          inputRef={confirmPasswordRef}
          label="Confirm Password"
          error={false}
          helperText=""
          required
          fullWidth
        />
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
          ALREADY HAVE AN ACOUNT
          <Link style={{ textDecoration: "none" }} to="/login">
            LOGIN
          </Link>
        </Typography>
      </FormControl>
    </Box>
  );
};

export default SignUpPage;
