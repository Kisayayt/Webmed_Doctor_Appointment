import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import moment from "moment-timezone";

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9999/doctor/get-detail-doctor/${id}`)
      .then((res) => {
        const now = moment().tz("Asia/Ho_Chi_Minh");
        console.log("now", now); // Lấy thời gian hiện tại

        // Lọc các slot hợp lệ
        const validSlots = res.data.available_slots.filter((slot) =>
          moment(slot, "YYYY-MM-DD hh:mm A").isAfter(now)
        );

        setDoctor({ ...res.data, available_slots: validSlots });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleBookAppointment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9999/user/book-appointment",
        {
          doctor_id: id,
          date: moment(selectedTime, "YYYY-MM-DD hh:mm A").toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data);
      alert("Appointment booked successfully!");

      // 🔴 Cập nhật state, loại bỏ slot đã chọn
      setDoctor((prevDoctor) => ({
        ...prevDoctor,
        available_slots: prevDoctor.available_slots.filter(
          (slot) => slot !== selectedTime
        ),
      }));

      setSelectedTime(null); // Reset lựa chọn
    } catch (error) {
      console.error(error);
      alert("Failed to book appointment");
    }
  };

  return (
    <div>
      <Container sx={{ marginTop: "20px" }} disableGutters>
        <Grid container spacing={2}>
          <Grid item md={3}>
            {/* Doctor info */}
            <Box
              sx={{
                width: "100%",
                height: "300px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
              component={"img"}
              src={`http://localhost:9999${doctor.avatar}`}
            />
          </Grid>
          <Grid item md={9}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "302px",
                borderRadius: "10px",
                border: "2px solid #E0E0E0",
              }}
            >
              <Stack p={5} direction={"column"}>
                <Typography variant="h4" fontWeight={"bold"}>
                  {doctor.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography mr={1} sx={{ color: "#4B5563" }} variant="body1">
                    {doctor.specialty}
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid #4B5563",
                      padding: "3px 10px",
                      borderRadius: "15px",
                    }}
                  >
                    <Typography
                      sx={{ color: "#4B5563", fontSize: "12px" }}
                      variant="body1"
                    >
                      {doctor.experience} years
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#1F2937",
                    }}
                    variant="body1"
                  >
                    About
                  </Typography>
                  <InfoIcon sx={{ color: "#4B5563", fontSize: "12px" }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#1F2937",
                    mt: 1,
                  }}
                  variant="body1"
                >
                  Dr. Davis has a strong commitment to delivering comprehensive
                  medical care, focusing on preventive medicine, early
                  diagnosis, and effective treatment strategies. Dr. Davis has a
                  strong commitment to delivering comprehensive medical care,
                  focusing on preventive medicine, early diagnosis, and
                  effective \ntreatment strategies.
                </Typography>

                <Stack mt={2} direction={"row"} spacing={1}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#1F2937",
                      fontWeight: "bold",
                      color: "#4B5563",
                    }}
                    variant="body1"
                  >
                    Appointment fee:
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#1F2937",
                    }}
                    variant="body1"
                  >
                    {doctor.fee}$
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            {/* Slots */}
            <Box mt={2}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#565656",
                }}
                variant="body1"
              >
                Booking slots:
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  overflowX: "auto",
                  flexWrap: "wrap",
                }}
              >
                {doctor.available_slots?.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedTime === slot ? "contained" : "outlined"}
                    onClick={() => setSelectedTime(slot)}
                    sx={{
                      minWidth: "120px",
                      bgcolor: selectedTime === slot ? "#5F6FFF" : "#fff",
                      borderRadius: "20px",
                      textTransform: "none",
                      fontSize: "14px",
                      fontWeight: selectedTime === slot ? "bold" : "normal",
                    }}
                  >
                    {slot}
                  </Button>
                ))}
              </Box>

              <Box mt={3} display="flex" alignContent={"center"}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBookAppointment}
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    bgcolor: "#5F6FFF",
                    padding: "10px 20px",
                    marginRight: "10px",
                  }}
                  disabled={!selectedTime}
                >
                  Book an appointment
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderRadius: "20px",
                    textTransform: "none",
                    padding: "10px 20px",
                    width: "100px",
                  }}
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default DoctorDetail;
