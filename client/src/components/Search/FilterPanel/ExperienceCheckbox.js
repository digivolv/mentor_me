import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

function ExperienceCheckbox({ changeChecked, experience }) {
  const { checked, label, id } = experience;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={() => changeChecked(id)}
            name={label}
          />
        }
        label={label}
      />
    </Box>
  );
}

export default ExperienceCheckbox;
