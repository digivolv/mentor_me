import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function DropDownDuration(props) {
  // const [duration, setDuration] = React.useState("");
  const { duration, setDuration } = props;

  const handleChange = (event) => {
    setDuration(event.target.value);
  };

  const times = [15, 30, 45, 60];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Duration in minutes
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={duration}
          label="duration"
          onChange={handleChange}
        >
          {times.map((duration) => (
            <MenuItem
              key={duration}
              value={duration}
              // style={getStyles(name, personName, theme)}
            >
              {duration}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropDownDuration;
