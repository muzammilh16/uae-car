import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FormHelperText, InputLabel, TextField } from "@mui/material";

export const CommonDatePicker = ({
  label,
  fullWidth = true,
  error,
  placeholder = "",
  options = [],
  value,
  helperText,
  minDate,
  maxDate,
  ...others
}) => {
  //   const { label="", options=[], value="", onChange, error, helperText,placeholder, ...others } = props

  return (
    <>
      {label && (
        <InputLabel
          style={{ marginBottom: "8px" }}
          id="demo-simple-select-label"
        >
          {label}
        </InputLabel>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "100%" }}
          format="DD-MM-YYYY"
          minDate={minDate}
          maxDate={maxDate}
          // label={label}
          value={value ? dayjs(value) : null}
          onChange={(newValue) => {
            const formattedDate = dayjs(newValue).format("MM-DD-YYYY");
            others.onChange(formattedDate);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label=""
              size="medium"
              error={error}
              placeholder={placeholder}
              helperText={error && <FormHelperText>{helperText}</FormHelperText>}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};
