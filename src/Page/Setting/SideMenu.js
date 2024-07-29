import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Navbar2 from "../Navbar/Navbar2";
import UpdatePassword from "../../Component/UpdatePassword";
import UpdateProfile from "../../Component/UpdateProfile";

const drawerWidth = 240;

export default function ClippedDrawer() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Update Password");
  const updatePassword = () => {};
  console.log(selectedMenuItem);
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Navbar2 />
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {["Update Password", "Update Profile"].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  selected={selectedMenuItem === text}
                  onClick={() => {
                    setSelectedMenuItem(text);
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {selectedMenuItem === "Update Password" ? (
            <Box>{<UpdatePassword />}</Box>
          ) : (
            ""
          )}
          {selectedMenuItem === "Update Profile" ? (
            <Box>{<UpdateProfile />}</Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
}
