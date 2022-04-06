import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Link,
  styled,
  Grid,
  Paper,
  Rating,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "../NavBar";
import axios from "axios";
import "./MenteeForm.css"
import DropDownMentors from "./DropDownMentors";
import DropDownDuration from "./DropDownDuration";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import moment from "moment";

function MenteeForm() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [mentee, setMentee] = useState("");
  const [mentor, setMentor] = useState("");
  const [userData, setUserData] = useState(id);
  const [allMentors, setAllMentors] = useState([]);
  const [extractedMentorIdFromName, setExtractedMentorIdFromName] =
    useState("");

  const [formName, setFormName] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [mentorId, setMentorId] = useState("");
  const [newMentorId, setNewMentorId] = useState("");

  const [time, setTime] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/users/${id}`).then((response) => {
      console.log("data!", response.data);

      if (response.data[0].mentor) {
        setMentor(response.data[0].id);
      } else {
        setMentee(response.data[0].id);
      }
    });
    
    axios
      .get(`http://localhost:8080/mentors`)
      .then((response) => {
        console.log("second get!", response.data);

        setAllMentors(response.data);
      })
      .catch((err) => {
        console.log("error!");
        console.log(err);
      });
  }, []);

  console.log("mentor", mentor);
  console.log("mentee", mentee, "asdasd");
  console.log("allMentors!", allMentors);

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "10em",
    maxHeight: "10em",
  });

  const dateFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:8080/users/${id}/sessions/new`, {
        time: time,
        date,
        duration,
        // mentor_id: mentorId,
        // mentor_id: newMentorId,
        mentor_id: localStorage.mentorID,
        // mentee_id: id,
        mentee_id: localStorage.userID,
        mentor_confirmed: false,
      })
      .then(function (response) {
        console.log(response);
        navigate(`/users/${id}/sessions`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  // const mentorname = mentorInfo[localStorage.mentorID - 1].name
  return (
    <div>
      <NavBar />
      <>
        <h1>Mentorship Form</h1>
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
          <h1 class = "title">Book an appointment with {localStorage.mentorName}</h1>
          <div class="form-and-image">
        <form className="form-control" onSubmit={onSubmitForm}>
          {/* <DropDownMentors
            allMentors={allMentors}
            formName={formName}
            setFormName={setFormName}
            newMentorId={newMentorId}
            setNewMentorId={setNewMentorId}
            // mentorId={mentorId}
            // setMentorId={setMentorId}
            // getFormName={(formName) => setFormName(formName)}
          /> */}
              <DropDownDuration duration={duration} setDuration={setDuration} />
              <br></br>
              <DatePicker date={date} setDate={setDate} />
              <br></br>
              <TimePicker time={time} setTime={setTime} />
              <br></br>
          <Button type="submit" variant="contained">
            Submit
          </Button>
          </form>
          <Img src={'https://media.istockphoto.com/vectors/clock-vector-icon-isolated-vector-id931336618?k=20&m=931336618&s=612x612&w=0&h=asy3XQSZLl1vfoptwt-HhwBpCHKvqgT_MXfr_vwS_1I=' }/>
        </div>  
        </Paper>
        </>
        
    </div>
  );
}

export default MenteeForm;
