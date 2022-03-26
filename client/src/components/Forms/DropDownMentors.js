import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

// function getStyles(name, formName, theme) {
//   return {
//     fontWeight:
//       formName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

function DropDownMentors(props) {
  const { allMentors, formName, setFormName, newMentorId, setNewMentorId } =
    props;
  // console.log(props);
  const theme = useTheme();
  // const [formName, setFormName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log("Select value", value);
    setNewMentorId(value);

    // setMentorId(allMentors.name)
    // setFormName(formName);
    // props.getFormName(formName);
  };

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  // props.setFormName("Jae");

  // const namesOfMentors = allMentors.map((item) => {
  //   return item.name;
  // });

  // console.log("dropdown mentors333", allMentors);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-simple-select-label">Mentor name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newMentorId}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {allMentors.map((mentor) => (
            <MenuItem
              key={mentor.id}
              value={mentor.id}
              // style={getStyles(mentor.name, formName, theme)}
            >
              {mentor.name}
              {/* {setMentorId(mentor.id)} */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default DropDownMentors;
