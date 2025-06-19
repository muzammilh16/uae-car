import {
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

export const CommonTextField = ({
  size = "small",
  label,
  type = "text",
  value,
  fullWidth=false,
  onChange,
  error,
  helperText,
  placeholder,
  ...others
}) => {
  return (
    <>
      {label && <InputLabel>{label}</InputLabel>}
      <FormControl fullWidth={fullWidth} error={error}>
        <TextField
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          size={size}
          {...others}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};
