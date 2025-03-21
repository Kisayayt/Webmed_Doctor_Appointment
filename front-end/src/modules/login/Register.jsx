import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  name: yup.string().required("Please fill your name"),
  phone: yup
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .required("Phone number is needed"),
  age: yup
    .number()
    .max(100, "Yeah ain't no way dawg 🙏")
    .required("Age is required"),
  gender: yup.string().required("Gender is required"),
  avatar: yup.mixed().required("Avatar is required"),
});

function Register() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null); // State để hiển thị ảnh xem trước

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Dữ liệu form trước khi gửi:", data);

      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("age", data.age);
      formData.append("gender", data.gender);
      formData.append("avatar", data.avatar);

      console.log("File avatar gửi đi:", data.avatar);

      await axios.post("http://localhost:9999/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Success! You can login now");
      setOpenSuccess(true);

      setTimeout(() => {
        navigate(`/login`);
      }, 2000);
    } catch (e) {
      if (e.response && e.response.data) {
        const errorMessage = e.response.data.message;
        console.log(errorMessage);

        if (errorMessage.includes("email is already exists")) {
          setError("email", { type: "manual", message: errorMessage });
        } else {
          setOpen(true);
        }
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file)); // Xem trước ảnh
      setValue("avatar", file, { shouldValidate: true }); // Cập nhật file vào form
    }
  };

  return (
    <Container disableGutters>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Box
          mt={"50px"}
          mb={"20px"}
          bgcolor={"white"}
          minWidth={"600px"}
          minHeight={"450px"}
          borderRadius={"20px"}
          boxShadow={"0px 0px 10px 0px #0000001A"}
        >
          <Stack p={5} direction={"column"}>
            <Typography sx={{ fontWeight: "bold" }} variant="h6">
              Register
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              Please fill up all of your info to register
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack alignItems="center" mt={3}>
                <Avatar src={avatarPreview} sx={{ width: 100, height: 100 }} />
                <Button
                  variant="contained"
                  component="label"
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: "#5F6FFF",
                    textTransform: "none",
                  }}
                >
                  Upload Avatar
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {errors.avatar && (
                  <Typography color="error">{errors.avatar.message}</Typography>
                )}
              </Stack>
              <Stack mt={3} direction={"row"} spacing={2}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  required
                />
                <TextField
                  fullWidth
                  label="Phone"
                  variant="outlined"
                  margin="normal"
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  required
                />
              </Stack>
              <Stack mt={2} direction={"row"} spacing={2}>
                <TextField
                  fullWidth
                  label="Age"
                  variant="outlined"
                  margin="normal"
                  {...register("age")}
                  error={!!errors.age}
                  helperText={errors.age?.message}
                  required
                />
                <FormControl fullWidth margin="normal" error={!!errors.gender}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select {...field} labelId="gender-label" label="Gender">
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Stack>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                required
              />
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  textTransform: "none",
                  backgroundColor: "#5F6FFF",
                }}
              >
                Register
              </Button>
            </form>

            <Typography sx={{ mt: 2, textAlign: "left", fontSize: "14px" }}>
              Already have an account?{" "}
              <Box
                component={"span"}
                sx={{
                  color: "#5F6FFF",
                  fontWeight: "bold",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => navigate("/login")}
              >
                Log in
              </Box>
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={() => setOpen(false)} severity="error" variant="filled">
          Huh something ain't right
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setOpenSuccess(false)}
          severity="success"
          variant="filled"
        >
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Register;
