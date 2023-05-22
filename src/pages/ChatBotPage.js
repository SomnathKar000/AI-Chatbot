import React, { useEffect } from "react";
import ChatBotComponent from "../components/ChatBotComponent";
import ChatBotInput from "../components/ChatBotInput";
import Container from "@mui/material/Container";
import LoadingPage from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../context/chat-context";

const ChatBotPage = () => {
  const { GetUserData, loading, getMessages } = useChatContext();
  const history = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      GetUserData();
      getMessages();
    } else {
      history("/login");
    }
  }, [token]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Container
      className="container"
      maxWidth="sm"
      sx={{
        marginTop: 3,
      }}
    >
      <ChatBotComponent />
      <ChatBotInput />
    </Container>
  );
};

export default ChatBotPage;
