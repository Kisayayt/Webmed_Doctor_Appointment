import { Box, Button } from "@mui/material";
import React from "react";

function DoctorHeader() {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "white",
          height: "100px",
          display: "flex",
          alignItems: "center",
          borderBottom: "2px solid #E5E5E5",
        }}
      >
        <Box
          padding={5}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Box
            sx={{ width: 300, height: "auto" }}
            component={"img"}
            alt="logo"
            src="/images/admin-logo.png"
          ></Box>
          <Button
            sx={{
              backgroundColor: "#5F6FFF",
              textTransform: "none",
              borderRadius: "30px",
              width: "130px",
            }}
            variant="contained"
          >
            Logout
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default DoctorHeader;
