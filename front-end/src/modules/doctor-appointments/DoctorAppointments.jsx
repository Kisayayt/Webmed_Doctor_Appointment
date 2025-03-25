import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  TableContainer,
  Paper,
} from "@mui/material";
import { CheckCircle, Cancel, Done, Delete } from "@mui/icons-material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DoctorAppointments = () => {
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

  const [appointments, setAppointments] = useState([]);

  // Lấy danh sách appointments của bác sĩ
  useEffect(() => {
    if (doctorId) {
      axios
        .get(`http://localhost:9999/appointment/${doctorId}/appointments`)
        .then((response) => setAppointments(response.data.appointments))
        .catch((error) => console.error(error));
    }
  }, [doctorId]);

  // Chấp nhận appointment → đổi trạng thái sang "in-progress"
  const handleAccept = (appointmentId) => {
    axios
      .post("http://localhost:9999/appointment/accept-appointment", {
        appointmentId,
      })
      .then(() => {
        setAppointments(
          appointments.map((apt) =>
            apt._id === appointmentId ? { ...apt, status: "in-progress" } : apt
          )
        );
      })
      .catch((error) => console.error(error));
  };

  // Hoàn thành appointment → đổi trạng thái sang "completed"
  const handleFinish = (appointmentId) => {
    axios
      .post("http://localhost:9999/appointment/finish-appointment", {
        appointmentId,
      })
      .then(() => {
        setAppointments(
          appointments.map((apt) =>
            apt._id === appointmentId ? { ...apt, status: "completed" } : apt
          )
        );
      })
      .catch((error) => console.error(error));
  };

  // Xóa appointment (cho trạng thái pending & in-progress)
  const handleDelete = (appointmentId) => {
    axios
      .delete("http://localhost:9999/appointment/delete-appointment", {
        data: { appointmentId },
      })
      .then(() => {
        setAppointments(
          appointments.filter((apt) => apt._id !== appointmentId)
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container disableGutters sx={{ mt: 7 }}>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "10px", boxShadow: 3 }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell>Patient</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((apt) => (
              <TableRow key={apt._id} hover>
                <TableCell>{apt.patient_id?.name || "Unknown"}</TableCell>
                <TableCell>{new Date(apt.date).toLocaleString()}</TableCell>
                <TableCell>{apt.status}</TableCell>
                <TableCell align="center">
                  {apt.status === "pending" && (
                    <>
                      <IconButton
                        onClick={() => handleAccept(apt._id)}
                        sx={{ color: "#54d67d", mr: 1 }}
                      >
                        <CheckCircle fontSize="large" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(apt._id)}
                        sx={{ color: "#db3d3d" }}
                      >
                        <Cancel fontSize="large" />
                      </IconButton>
                    </>
                  )}
                  {apt.status === "in-progress" && (
                    <>
                      <IconButton
                        onClick={() => handleFinish(apt._id)}
                        sx={{ color: "blue", mr: 1 }}
                      >
                        <Done fontSize="large" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(apt._id)}
                        sx={{ color: "#db3d3d" }}
                      >
                        <Delete fontSize="large" />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DoctorAppointments;
