import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function DoctorDashboard() {
  const [doctorCount, setDoctorCount] = useState(0);
  const [pendingAppointments, setPendingAppointments] = useState(0);

  const token = localStorage.getItem("token");
  let doctorId = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      doctorId = decoded.id;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  useEffect(() => {
    // Gọi API lấy tổng số bác sĩ
    axios
      .get("http://localhost:9999/doctor/count-doctor")
      .then((res) => setDoctorCount(res.data.count))
      .catch((err) => console.error(err));

    // Gọi API lấy số appointment pending của bác sĩ này
    if (doctorId) {
      axios
        .get(
          `http://localhost:9999/appointment/count-pending-appointments/${doctorId}`
        )
        .then((res) => setPendingAppointments(res.data.count))
        .catch((err) => console.error(err));
    }
  }, [doctorId]);

  return (
    <Container disableGutters sx={{ mt: 7 }}>
      {/* Box hiển thị số bác sĩ */}
      <Box
        sx={{
          height: "150px",
          width: "400px",
          borderRadius: "10px",
          border: "3px solid #EAEFFF",
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box padding={5} display={"flex"} alignItems={"center"}>
          <Box
            sx={{ width: "100px", height: "100px", marginRight: "20px" }}
            component={"img"}
            src="/images/doctor_icon.svg"
          ></Box>
          <Stack>
            <Typography variant="h4">{doctorCount}</Typography>
            <Typography variant="body1">Total Doctors</Typography>
          </Stack>
        </Box>
      </Box>

      {/* Box hiển thị số appointment pending */}
      <Box
        sx={{
          height: "150px",
          width: "400px",
          borderRadius: "10px",
          border: "3px solid #EAEFFF",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box padding={5} display={"flex"} alignItems={"center"}>
          <Box
            sx={{ width: "100px", height: "100px", marginRight: "20px" }}
            component={"img"}
            src="/images/appointments_icon.svg"
          ></Box>
          <Stack>
            <Typography variant="h4">{pendingAppointments}</Typography>
            <Typography variant="body1">Pending Appointments</Typography>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default DoctorDashboard;
