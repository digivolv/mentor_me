import * as React from 'react';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import WorkIcon from '@mui/icons-material/Work';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import PsychologyIcon from '@mui/icons-material/Psychology';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import axios from 'axios';
import { useParams } from "react-router-dom";
import NavBar from '../NavBar';
import { Rating, Button, TextField } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TechnologyCard from '../Search/List/ListItem/TechCard';
import MentorEdit from './MentorEdit';

const drawerWidth = 240;

function Mentor(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mentors, setMentors] = useState([]);
  let { id } = useParams();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8080/mentors/${id}`)
  //     .then((response) => {
  //       // console.log("data!");
  //       setUsers(response.data);
  //       // console.log(response);
  //     })
  //     .catch((err) => {
  //       console.log("error!");
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/mentors/expertise/${id}`)
      .then((response) => {
        setMentors(response.data);
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
        setMentors(newArr);
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
        {mentors.map((text, index) => (
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
              <ListItemText
                primary={text.name} />
              
            </ListItem>
            <ListItemText
              primary={text.city} secondary={text.country} align={'center'} />
          <ListItem button key={text.id}>
            <ListItemIcon>
              {<WorkIcon/>}
            </ListItemIcon>
              <ListItemText primary={text.job_title} />
          </ListItem>
              
          <ListItem button key={text.id}>
            <ListItemIcon>
              { <AttachMoneyIcon />}
            </ListItemIcon>
            <ListItemText primary={text.price} />
            </ListItem>
            <ListItem button key={text.id}>
            <ListItemIcon>
              {<PsychologyIcon />}
            </ListItemIcon>
              <ListItemText primary={text.years_of_experience} /> years of teaching
            </ListItem>
            <TechnologyCard user={text.id} />
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MentorEdit/>
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
        {mentors.map((user) => {
          return (
            <h1>{user.expertise}</h1>
            )
          })}

        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
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