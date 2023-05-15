import React, { useRef } from "react";
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
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
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
        <TextField inputRef={nameRef} type="text" label="Name" fullWidth />
        <TextField inputRef={emailRef} type="email" label="Email" fullWidth />
        <TextField inputRef={passwordRef} label="Password" fullWidth />
        <TextField
          inputRef={confirmPasswordRef}
          label="Confirm Password"
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
          ALREADY HAVE AN ACOUNT LOGIN
        </Typography>
      </FormControl>
    </Box>
  );
};

export default SignUpPage;
