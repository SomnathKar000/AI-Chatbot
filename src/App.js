import ChatBotPage from "./pages/ChatBotPage";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@mui/material";
import NavBar from "./components/Navbar";

function App() {
  let mode = "light";

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Container>
        <ChatBotPage />
      </Container>
    </ThemeProvider>
  );
}

export default App;
