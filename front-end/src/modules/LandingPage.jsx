import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import HeroBanner from "../components/patient/landing.page/HeroBanner";
import Specialty from "../components/patient/landing.page/Specialty";

import DoctorList from "../components/patient/landing.page/DoctorList";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <div>
      <Container disableGutters>
        {/* HERO BANNER */}
        <HeroBanner />
        {/* Specialty */}
        <Specialty />
        {/* Doctor lists */}
        <DoctorList />

        {/* Create Account Banner */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "300px",
            width: "100%",
            backgroundColor: "#5F6FFF",
            borderRadius: "10px",
            marginTop: "90px",
          }}
        >
          <Stack direction={"column"} p={7}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "white",
                marginBottom: "10px",
                width: "539px",
                lineHeight: "55px",
              }}
              variant="h4"
            >
              Book Appointment With 100+ Trusted Doctors{" "}
            </Typography>
            {!isLoggedIn && (
              <Button
                sx={{
                  backgroundColor: "#EAEFFF",
                  width: "150px",
                  height: "45px",
                  borderRadius: "50px",
                  color: "Black",
                  textTransform: "none",
                  marginTop: "10px",
                }}
                variant="contained"
                onClick={() => navigate("/register")}
              >
                Create Account
              </Button>
            )}
          </Stack>

          <Box
            sx={{ width: "40%", alignSelf: "flex-end" }}
            component={"img"}
            src="/images/appointment-doc-img.png"
          />
          <Box />
        </Box>
      </Container>
    </div>
  );
}

export default LandingPage;
