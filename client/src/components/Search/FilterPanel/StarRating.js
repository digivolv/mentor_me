import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function StarRating({ value, selectToggle }) {
  return (
    <Stack spacing={1}>
      <Rating
        name="size-large"
        value={value}
        defaultValue={2}
        size="large"
        onChange={selectToggle}
      />
    </Stack>
  );
}

export default StarRating;
