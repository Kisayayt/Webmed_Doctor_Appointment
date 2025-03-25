import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard, Event, PersonAdd, People } from "@mui/icons-material";
import { Link } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/doctor/dashboard" },
  { text: "Appointments", icon: <Event />, path: "/doctor/appointments" },
  {
    text: "Make appointments",
    icon: <PersonAdd />,
    path: "/doctor/create-appointment",
  },
];

const SidebarForDoctor = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          background: "#fff",
          borderRight: "1px solid #E0E0E0",
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            component={Link}
            to={item.path}
            sx={{ paddingY: 1.5, borderRadius: "8px", marginX: 1 }}
          >
            <ListItemIcon sx={{ color: "#5F6FFF" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarForDoctor;
