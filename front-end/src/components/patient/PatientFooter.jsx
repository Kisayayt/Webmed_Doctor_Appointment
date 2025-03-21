import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

function PatientFooter() {
  return (
    <div>
      <Container sx={{ marginTop: "100px" }} disableGutters>
        <Box
          sx={{
            marginBottom: "20px",
            paddingBottom: "50px",
            borderBottom: "2px solid #E0E0E0",
          }}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box>
            <Box
              sx={{ width: 150, height: "auto", marginBottom: "20px" }}
              component={"img"}
              src="/images/Logo.svg"
            ></Box>
            <Typography
              sx={{
                width: "539px",
                marginTop: "10px",
                fontSize: "12px",
              }}
              variant="body1"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Typography>
          </Box>
          <Box display={"flex"} sx={{ gap: "180px" }}>
            <Stack direction={"column"}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginBottom: "20px" }}
              >
                COMPANY
              </Typography>
              <Stack direction={"column"} spacing={1}>
                <Typography sx={{ fontSize: "12px" }} variant="body1">
                  Home
                </Typography>
                <Typography sx={{ fontSize: "12px" }} variant="body1">
                  About Us
                </Typography>
                <Typography sx={{ fontSize: "12px" }} variant="body1">
                  Contact Us
                </Typography>
                <Typography sx={{ fontSize: "12px" }} variant="body1">
                  Privacy Policy
                </Typography>
              </Stack>
            </Stack>

            <Stack direction={"column"}>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginBottom: "20px" }}
              >
                GET IN TOUCH
              </Typography>
              <Stack direction={"column"} spacing={1}>
                <Typography sx={{ fontSize: "12px" }} variant="body1">
                  +1-212-456-7890
                </Typography>
                <Typography sx={{ fontSize: "12px" }} variant="body1">
                  greatstackdev@gmail.com
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box textAlign={"center"}>
          <Typography
            sx={{ fontSize: "12px", marginBottom: "20px" }}
            variant="body1"
          >
            Copyright © 2025 Kisaya. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default PatientFooter;
