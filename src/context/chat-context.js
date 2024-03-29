import { useContext, useReducer, createContext } from "react";
import axios from "axios";
import reducer from "../reducer/chat-reducer";

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

const host = process.env.REACT_APP_HOST || "http://localhost:5000";

export const ChatContextProvider = ({ children }) => {
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
      endLoading();
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

  const sendMessage = async (data) => {
    const token = localStorage.getItem("token");
    if (data === undefined) {
      openAlert("Enter your message", "error");
      return;
    }
    try {
      updateMessages({
        message: [data],
        role: "user",
      });
      const response = await axios.post(
        `${host}/api/v1/message/ai`,
        {
          question: data,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      updateMessages({
        message: response.data.AIresponse,
        role: "assistant",
      });
    } catch (err) {
      console.log(err);
      openAlert(err.response.data.msg, "error");
    }
  };

  const updateMessages = (message) => {
    dispatch({ type: "UPDATE_SINGLE_MESSAGE", payload: message });
  };

  const getMessages = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${host}/api/v1/message`, {
        headers: {
          "auth-token": token,
        },
      });
      dispatch({ type: "GET_ALL_MESSAGES", payload: response.data.messages });
      endLoading();
    } catch (error) {
      console.log(error);
      openAlert(error.response.data.msg, "error");
      endLoading();
    }
  };

  const copyMessage = (data) => {
    const newdata = data.join("\n");
    console.log(navigator.clipboard.writeText(newdata));
  };

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
