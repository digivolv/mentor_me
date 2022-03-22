import React, {useState, useEffect} from "react";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
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
  const [mentors, setMentors] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate()
  const [state, setState] = useState({
    job_title: '',
    price: "",
    city: "",
    country: ""
  });
  
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

  const onSubmitForm = async (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8080/mentors/${id}`,
        {
          user_id: id,
          job_title: state.job_title,
          price: state.price,
          city: state.city,
          country: state.country
        })
      .then(function (response) {
        console.log(response);
        navigate(`/mentors/${id}/admin`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
  <form className="form-control" onSubmit={onSubmitForm}>
  <Button onClick={handleOpen}>Edit Information</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
          {mentors.map((text) => (
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit Information
              </Typography>
              <TextField label={text.job_title}
              onInput={(event) =>
              setState({ ...state, job_title: event.target.value })
            }/>
              <TextField label={text.price}
              onInput={(event) =>
              setState({ ...state, price: event.target.value })
            }/>
              <TextField label={text.city}
              onInput={(event) =>
              setState({ ...state, city: event.target.value })
            }/>
              <TextField label={text.country}
              onInput={(event) =>
              setState({ ...state, country: event.target.value })
            }/>
              <Button
                variant="contained"
                type="submit"
              >Edit</Button>
            </div>
      ))}    
  </Box>
</Modal>
  </form>

  )
}

export default MentorEdit