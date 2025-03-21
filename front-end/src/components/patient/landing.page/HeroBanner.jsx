import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
function HeroBanner() {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    try {
      let token = localStorage.getItem("token");
      if (token) {
        navigate("/book-appointment");
      } else {
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {" "}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "500px",
          width: "100%",
          backgroundColor: "#5F6FFF",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <Box sx={{ padding: "50px", width: "50%" }}>
          <Typography
            sx={{ fontWeight: "bold", color: "white", marginBottom: "10px" }}
            variant="h4"
          >
            Book Appointment With Trusted Doctors
          </Typography>
          <Typography
            sx={{ marginBottom: "40px" }}
            color="white"
            variant="body2"
          >
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </Typography>
          <Button
            sx={{
              padding: "15px 30px",
              borderRadius: "20px",
              color: "black",
              backgroundColor: "white",
              "&:hover": { backgroundColor: "#E3E2E3" },
              fontFamily: "Montserrat",
              textTransform: "none",
            }}
            endIcon={<ArrowRightAltIcon />}
            variant="contained"
            onClick={handleBookAppointment}
          >
            Book appointment
          </Button>
        </Box>
        <Box
          sx={{ width: "55%", alignSelf: "flex-end" }}
          component={"img"}
          src="/images/doc-header-img.png"
        ></Box>
      </Box>
    </div>
  );
}

export default HeroBanner;
