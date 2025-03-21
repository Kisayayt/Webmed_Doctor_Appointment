import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import PatientHeader from "../../components/patient/PatientHeader";
import PatientFooter from "../../components/patient/PatientFooter";

function PatientLayout() {
  const location = useLocation(); // Lấy thông tin về URL hiện tại
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register " ||
    location.pathname === "/profile"; // Kiểm tra nếu là trang login

  return (
    <div>
      <PatientHeader />
      <Outlet />
      {!isAuthPage && <PatientFooter />} {/* Ẩn footer nếu là trang login */}
    </div>
  );
}

export default PatientLayout;
