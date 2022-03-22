import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function PriceSlider({ value, changePrice }) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={changePrice}
        valueLabelDisplay="on"
      />
    </Box>
  );
}

export default PriceSlider;
