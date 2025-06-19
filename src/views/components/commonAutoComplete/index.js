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
  TextField,
} from "@mui/material";
import { Autocomplete } from "@mui/material";

export const CommonAutoComplete = ({
  label,
  fullWidth = true,
  error,
  placeholder = "",
  options = [],
  value,
  helperText,
  ListboxProps,
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
        tit
      >
        <Autocomplete
          {...others}
          options={options}
          value={value}
          ListboxProps={ListboxProps}
          renderInput={(params) => (
            <TextField {...params} placeholder={placeholder} />
          )}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};
