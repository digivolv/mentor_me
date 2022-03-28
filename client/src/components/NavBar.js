import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const user_id = localStorage.getItem("userID");
  // Displays profile picture in Nav bar circle
  // const profile_pic = localStorage.getItem("userPic");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleHome = () => {
    navigate(`/`);
  };

  const handleFindMentor = () => {
    navigate(`/search`);
  };

  const handleBeMentor = () => {
    navigate(`/mentors/new`);
  };

  const handleSessions = () => {
    navigate(`/users/${user_id}/sessions`);
  };

  const handleMessages = () => {
    navigate(`/messages`);
  };

  const handleProfile = () => {
    navigate(`/mentors/${user_id}/admin`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(`/login`);
  };

  const handleRegister = () => {
    navigate(`/register`);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let boxOne;
  let boxTwo;

  // If user is not logged in, show login + register options
  if (!user_id) {
    boxOne = (
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Button
          key="findMentor"
          onClick={handleFindMentor}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Find a Mentor
        </Button>
      </Box>
    );

    boxTwo = (
      <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
        <MenuItem onClick={handleRegister}>
          <Typography textAlign="center">REGISTER</Typography>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">LOGIN</Typography>
        </MenuItem>
      </Box>
    );
  } else {
    // if user is logged in show ability to be a mentor
    boxOne = (
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Button
          key="findMentor"
          onClick={handleFindMentor}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Find a Mentor
        </Button>

        <Button
          key="beMentor"
          onClick={handleBeMentor}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Be A Mentor
        </Button>
      </Box>
    );
    // if user is logged in show profile and logout options
    boxTwo = (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="M" src="/static/images/avatar/2.jpg" />
            {/* <Avatar alt="M" src={profile_pic} /> */}
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem key="profile" onClick={handleProfile}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>

          <MenuItem key="sessions" onClick={handleSessions}>
            <Typography textAlign="center">Favourites</Typography>
          </MenuItem>

          <MenuItem key="sessions" onClick={handleMessages}>
            <Typography textAlign="center">Messages</Typography>
          </MenuItem>

          <MenuItem key="sessions" onClick={handleSessions}>
            <Typography textAlign="center">Sessions</Typography>
          </MenuItem>

          <MenuItem key="logout" onClick={handleLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            onClick={handleHome}
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            MENTOR ME
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="findMentor" onClick={handleFindMentor}>
                <Typography textAlign="center">Find a Mentor</Typography>
              </MenuItem>

              <MenuItem key="beMentor" onClick={handleBeMentor}>
                <Typography textAlign="center">Be A Mentor</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            MENTOR ME
          </Typography>
          {boxOne}
          {boxTwo}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
