import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Link } from "react-router-dom"
import './favourites.css'
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


export default function Favourites(props) {
  const { mentor_name, picture, job_title, price, mentor_id } = props
  
  return (
    
    <Paper
      className='favourite-mentor-card'
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 750,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={props.picture} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                <Link to={`/mentors/${props.mentor_id}`}>{props.mentor_name}</Link>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {props.job_title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.city}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              ${props.price} / 15 min
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      </Paper>
  );
}