import { useContext, useReducer, createContext, useEffect } from "react";
import Axios from "axios";
import reducer from "../reducer/chat-reducer";
import io from "socket.io-client";

const initialstate = {
  alert: {
    open: false,
    type: "info",
    message: "Enter your dratails",
  },
  loading: true,
  mode: "light",
  user: {},
};

const ChatContext = createContext();

const socket = io.connect("http://localhost:5000");

export const ChatContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const startLoading = () => {
    dispatch({ type: "START_LOADING" });
  };
  const endLoading = () => {
    dispatch({ type: "END_LOADING" });
  };

  const openAlert = (message, type) => {
    dispatch({ type: "OPEN_ALERT", payload: { message, type } });
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "CLOSE_ALERT" });
  };
  const changeMode = () => {
    dispatch({ type: "CHANGE_MODE" });
  };
  const SignUpUser = () => {};
  const LoginUser = () => {};
  const GetUserData = () => {};

  const getAllMessage = (data) => {
    try {
      const token = localStorage.getItem("token");
      console.log(data);
      socket.emit("chatBot", { message: data, auth: { token } });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.on("chatBot", (data) => {
      console.log(data);
    });
  });

  return (
    <ChatContext.Provider
      value={{
        ...state,
        startLoading,
        endLoading,
        openAlert,
        handleCloseAlert,
        changeMode,
        getAllMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
