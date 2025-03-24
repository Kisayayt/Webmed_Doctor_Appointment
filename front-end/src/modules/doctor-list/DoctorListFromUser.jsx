import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";

function DoctorListFromUser() {
  const [specialty, setSpecialty] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9999/doctor/get-specialty-list")
      .then((res) => setSpecialty(res.data))
      .catch((error) => console.error("Error fetching specialties:", error));
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:9999/doctor/get-doctor-list?page=${page}&limit=8&specialty=${selectedSpecialty}`
      )
      .then((res) => {
        setDoctors(res.data.doctors);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, [page, selectedSpecialty]);

  const handleClick = (item) => {
    navigate(`/doctor/${item._id}`);
  };

  const handleSpecialtyClick = (specialty) => {
    setSelectedSpecialty(specialty === selectedSpecialty ? "" : specialty);
    setPage(1);
  };

  return (
    <Container disableGutters sx={{ mt: 7 }}>
      <Typography mb={2} variant="body1" color="#4B5563">
        Browse through the doctors specialist.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Stack direction="column" spacing={2}>
            {specialty.map((specialty, index) => (
              <Button
                key={index}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  justifyContent: "flex-start",
                  width: "70%",
                  height: "40px",
                  color: selectedSpecialty === specialty ? "white" : "#4B5563",
                  backgroundColor:
                    selectedSpecialty === specialty ? "#5F6FFF" : "transparent",
                  borderRadius: "10px",
                }}
                onClick={() => handleSpecialtyClick(specialty)}
              >
                {specialty}
              </Button>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ minHeight: "700px" }}>
            {" "}
            {/* Thêm Box này để cố định chiều cao */}
            <Grid container spacing={2}>
              {doctors.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                  <Card sx={{ maxWidth: 300, minHeight: 300 }}>
                    <CardActionArea onClick={() => handleClick(item)}>
                      <CardMedia
                        component="img"
                        alt="Doctor"
                        height="220"
                        image={`http://localhost:9999${item.avatar}`}
                      />
                    </CardActionArea>
                    <CardContent>
                      <Typography
                        sx={{
                          color:
                            item.available_slots.length > 0 ? "#0FBF00" : "red",
                          fontWeight: "bold",
                          fontSize: "10px",
                          textAlign: "center",
                        }}
                      >
                        <CircleIcon fontSize="6px" />{" "}
                        {item.available_slots.length > 0
                          ? "Available"
                          : "Not Available"}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          textAlign: "center",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", textAlign: "center" }}
                      >
                        {item.specialty}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Stack alignItems="center" sx={{ mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default DoctorListFromUser;
