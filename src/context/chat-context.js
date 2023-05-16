import { useContext, useReducer, createContext } from "react";
import reducer from "../reducer/chat-reducer";

const initialstate = {
  alert: {
    open: false,
    type: "info",
    message: "Enter your dratails",
  },
  loading: false,
  user: {},
};

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialstate);
  return <ChatContext.Provider value={{}}>{children}</ChatContext.Provider>;
};
