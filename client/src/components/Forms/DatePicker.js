import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DateAdapter from "@mui/lab/AdapterMoment";
import moment from "moment";

function BasicDateTimePicker(props) {
  // const [value, setValue] = React.useState(new Date());
  const { dateTime, setDateTime } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={dateTime}
        // orientation="landscape"
        onChange={(newDateTime) => {
          setDateTime(moment(newDateTime).format("LLLL"));
          // console.log(dateTime);
        }}
      />
    </LocalizationProvider>
  );
}

export default BasicDateTimePicker;
