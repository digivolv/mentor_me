import React, {useState, useEffect} from "react";
import { Button, Modal, Box, Typography, TextField, Grid } from "@mui/material";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  
const MentorEdit = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mentor, setMentor] = useState([]);
  
  let { id } = useParams();
  let navigate = useNavigate()
  
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
        setMentor(newArr[0]);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
    
  }, []);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8080/mentors/${id}`,
        {
          job_title: mentor.job_title,
          price: mentor.price,
          years_of_experience: mentor.years_of_experience
        })
      .then(function (response) {
        console.log(response);
        navigate(`/mentors/${id}/admin`);
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
    <Button onClick={handleOpen}>Edit</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <form className="form-control" onSubmit={onSubmitForm}>
  <Box sx={style}>
          
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                Edit Information
              </Typography>
              <TextField
                fullWidth label='Job Title'
                id="fullWidth" 
                onChange={(event) =>
                  setMentor({ ...mentor, job_title: event.target.value })
                }
                value={mentor.job_title}
              />
              <TextField
                fullWidth label="Rate"
                id="fullWidth"
                onChange={(event) =>
                  setMentor({ ...mentor, price: event.target.value })
                } 
                value={mentor.price}
                />
              <TextField
                fullWidth label="Years of Experience"
                id="fullWidth"
                onChange={(event) =>
                  setMentor({ ...mentor, years_of_experience: event.target.value })
                }
                value={mentor.years_of_experience}
              />
              <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
              >
              <Button
                variant="contained"
                type="submit"
                
              >Edit</Button>
              
              </Grid>
            </div>   
  </Box>
      </form>
</Modal>
</>
  )
}

export default MentorEdit