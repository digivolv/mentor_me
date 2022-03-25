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

const times = [15, 30, 45, 60];

function getStyles(name, duration, theme) {
  return {
    fontWeight:
      duration.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function DropDownDuration(props) {
  // console.log(props);
  const theme = useTheme();
  const [duration, setDuration] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDuration(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-simple-select-label">
          Duration in minutes
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={duration}
          onChange={handleChange}
          input={<OutlinedInput label="Duration in minutes" />}
          MenuProps={MenuProps}
        >
          {times.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, duration, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default DropDownDuration;
