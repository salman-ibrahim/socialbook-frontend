import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth";
import ProfilePage from "./pages/profile";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuthenticated = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>      
          <CssBaseline />
          <Routes>
            {/* If authenticated keep it going in any route else redirect to auth page */}
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Navigate to={"/home"}/>} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
