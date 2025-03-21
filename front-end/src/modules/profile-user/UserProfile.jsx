import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Drawer,
  TextField,
} from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
  name: yup.string().required("Please fill your name"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .required("Phone number is needed"),
  age: yup
    .number()
    .max(100, "Yeah ain't no way dawg 🙏")
    .required("Age is required"),
  gender: yup.string().required("Gender is required"),
  currentPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters"),
  newPassword: yup
    .string()
    .min(6, "New password must be at least 6 characters"),
});

function UserProfile() {
  const [user, setUser] = useState({});

  const [isEditing, setIsEditing] = useState(false);

  // mở form
  const handleOpenEdit = () => {
    setIsEditing(true);
  };

  // đóng form
  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      age: user.age || "",
      gender: user.gender || "",
      currentPassword: "",
      newPassword: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const token = localStorage.getItem("token");
        await axios.put("http://localhost:9999/user/update-profile", values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(values);
        setIsEditing(false);
      } catch (error) {
        console.log("Update failed");
      }
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:9999/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.log("Fetching error");
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <Container disableGutters>
        {/* info profile */}
        <Box mt={3}>
          <Box
            component={"img"}
            src={
              user.avatar
                ? `http://localhost:9999${user.avatar}`
                : "/images/default2.jpg"
            }
            sx={{
              width: "150px",
              height: "150px",
              borderRadius: "10%",
              objectFit: "cover",
            }}
          ></Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              borderBottom: "1px solid #E0E0E0",
              width: "40%",
              marginTop: "20px",
            }}
          >
            {user.name}
          </Typography>

          <Typography
            sx={{ textDecoration: "underline", fontSize: "15px" }}
            mt={2}
            variant="body1"
            color="#ADADAD"
          >
            CONTACT INFORMATION
          </Typography>
          <Stack direction="row" spacing={5} mt={2} alignItems="flex-start">
            {/* Cột nhãn */}
            <Stack spacing={2}>
              <Typography sx={{ fontSize: "14px" }} fontWeight="bold">
                Email:
              </Typography>
              <Typography sx={{ fontSize: "14px" }} fontWeight="bold">
                Phone:
              </Typography>
            </Stack>

            {/* Cột giá trị */}
            <Stack spacing={2}>
              <Typography sx={{ fontSize: "14px" }}>{user.email}</Typography>
              <Typography sx={{ fontSize: "14px" }}>{user.phone}</Typography>
            </Stack>
          </Stack>

          <Typography
            sx={{ textDecoration: "underline", fontSize: "15px" }}
            mt={2}
            variant="body1"
            color="#ADADAD"
          >
            BASIC INFORMATION
          </Typography>

          <Stack direction="row" spacing={5} mt={2} alignItems="flex-start">
            {/* Cột nhãn */}
            <Stack spacing={2}>
              <Typography sx={{ fontSize: "14px" }} fontWeight="bold">
                Gender:
              </Typography>
              <Typography sx={{ fontSize: "14px" }} fontWeight="bold">
                BOD:
              </Typography>
              <Typography sx={{ fontSize: "14px" }} fontWeight="bold">
                Age:
              </Typography>
            </Stack>

            {/* Cột giá trị */}
            <Stack spacing={2}>
              <Typography sx={{ fontSize: "14px" }}>{user.gender}</Typography>
              <Typography sx={{ fontSize: "14px" }}>01/04/2003</Typography>
              <Typography sx={{ fontSize: "14px" }}>{user.age}</Typography>
            </Stack>
          </Stack>

          <Stack mt={4} direction="row" spacing={4}>
            <Button
              variant="outlined"
              onClick={handleOpenEdit}
              sx={{
                width: "120px",
                padding: "8px 20px",
                borderRadius: "20px",
                color: "#5F6FFF",
                textTransform: "none",
              }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: "200px",
                padding: "8px 20px",
                borderRadius: "20px",
                marginTop: "40px",
                color: "#5F6FFF",
                textTransform: "none",
              }}
            >
              Appointments
            </Button>
          </Stack>
        </Box>
      </Container>

      <Drawer anchor="right" open={isEditing} onClose={handleCloseEdit}>
        <Box sx={{ width: 350, padding: "20px" }}>
          <Typography variant="h6" mb={2}>
            Edit Profile
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Age"
              name="age"
              type="number"
              value={formik.values.age}
              onChange={formik.handleChange}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Current Password"
              name="currentPassword"
              type="password"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.currentPassword &&
                Boolean(formik.errors.currentPassword)
              }
              helperText={
                formik.touched.currentPassword && formik.errors.currentPassword
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
            />

            <Stack direction="row" spacing={2} mt={3}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#5F6FFF",
                  padding: "8px 20px",
                  borderRadius: "20px",
                }}
              >
                Save
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  padding: "8px 20px",
                  borderRadius: "20px",
                }}
                onClick={handleCloseEdit}
                variant="outlined"
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      </Drawer>
    </div>
  );
}

export default UserProfile;
