import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import moment from "moment";

export default function ResponsiveDatePickers(props) {
  const { date, setDate } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* <Stack spacing={3}> */}
      <DatePicker
        disablePast
        label="Date of session"
        openTo="year"
        views={["year", "month", "day"]}
        value={date}
        onChange={(newDate) => {
          setDate(moment(newDate).format("L"));
        }}
        renderInput={(props) => <TextField {...props} />}
      />
      {/* </Stack> */}
    </LocalizationProvider>
  );
}
