import * as React from 'react';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkIcon from '@mui/icons-material/Work';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import axios from 'axios';
import { useParams } from "react-router-dom";
import NavBar from '../NavBar';
import { Rating, Button, Grid, Paper } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const drawerWidth = 240;

function Mentor(props) {
  const { window, users, setUsers } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mentor, setMentor] = useState([]);
  let { id } = useParams();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  

  useEffect(() => {
    axios
      .get(`http://localhost:8080/mentors/${id}`)
      .then((response) => {
        // console.log("data!");
        setUsers(response.data);
        // console.log(response);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/mentors/expertise/${id}`)
      .then((response) => {
        console.log("DATA:", response.data);
        const newArr = [];
        response.data.forEach((element) => {
          console.log("NAME:", element.name);
          element.specialties = [element.specialty];
          console.log("ELEMENT:", element);
          let index = newArr.findIndex((mentor) => mentor.name == element.name);
          console.log("INDEX", index);

          index === -1
            ? newArr.push(element)
            : newArr[index].specialties.push(element.specialty);

          console.log("NEWARR:", newArr);
        });
        setMentor(newArr);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {users.map((text, index) => (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Rating/>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Avatar
              alt="Remy Sharp"
              src={text.picture}
                sx={{ width: 200, height: 200 }} />
              </div >
          <ListItem button key={text.id}>
            <ListItemIcon>
              </ListItemIcon>
              

              <ListItemText primary={text.name} />
              
          </ListItem>
          <ListItem button key={text.id}>
            <ListItemIcon>
              {<WorkIcon />}
            </ListItemIcon>
            <ListItemText primary={text.job_title} />
          </ListItem>
          <ListItem button key={text.id}>
            <ListItemIcon>
              { <AttachMoneyIcon />}
            </ListItemIcon>
            <ListItemText primary={text.price.toFixed(2)} /> per hour
            </ListItem>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <Button
                variant="contained"
                onClick={() => { alert("clicked") }}
              >Message</Button>
            </div>
            </div>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <NavBar/>
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {users.map((text, index) => (
          <>
        <Typography paragraph>
              {text.blurb}
        </Typography>
          </>
        ))}
      </Box>
    </Box>
  );
}

Mentor.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Mentor;