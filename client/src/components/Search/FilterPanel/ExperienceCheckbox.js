import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

function ExperienceCheckbox() {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={gilad}
                onChange={handleChange}
                name="> 15 years"
              />
            }
            label="> 15 years"
          />
          <FormControlLabel
            control={
              <Checkbox checked={jason} onChange={handleChange} name="jason" />
            }
            label="5-15 years"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={antoine}
                onChange={handleChange}
                name="antoine"
              />
            }
            label="< 5 years"
          />
        </FormGroup>
      </FormControl>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      ></FormControl>
    </Box>
  );
}

export default ExperienceCheckbox;
