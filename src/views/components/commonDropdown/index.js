import {
  ArrowDropDown,
  CancelOutlined,
  CancelRounded,
  CloseOutlined,
} from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export const CommonDropdown = ({
  fullWidth = true,
  label = "",
  options = [],
  value = "",
  onChange,
  error,
  helperText,
  placeholder,
  isClearable = false,
  handleClear,
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
      <FormControl
        fullWidth={fullWidth}
        error={error}
        variant="outlined"
        size="small"
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          IconComponent={() =>
            isClearable && value ? (
              <CloseOutlined
                sx={{ cursor: "pointer" }}
                color="primary"
                onClick={handleClear}
              />
            ) : (
              <ArrowDropDown color="primary" />
            )
          }
          {...others}
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};
