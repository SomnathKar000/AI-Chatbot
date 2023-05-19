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
};

const ChatContext = createContext();

let host = "http://localhost:5000";

const socket = io.connect(host);

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
    const token = localStorage.getItem("token");
    startLoading();
    try {
      const response = await axios.get(`${host}/api/v1/user/get-user`, {
        headers: {
          "auth-token": token,
        },
      });
      if (response.data.success) {
        dispatch({ type: "UPDATE_USER", payload: response.data.user });
      }
      endLoading();
    } catch (error) {
      openAlert(error.response.data.msg, "error");
      endLoading();
      return false;
    }
  };

  const LogoutUser = (e) => {
    localStorage.removeItem("token");
    dispatch("LOGOUT_USER");
  };

  const getAllMessage = (data) => {
    try {
      const token = localStorage.getItem("token");
      console.log(data);
      socket.emit("chatBot", {
        message: data,
        auth: { token },
        userName: "Somnath Kar",
      });
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
        GetUserData,
        LoginUser,
        SignUpUser,
        LogoutUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
