import { Box } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

const CommonCalenderPicker = ({
  ExpDateSelected,
  setExpDateSelected,
  setOpenClainDetailModal,
  setOpenExpDateModel,
}) => {
  return (
    <Box sx={{ m: 0 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={ExpDateSelected ? dayjs(ExpDateSelected) : null}
          onChange={(newValue) => {
            const formattedDate = dayjs(newValue).format("MM-DD-YYYY");
            console.log("sdfsdfsdfsdf556", formattedDate);
            setExpDateSelected(formattedDate);
            setOpenClainDetailModal(true);
            setOpenExpDateModel(false);
          }}
          sx={{ width: "100%", m: 0 }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default CommonCalenderPicker;
