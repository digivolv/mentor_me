import * as React from 'react';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkIcon from '@mui/icons-material/Work';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import axios from 'axios';
import { useParams  } from "react-router-dom";
import NavBar from '../NavBar';
import { Rating, Button, Grid, Paper } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./MentorNew.css"
import "./Mentor.css"

const drawerWidth = 240;

function Mentor(props) {
  const FavouriteComponent = props.favouriteComponent
  const { window, users, setUsers, favourite } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [rating, setRating] = useState('')
  const [style, setStyle] = useState("");
  // const [mentor, setMentor] = useState([]);
  let { id } = useParams();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const navigate = useNavigate();
  const messageHandleClick = () => {
    navigate(`/messages`);
  };
  const formHandleClick = (id) => {
    navigate(`/users/${localStorage.userID}/form`);
  }
  useEffect(() => {
    axios
      .get(`http://localhost:8080/mentors/${id}`)
      .then((response) => {
        // console.log("data!");
        setUsers(response.data);
        localStorage.setItem("mentorID", response.data[0].id)
        console.log(response.data[0].id);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
    axios
      .get(`http://localhost:8080/mentors/avgratings/${id}`)
      .then((response) => {
        // console.log("data!");
        setRating(response.data[0].avg);
        console.log(response.data[0].avg);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
   
  }, []);

const onSubmitForm = async (event) => {
  event.preventDefault();
  if (!style) {
    axios
       .post(`http://localhost:8080/favourites`,
         {
           mentee_id: localStorage.userID,
           mentor_id: localStorage.mentorID
         })
    setStyle("heart-icon-red")
    .then(function (response) {
        
        console.log(response);
        navigate(`/mentors/${id}/`);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    axios
      .delete(`http://localhost:8080/favourites`, {
        data: {
          mentee_id: localStorage.userID,
          mentor_id: localStorage.mentorID
        },
      })
    setStyle("")
    .then(function (response) {
        
        console.log(response);
        navigate(`/mentors/${id}/`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
     
};
  
console.log(rating)
  const drawer = (
    <div>
      
      <Toolbar />
      <Divider />
      <List>
        {users.map((text, index) => (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Rating
                value={rating}
                precision={0.5}
              readOnly/>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Avatar
              alt="Remy Sharp"
              src={text.picture}
                sx={{ width: 200, height: 200 }} />
              </div >
          <ListItem button>
            <ListItemIcon>
              </ListItemIcon>
              

              
            </ListItem>
            <div class="line">
              <FavoriteIcon
                className={style}
                variant="contained"
                onClick={onSubmitForm}
              />
              <ListItemText primary={text.name} align={'center'}/>
              </div>
             <ListItemText
              primary={text.city} secondary={text.country} align={'center'} />
          <ListItem button>
            <ListItemIcon>
              {<WorkIcon />}
            </ListItemIcon>
            <ListItemText primary={text.job_title} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              { <AttachMoneyIcon />}
            </ListItemIcon>
            <ListItemText primary={text.price.toFixed(2)} /> per 15 min
            </ListItem>
            <ListItem button>
            <ListItemIcon>
              {<PsychologyIcon />}
            </ListItemIcon>
              <ListItemText primary={text.years_of_experience} /> years of teaching
            </ListItem>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                onClick={() => { messageHandleClick() }}
              >Message</Button>
                <Button
                variant="contained"
                onClick={() => { formHandleClick() }}
                >Appt Form</Button>

              </Stack>
            </div>
                
            </div>
        ))}
      </List>
      <Divider />
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  console.log("mentor id", id)
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