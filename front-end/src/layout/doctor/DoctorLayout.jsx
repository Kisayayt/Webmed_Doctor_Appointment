import React from "react";
import { Box } from "@mui/material";
import DoctorHeader from "../../components/doctor/DoctorHeader";

import { Outlet } from "react-router-dom";
import SidebarForDoctor from "../../components/doctor/sidebar-doctor/SidebarForDoctor";

function DoctorLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <SidebarForDoctor />

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DoctorHeader />

        <Outlet />
      </Box>
    </Box>
  );
}

export default DoctorLayout;
