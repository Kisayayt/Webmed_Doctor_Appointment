import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import theme from "./helper/theme";

import "./index.css";
import { ThemeProvider } from "@mui/material";

import PatientLayout from "./layout/patient/PatientLayout";
import LandingPage from "./modules/LandingPage";
import Login from "./modules/login/Login";
import Register from "./modules/login/Register";
import UserProfile from "./modules/profile-user/UserProfile";
import DoctorDetail from "./modules/doctor-detail/DoctorDetail";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PatientLayout />}>
            <Route path="/home" element={<LandingPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctor/:id" element={<DoctorDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
