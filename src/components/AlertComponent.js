import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useChatContext } from "../context/chat-context";

const AlertComponent = () => {
  const { alert, handleCloseAlert } = useChatContext();
  const { message, open, type } = alert;
  return (
    <div>
      {" "}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity={type}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertComponent;
