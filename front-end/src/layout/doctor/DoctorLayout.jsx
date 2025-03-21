import React from "react";
import DoctorHeader from "../../components/doctor/DoctorHeader";
import { Outlet } from "react-router-dom";
import DoctorFooter from "../../components/doctor/DoctorFooter";

function DoctorLayout() {
  return (
    <div>
      <DoctorHeader />
      <Outlet></Outlet>
      <DoctorFooter />
    </div>
  );
}

export default DoctorLayout;
