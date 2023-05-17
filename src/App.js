import ChatBotPage from "./pages/ChatBotPage";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@mui/material";
import NavBar from "./components/Navbar";
import Alert from "./components/AlertComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useChatContext } from "./context/chat-context";

function App() {
  let { mode } = useChatContext();

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Alert />
        <Container>
          <Routes>
            <Route path="/" element={<ChatBotPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
