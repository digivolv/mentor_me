import * as React from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
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
