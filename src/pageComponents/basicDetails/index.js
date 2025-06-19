import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { East, ForkRightRounded } from "@mui/icons-material";
import CustomTextField from "src/@core/components/mui/text-field";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { GlobalContext } from "src/context/appContext";
import { IDVdefaultData } from "src/mockData/commonData";
import { CommonTextField } from "src/views/components/commonTextField";
import { useDispatch } from "react-redux";
import { resetMultipleFields, setField } from "src/store/tempFormData";

const BasicDetails = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;
  const defaultValues = {
    registrationNumber: "",
  };
  const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  const handleNavigation = (message, isregistrationNumber, carType) => {
    if (carType === "OLD" && isregistrationNumber) {
      // dispatch(setField({ field: "REGISTRATION_NUMBER", value: message }));
      dispatch(setField({ field: "FORM_TYPE", value: "OLD" }));
      dispatch(setField({ field: "REGISTRATION_NUMBER", value: message }));
      router.push({ pathname: "/carInsurance", query: { ...query, ft: carType, fs: "FALLBACK_CAR_REGISTRATION_YEAR" } });

    }
    else if (carType === "OLD") {
      dispatch(setField({ field: "FORM_TYPE", value: "OLD" }));
      dispatch(setField({ field: "REGISTRATION_NUMBER", value: message }));
      // router.push({ pathname: "/carInsurance", query: { ...query, ft: carType, fs: "FALLBACK_RTO" } });
      router.push({ pathname: "/carInsurance", query: { ...query, ft: carType, fs: "FALLBACK_CAR_MAKE" } });
    }
    else {
      dispatch(setField({ field: "FORM_TYPE", value: "NEW" }));
      router.push({ pathname: "/carInsurance", query: { ...query, ft: carType, fs: "FALLBACK_RTO" } });
    }
    // router.push({ pathname: "/carInsurance", query: { ...query, ft: carType, fs: "FALLBACK_RTO" } });
  };

  useEffect(() => {
    handleNavigation("Without Car Reg. No.", false, "OLD");
  }, [])


  return (

    <form
      onSubmit={handleSubmit((data) =>
        handleNavigation(data.registrationNumber, true, "OLD")
      )}
    >
      {/* Car Registration Number - full row */}
      {/* <Grid container spacing={2} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} md={4}>
          <Controller
            name="registrationNumber"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CommonTextField
                fullWidth
                value={value?.toUpperCase()}
                label="Car Registration Number"
                onChange={(e) => onChange(e.target.value.toUpperCase())}
                placeholder="Enter Car Registration No (MH05AV7066)"
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.registrationNumber)}
                aria-describedby="validation-async-first-name"
                {...(errors.registrationNumber && {
                  helperText: "This field is required",
                })}
              />
            )}
          />
        </Grid>
      </Grid> */}

      <Grid container spacing={2} sx={{ marginBottom: 2 }} alignItems="flex-end">
        <Grid item xs={12} md={4}>
          <Controller
            name="registrationNumber"
            control={control}
            rules={{
              required: "Registration Number is required",
              pattern: {
                value: /^[A-Z0-9]{3,12}$/, // 3 to 12 uppercase alphanumeric characters
                message: "Please enter a valid Registration Number",
              },
            }}
            render={({ field: { value, onChange } }) => (
              <CommonTextField
                fullWidth
                value={value?.toUpperCase() || ""}
                label="Car Registration Number"
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
                  onChange(cleaned);
                }}
                placeholder="Enter Car Registration No (MH05AV7066)"
                InputLabelProps={{ shrink: true }}
                inputProps={{ maxLength: 12 }} // max 12 characters allowed
                error={Boolean(errors.registrationNumber)}
                // helperText={errors.registrationNumber?.message || ""}
                aria-describedby="validation-async-first-name"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Get Quotes
          </Button>
        </Grid>
      </Grid>

      <Grid container sx={{ marginBottom: 4 }}>
        {errors.registrationNumber &&
          <Grid item md={2}>
            <Typography
              variant="caption"
              color="error"
            >
              {errors.registrationNumber?.message}
            </Typography>
          </Grid>
        }
      </Grid>



      {/* Links side-by-side in one row */}
      <Grid container spacing={2} alignItems="center" sx={{ marginBottom: 4 }} >
        <Grid item xs={12} md={2} sx={{
          mb: { xs: 2, md: 0 }, // margin-bottom: 2 on mobile, 0 on desktop
        }}>
          <Link
            onClick={() => handleNavigation("Without Car Reg. No.", false, "OLD")}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            <Typography mr={1}>Without Car Number?</Typography>
            <IconButton
              sx={{
                height: 20,
                width: 24,
                border: 1,
                borderRadius: "5px",
                p: 0.5,
              }}
            >
              <East sx={{ height: 14, width: 14 }} />
            </IconButton>
          </Link>
        </Grid>

        <Grid item xs={12} md={2}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <Link
              onClick={() => handleNavigation("NEW", false, "NEW")}
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              <Typography mr={1}>Buying a New Car?</Typography>
              <IconButton
                sx={{
                  height: 20,
                  width: 24,
                  border: 1,
                  borderRadius: "5px",
                  p: 0.5,
                }}
              >
                <East sx={{ height: 14, width: 14 }} />
              </IconButton>
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Submit button new row */}
      {/* <Grid container>
        <Grid item xs={12} md={2}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Get Quotes
          </Button>
        </Grid>
      </Grid> */}
    </form>





  );
};

export default BasicDetails;
