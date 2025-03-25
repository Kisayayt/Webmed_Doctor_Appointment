import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DoctorAvailableSlots = () => {
  const [doctorId, setDoctorId] = useState("");
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState("");

  // Lấy doctorId từ token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDoctorId(decoded.id);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  // Fetch danh sách slots khi doctorId thay đổi
  useEffect(() => {
    if (doctorId) {
      axios
        .get(`http://localhost:9999/doctor/${doctorId}/available-slots`)
        .then((response) => {
          setSlots(response.data.available_slots);
        })
        .catch((error) => console.error("Error fetching slots:", error));
    }
  }, [doctorId]);

  // Thêm slot mới
  const handleAddSlot = () => {
    if (!newSlot) return alert("Vui lòng chọn thời gian hợp lệ!");
    const utcSlot = new Date(newSlot).toISOString();

    axios
      .post("http://localhost:9999/doctor/add-available-slot", {
        doctorId,
        slot: [utcSlot],
      })
      .then((response) => {
        setSlots(response.data.available_slots);
        setNewSlot("");
        alert("Slot added successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add slot!");
      });
  };

  // Xóa slot
  const handleDeleteSlot = (slotToDelete) => {
    console.log("Deleting slot:", slotToDelete);
    axios
      .post("http://localhost:9999/doctor/remove-available-slot", {
        doctorId,
        slot: slotToDelete,
      })
      .then((response) => {
        setSlots(response.data.available_slots);
        alert("Slot deleted successfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete slot!");
      });
  };

  // Giới hạn thời gian chọn slot từ thời điểm hiện tại
  const getLocalDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <Container disableGutters sx={{ mt: 7 }}>
      {/* Input để thêm slot */}
      <Box sx={{ display: "flex", gap: 2, marginY: 2 }}>
        <TextField
          type="datetime-local"
          value={newSlot}
          onChange={(e) => setNewSlot(e.target.value)}
          label="New Available Slot"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: getLocalDateTime() }}
        />
        <Button
          sx={{
            bgcolor: "#5F6FFF",
            textTransform: "none",
            borderRadius: "10px",
            width: "150px",
          }}
          variant="contained"
          color="primary"
          onClick={handleAddSlot}
        >
          Add Slot
        </Button>
      </Box>

      {/* Bảng hiển thị danh sách slots */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Thời gian</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slots.length > 0 ? (
              slots.map((slot, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">
                    {new Date(slot).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeleteSlot(slot)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Không có slot khả dụng
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DoctorAvailableSlots;
