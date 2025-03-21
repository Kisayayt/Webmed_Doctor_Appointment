import {
  Alert,
  Box,
  Button,
  Container,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format") // Kiểm tra định dạng email
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  //handle lỗi
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  //xử lí nhận form
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await axios.post("http://localhost:9999/auth/login", data);

      localStorage.setItem("token", res.data.token);

      const decoded = jwtDecode(res.data.token);
      navigate(`/home`);
    } catch {
      setOpen(true);
      setError("Username or password is incorrect");

      console.log("error");
    }
  };

  return (
    <div>
      <Container disableGutters>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Box
            mt={"50px"}
            mb={"20px"}
            bgcolor={"white"}
            width={"379px"}
            minHeight={"375px"}
            borderRadius={"20px"}
            boxShadow={"0px 0px 10px 0px #0000001A"}
          >
            <Stack p={5} direction={"column"}>
              <Typography sx={{ fontWeight: "bold" }} variant="h6">
                Login
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                Please login to book appointment
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  sx={{ mt: 3 }}
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
                  Login
                </Button>
              </form>
              <Typography sx={{ mt: 2, textAlign: "left", fontSize: "14px" }}>
                Dont have an account?{" "}
                <Box
                  component={"span"}
                  sx={{
                    color: "#5F6FFF",
                    fontWeight: "bold",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </Box>
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={3000} // Ẩn sau 3 giây
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // Góc trái dưới
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="error"
            variant="filled"
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}

export default Login;
