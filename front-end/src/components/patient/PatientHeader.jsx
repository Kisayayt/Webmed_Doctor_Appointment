import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { jwtDecode } from "jwt-decode"; // Icon profile

function PatientHeader() {
  const navigate = useNavigate();

  // State quản lý dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token khi logout
    navigate("/home"); // Chuyển hướng về trang login
  };
  const isLoggedIn = !!localStorage.getItem("token");

  const decoded = isLoggedIn ? jwtDecode(localStorage.getItem("token")) : null;
  console.log(decoded);

  return (
    <div>
      <Container disableGutters>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          height={100}
          padding={2}
          borderBottom={"2px solid #E0E0E0"}
        >
          <Box
            sx={{ width: 200, height: "auto" }}
            component={"img"}
            alt="logo"
            src="/images/Logo.svg"
          ></Box>

          <Stack direction={"row"} spacing={2}>
            <Link
              href="/home"
              underline="none"
              color="#1F2937"
              rel="noopener noreferrer"
              fontWeight={600}
            >
              HOME
            </Link>
            <Link
              href="#"
              onClick={() => navigate("/doctor-list")}
              underline="none"
              color="black"
              rel="noopener noreferrer"
              fontWeight={600}
            >
              ALL DOCTORS
            </Link>
            <Link
              href="#"
              onClick={(e) => e.preventDefault()}
              target="_blank"
              underline="none"
              color="black"
              rel="noopener noreferrer"
              fontWeight={600}
            >
              ABOUT
            </Link>
            <Link
              href="#"
              onClick={(e) => e.preventDefault()}
              target="_blank"
              underline="none"
              color="black"
              rel="noopener noreferrer"
              fontWeight={600}
            >
              CONTACT
            </Link>
          </Stack>

          {/* Login / Logout + Profile */}
          {isLoggedIn ? (
            <Stack direction="row" spacing={2} alignItems="center">
              {/* Profile Dropdown */}
              <IconButton onClick={handleMenuOpen} color="inherit">
                <Avatar
                  alt="decoded.name"
                  src={`http://localhost:9999${decoded.avatar}`}
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                    handleMenuClose();
                  }}
                >
                  View Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Stack>
          ) : (
            <Button
              sx={{
                padding: "8px 30px",
                borderRadius: "20px",
                backgroundColor: "#5F6FFF",
                "&:hover": { backgroundColor: "#4a54d1" },
                fontFamily: "Montserrat",
                textTransform: "none",
              }}
              variant="contained"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default PatientHeader;
