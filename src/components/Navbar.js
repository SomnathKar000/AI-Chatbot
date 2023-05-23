import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
// import ChatBotIcon from "./ChatBotIcon";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../context/chat-context";

import { Tooltip } from "@mui/material";

const Navbar = () => {
  const history = useNavigate();
  const { mode, changeMode, LogoutUser } = useChatContext();
  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: 0 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SmartToyIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CHAT BOT
          </Typography>
          {localStorage.getItem("token") ? (
            <Button onClick={LogoutUser} color="inherit">
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => {
                history("/login");
              }}
              color="inherit"
            >
              Login
            </Button>
          )}

          <Tooltip title={`Enable ${mode === "light" ? "dark" : "light"} mode`}>
            <IconButton onClick={changeMode}>
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
