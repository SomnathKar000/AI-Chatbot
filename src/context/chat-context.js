import { useContext, useReducer, createContext, useEffect } from "react";
import axios from "axios";
import reducer from "../reducer/chat-reducer";
import io from "socket.io-client";

const initialstate = {
  alert: {
    open: false,
    type: "info",
    message: "Enter your dratails",
  },
  loading: false,
  mode: "light",
  user: {},
  messages: [],
};

const ChatContext = createContext();

const host = window.location.origin;
const socketHost = host;

export const ChatContextProvider = ({ children }) => {
  const socket = io.connect(socketHost);
  console.log(host);
  const [state, dispatch] = useReducer(reducer, initialstate);

  const openAlert = (message, type) => {
    dispatch({ type: "OPEN_ALERT", payload: { message, type } });
  };
  const startLoading = () => {
    dispatch({ type: "START_LOADING" });
  };
  const endLoading = () => {
    dispatch({ type: "END_LOADING" });
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
  const SignUpUser = async (name, email, password) => {
    startLoading();
    try {
      const response = await axios.post(`${host}/api/v1/user/sign-up`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        openAlert(response.data.msg, "success");
        localStorage.setItem("token", response.data.token);

        return true;
      }
    } catch (error) {
      endLoading();
      openAlert(error.response.data.msg, "error");
    }
  };
  const LoginUser = async (email, password) => {
    startLoading();
    try {
      const response = await axios.post(`${host}/api/v1/user/login`, {
        email,
        password,
      });
      if (response.data.success) {
        openAlert(response.data.msg, "success");
        localStorage.setItem("token", response.data.token);

        return true;
      }
    } catch (error) {
      endLoading();
      openAlert(error.response.data.msg, "error");
      return false;
    }
  };
  const GetUserData = async () => {
    startLoading();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${host}/api/v1/user/get-user`, {
        headers: {
          "auth-token": token,
        },
      });
      if (response.data.success) {
        dispatch({ type: "UPDATE_USER", payload: response.data.user });
      }
    } catch (error) {
      localStorage.removeItem("token");
      openAlert(error.response.data.msg, "error");
      endLoading();
      return false;
    }
  };

  const LogoutUser = (e) => {
    localStorage.removeItem("token");
    dispatch("LOGOUT_USER");
  };
  const catchError = () => {
    socket.on("error", (msg) => openAlert(msg, "error"));
  };
  const sendMessage = (data) => {
    const token = localStorage.getItem("token");

    try {
      socket.emit("chatBot", {
        message: data,
        auth: { token },
        userName: "Somnath Kar",
      });
    } catch (err) {
      console.log(err);
      catchError();
    }
  };

  const updateMessages = (message) => {
    dispatch({ type: "UPDATE_SINGLE_MESSAGE", payload: message });
  };

  const getMessages = () => {
    const token = localStorage.getItem("token");
    socket.emit("getMessages", { auth: { token } });
    socket.on("getMessages", (messages) => {
      dispatch({ type: "GET_ALL_MESSAGES", payload: messages });
      endLoading();
    });
  };

  const getMessageResponce = () => {
    socket.on("userMessage", (data) => {
      console.log(data);
      updateMessages(data);
    });
    socket.on("userAnswer", (data) => {
      console.log(data);
      updateMessages(data);
    });
  };

  const copyMessage = (data) => {
    const newdata = data.join("\n");
    console.log(navigator.clipboard.writeText(newdata));
  };

  useEffect(() => {
    getMessageResponce();
    getMessages();

    return () => {
      socket.off("userMessage");
      socket.off("userAnswer");
      socket.off("getMessages");
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        ...state,
        startLoading,
        endLoading,
        openAlert,
        handleCloseAlert,
        changeMode,
        sendMessage,
        GetUserData,
        LoginUser,
        SignUpUser,
        LogoutUser,
        getMessages,
        getMessageResponce,
        copyMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
