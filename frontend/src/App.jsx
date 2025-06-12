import { Box, Button } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import LoginPage from "./pages/LoginPage";
import LogoutSuccessPage from "./pages/LogoutSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import CallbackPage from "./pages/CallbackPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedLayout from "./components/ProtectedLayout";
import { useColorModeValue } from "./components/ui/color-mode";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.700")}>
      <NavBar />
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout_success" element={<LogoutSuccessPage />} />
        <Route path="/" element={<HomePage />} />
        {/* private routes */}
        {/* <Route element={<ProtectedLayout />}>           */}
          <Route path="/create" element={<CreatePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="*" element={<NotFoundPage />} />
        {/* </Route> */}
      </Routes>
    </Box>
  );
}

export default App;
