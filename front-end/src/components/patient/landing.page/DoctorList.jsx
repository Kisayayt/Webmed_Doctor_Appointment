import { Box, Button, CardActionArea, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DoctorList() {
  const listDoctor = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/doctor/get-top-doctor")
      .then((res) => {
        console.log(res.data);
        setDoctors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleClick = (item) => {
    const availale_slots = item.available_slots;
    console.log("Clicked on doctor:", availale_slots);
    navigate(`/doctor/${item._id}`);
    // Chuyển hướng trang (nếu cần)
    // window.location.href = `/doctor/${item}`;
  };
  return (
    <div>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Typography
          sx={{ marginTop: "90px", marginBottom: "20px", fontWeight: "bold" }}
          variant="h4"
        >
          Top Doctors to Book
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
          Simply browse through our extensive list of trusted doctors.
        </Typography>
      </Box>

      {/* Grid layout với 5 cột mỗi hàng */}
      <Grid container spacing={4}>
        {doctors.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={item}>
            <Card sx={{ maxWidth: 300, height: "auto" }}>
              <CardActionArea onClick={() => handleClick(item)}>
                <CardMedia
                  component="img"
                  alt="Doctor"
                  height="220"
                  image={`http://localhost:9999${item.avatar}`}
                />
              </CardActionArea>
              <CardContent>
                {item.available_slots.length > 0 ? (
                  <Typography
                    sx={{
                      color: "#0FBF00",
                      fontWeight: "bold",
                      fontSize: "10px",
                    }}
                    gutterBottom
                    variant="body1"
                    component="div"
                  >
                    <CircleIcon fontSize="6px" /> Available
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "10px",
                    }}
                    gutterBottom
                    variant="body1"
                    component="div"
                  >
                    <CircleIcon fontSize="6px" /> not available
                  </Typography>
                )}
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "16px" }}
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.specialty}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          sx={{
            backgroundColor: "#EAEFFF",
            width: "200px",
            height: "40px",
            borderRadius: "50px",
            color: "Black",
            textTransform: "none",
          }}
          variant="contained"
          onClick={() => navigate("/doctor-list")}
        >
          More
        </Button>
      </Box>
    </div>
  );
}

export default DoctorList;
