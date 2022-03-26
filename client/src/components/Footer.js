import React from "react";
import { Container, Grid, Box, Link } from "@mui/material";

function Footer() {
  return (
    <footer>
      <Box textAlign="center" py={{ sm: 5 }} bgcolor="#424242" color="white">
        <Container maxWidth="lg"></Container>
        MENTOR ME &reg; {new Date().getFullYear()}
      </Box>
    </footer>
  );
}

export default Footer;
