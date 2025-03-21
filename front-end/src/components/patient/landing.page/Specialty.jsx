import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
function Specialty() {
  return (
    <div>
      {" "}
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Typography
          sx={{ marginTop: "90px", marginBottom: "20px", fontWeight: "bold" }}
          variant="h4"
        >
          Find by specialty
        </Typography>
        <Typography
          sx={{
            marginBottom: "40px",
            fontSize: "14px",
            width: "539px",
            textAlign: "center",
            color: "#4B5563",
          }}
          variant="body1"
        >
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </Typography>
      </Box>
      <Stack direction={"row"} spacing={4} justifyContent={"center"}>
        <Stack direction={"column"} alignItems={"center"} gap={2}>
          <Box
            sx={{ width: "100px", height: "100px" }}
            component={"img"}
            src="/images/General_physician.svg"
          ></Box>
          <Typography sx={{ fontSize: "12px" }}>General physician</Typography>
        </Stack>

        <Stack direction={"column"} alignItems={"center"} gap={2}>
          <Box
            sx={{ width: "100px", height: "100px" }}
            component={"img"}
            src="/images/Gynecologist.svg"
          ></Box>
          <Typography sx={{ fontSize: "12px" }}>Gynecologist</Typography>
        </Stack>

        <Stack direction={"column"} alignItems={"center"} gap={2}>
          <Box
            sx={{ width: "100px", height: "100px" }}
            component={"img"}
            src="/images/Dermatologist.svg"
          ></Box>
          <Typography sx={{ fontSize: "12px" }}>Dermatologist</Typography>
        </Stack>

        <Stack direction={"column"} alignItems={"center"} gap={2}>
          <Box
            sx={{ width: "100px", height: "100px" }}
            component={"img"}
            src="/images/Pediatricians.svg"
          ></Box>
          <Typography sx={{ fontSize: "12px" }}>Pediatricians</Typography>
        </Stack>

        <Stack direction={"column"} alignItems={"center"} gap={2}>
          <Box
            sx={{ width: "100px", height: "100px" }}
            component={"img"}
            src="/images/Neurologist.svg"
          ></Box>
          <Typography sx={{ fontSize: "12px" }}>Neurologist</Typography>
        </Stack>

        <Stack direction={"column"} alignItems={"center"} gap={2}>
          <Box
            sx={{ width: "100px", height: "100px" }}
            component={"img"}
            src="/images/Gastroenterologist.svg"
          ></Box>
          <Typography sx={{ fontSize: "12px" }}>Gastroenterologist</Typography>
        </Stack>
      </Stack>
    </div>
  );
}

export default Specialty;
