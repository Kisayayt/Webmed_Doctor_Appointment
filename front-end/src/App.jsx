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
import DoctorListFromUser from "./modules/doctor-list/DoctorListFromUser";

import { Navigate } from "react-router-dom";
import DoctorLayout from "./layout/doctor/DoctorLayout";
import DoctorDashboard from "./modules/doctor-dashboard/DoctorDashboard";
import DoctorAvailableSlots from "./modules/doctor-appointments/DoctorAvailableSlots";
import DoctorAppointments from "./modules/doctor-appointments/DoctorAppointments";

function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      return <Navigate to="/login" />;
    }

    // Chặn bác sĩ vào trang dành cho bệnh nhân
    if (role === "doctor") {
      return <Navigate to="/doctor/dashboard" />;
    }

    return children;
  };

  const DoctorRoute = ({ children }) => {
    console.log("role is", localStorage.getItem("role"));
    const role = localStorage.getItem("role");
    return role === "doctor" ? children : <Navigate to="/home" />;
  };
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PatientLayout />}>
            <Route path="/home" element={<LandingPage />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/doctor/:id"
              element={
                <PrivateRoute>
                  <DoctorDetail />
                </PrivateRoute>
              }
            />
            <Route path="/doctor-list" element={<DoctorListFromUser />} />
          </Route>

          <Route path="/doctor" element={<DoctorLayout />}>
            <Route
              path="/doctor/dashboard"
              element={
                <DoctorRoute>
                  <DoctorDashboard />
                </DoctorRoute>
              }
            />

            <Route
              path="/doctor/create-appointment"
              element={
                <DoctorRoute>
                  <DoctorAvailableSlots />
                </DoctorRoute>
              }
            />

            <Route
              path="/doctor/appointments"
              element={
                <DoctorRoute>
                  <DoctorAppointments />
                </DoctorRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
