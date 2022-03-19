import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";

const NavBar = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>MENTOR ME</Typography>
        <HomeIcon />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
