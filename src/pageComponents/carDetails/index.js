import React from 'react';
import {
  EditOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import {
  Box, Button, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputLabel, ListItem, ListItemText, MenuItem, Radio, RadioGroup, Select, Typography
} from "@mui/material";

import { useMediaQuery } from "@mui/system";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import FormSection from "src/pageComponents/fom_sections";

import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TwentyTwoMpOutlinedIcon from "@mui/icons-material/TwentyTwoMpOutlined";
import { IDVdefaultData } from "src/mockData/commonData";
import CommonDialog from '../commonModal';
import CommonCalenderPicker from '../commonCalenderPicker';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreateEnquiry, resetAll, resetMultipleFields, setField } from 'src/store/tempFormData';


import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PolicyIcon from "@mui/icons-material/Policy";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { actionGetFuelVariants } from 'src/store/formFieldOptions';
import { formatRuppee } from 'src/utility';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import MinorCrashOutlinedIcon from '@mui/icons-material/MinorCrashOutlined';

const CarDetails = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();

  // const formType = useSelector((state) => state.tempFormDataStore.FORM_TYPE);

  const tempFormData = useSelector((state) => state.tempFormDataStore);
  const fetchedInsurerOptions = useSelector((state) => state.formFieldOptionsStore.INSURER_MASTER_OPTIONS);

  useEffect(() => {
    if (tempFormData && Object.keys(tempFormData).length > 0) {
      // Check if any non-null value exists before saving
      const hasValidData = Object.values(tempFormData).some(value => value !== null && value !== "");
      if (hasValidData) {
        localStorage.setItem('tempFormData', JSON.stringify(tempFormData));
      }
    }
  }, [tempFormData]);

  useEffect(() => {
    const savedData = localStorage.getItem('tempFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      for (const key in parsedData) {
        if (parsedData[key] !== null) {
          dispatch(setField({ field: key, value: parsedData[key] }));
        }
        if (key == "CAR_MODEL" && parsedData[key] !== null) {
          //make api call to fetch fuel variants
          // dispatch(actionGetFuelVariants({ "model_code": parsedData[key]?.id }));
        }
      }
    }
  }, [dispatch]);

  const { query } = router;
  const { fs, ft } = router.query;

  const [openExpDateModal, setOpenExpDateModel] = useState(false);
  const [ExpDateSelected, setExpDateSelected] = useState("");

  const [openClaimDetailModal, setOpenClainDetailModal] = useState(false);
  const [claimDetailSelected, setClaimDetailSelected] = useState({
    isOldPolicyExpired: false,
    isOldPolicyClaimed: false,
    isOwnershipTransferred: false,
    policyExpiryWindow: "",
  });
  const [selectedInsurer, setSelectedInsurer] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const getFormStep = () => {
    switch (fs) {
      // case "FALLBACK_RTO":
      //   return 2;
      case "FALLBACK_CAR_MAKE":
        return 3;
      case "FALLBACK_CAR_REGISTRATION_YEAR":
        return 4;
      case "FALLBACK_CAR_MODEL":
        return 5;
      // case "FALLBACK_CAR_FUEL_TYPE":
      //   return 6;
      case "FALLBACK_CAR_VARIANT":
        return 6;
      case "FALLBACK_CAR_SPECIFICATION":
        return 7;
      case "FALLBACK_NATIONALITY":
        return 8;
      case "FALLBACK_REGISTRATION_CITY":
        return 9;
      case "FALLBACK_POLICY_CASE":
        return 10;
      case "FALLBACK_IS_CAR_USED":
        return 11;
      case "FALLBACK_FIRST_REG_YEAR":
        return 12;
      case "FALLBACK_UAE_DRIVING_EXP":
        return 13;
      case "FALLBACK_INTRL_DRIVING_EXP":
        return 14;
      case "FALLBACK_CAR_REGISTRATION_DATE":
        return 15;
      case "FALLBACK_CAR_DAMAGE_DURATION":
        return 16;
      case "FALLBACK_VERIFICATION":
        return 17;
      default:
        return 0;
    }
  }

  const getFormFallback = (step) => {
    switch (step) {
      // case 2:
      //   dispatch(resetMultipleFields(["REGISTRATION_YEAR", "CAR_MAKE", "CAR_MODEL", "CAR_FUEL_TYPE", "CAR_VARIANT"]));
      //   return "FALLBACK_RTO";
      case 3:
        dispatch(resetMultipleFields(["REGISTRATION_YEAR", "CAR_MODEL", "CAR_VARIANT", "CAR_SPECIFICATION", "USER_NATIONALITY", "REGISTRATION_CITY", "POLICY_CASE", "IS_CAR_USED", "UAE_DRIVING_EXP", "FIRST_REGISTRATION_YEAR", "INTRL_DRIVING_EXP", "CAR_REGISTRATION_DATE", "CAR_DAMAGE_DURATION"]));
        return "FALLBACK_CAR_MAKE";
      case 4:
        dispatch(resetMultipleFields(["CAR_MODEL", "CAR_VARIANT", "CAR_SPECIFICATION", "USER_NATIONALITY", "REGISTRATION_CITY", "POLICY_CASE", "IS_CAR_USED", "UAE_DRIVING_EXP", "FIRST_REGISTRATION_YEAR", "INTRL_DRIVING_EXP", "CAR_REGISTRATION_DATE", "CAR_DAMAGE_DURATION"]));
        return "FALLBACK_CAR_REGISTRATION_YEAR";
      case 5:
        dispatch(resetMultipleFields(["CAR_VARIANT", "CAR_SPECIFICATION", "USER_NATIONALITY", "REGISTRATION_CITY", "POLICY_CASE", "IS_CAR_USED", "UAE_DRIVING_EXP", "FIRST_REGISTRATION_YEAR", "INTRL_DRIVING_EXP", "CAR_REGISTRATION_DATE", "CAR_DAMAGE_DURATION"]));
        return "FALLBACK_CAR_MODEL";
      // case 6:
      //   dispatch(resetMultipleFields(["CAR_VARIANT"]));
      //   return "FALLBACK_CAR_FUEL_TYPE";
      case 6:
        dispatch(resetMultipleFields(["CAR_SPECIFICATION", "USER_NATIONALITY", "REGISTRATION_CITY", "POLICY_CASE", "IS_CAR_USED", "UAE_DRIVING_EXP", "FIRST_REGISTRATION_YEAR", "INTRL_DRIVING_EXP", "CAR_REGISTRATION_DATE", "CAR_DAMAGE_DURATION"]));
        return "FALLBACK_CAR_VARIANT";
      case 7:
        dispatch(resetMultipleFields(["USER_NATIONALITY", "REGISTRATION_CITY", "POLICY_CASE", "IS_CAR_USED", "UAE_DRIVING_EXP", "FIRST_REGISTRATION_YEAR", "INTRL_DRIVING_EXP", "CAR_REGISTRATION_DATE", "CAR_DAMAGE_DURATION"]));
        return "FALLBACK_CAR_SPECIFICATION";
      case 8:
        dispatch(resetMultipleFields(["REGISTRATION_CITY", "POLICY_CASE", "IS_CAR_USED", "UAE_DRIVING_EXP", "FIRST_REGISTRATION_YEAR", "INTRL_DRIVING_EXP", "CAR_REGISTRATION_DATE", "CAR_DAMAGE_DURATION"]));
        return "FALLBACK_NATIONALITY";
      case 9:
        dispatch(resetMultipleFields(["POLICY_CASE", "IS_CAR_USED", "UAE_DRIVING_EXP", "FIRST_REGISTRATION_YEAR", "INTRL_DRIVING_EXP", "CAR_REGISTRATION_DATE", "CAR_DAMAGE_DURATION"]));
        return "FALLBACK_REGISTRATION_CITY";
      case 10:
        dispatch(resetMultipleFields(["IS_CAR_USED", "UAE_DRIVING_EXP", "FIRST_REGISTRATION_YEAR", "INTRL_DRIVING_EXP", "CAR_REGISTRATION_DATE", "CAR_DAMAGE_DURATION"]));
        return "FALLBACK_POLICY_CASE";
      case 11:
        dispatch(resetMultipleFields(["UAE_DRIVING_EXP", "FIRST_REGISTRATION_YEAR", "INTRL_DRIVING_EXP", "CAR_REGISTRATION_DATE", "CAR_DAMAGE_DURATION"]));
        return "FALLBACK_IS_CAR_USED";
      case 12:
        dispatch(resetMultipleFields(["UAE_DRIVING_EXP", "INTRL_DRIVING_EXP", "CAR_REGISTRATION_DATE", "CAR_DAMAGE_DURATION"]));
        return "FALLBACK_FIRST_REG_YEAR";
      case 13:
        dispatch(resetMultipleFields(["INTRL_DRIVING_EXP", "CAR_REGISTRATION_DATE", "CAR_DAMAGE_DURATION"]));
        return "FALLBACK_UAE_DRIVING_EXP";
      case 14:
        dispatch(resetMultipleFields(["CAR_REGISTRATION_DATE", "CAR_DAMAGE_DURATION"]));
        return "FALLBACK_INTRL_DRIVING_EXP";
      case 15:
        dispatch(resetMultipleFields(["CAR_DAMAGE_DURATION"]));
        return "FALLBACK_CAR_REGISTRATION_DATE";
      case 16:
        return "FALLBACK_CAR_DAMAGE_DURATION";
      case 17:
        return "FALLBACK_VERIFICATION";
      default:
        return "FALLBACK_CAR_MAKE";
    }
  }

  const fieldIcons = {
    FORM_TYPE: <PolicyIcon />,
    REGISTRATION_NUMBER: <DirectionsCarIcon />,
    // RTO: <LocationOnIcon />,
    CAR_MAKE: <DirectionsCarIcon />,
    REGISTRATION_YEAR: <CalendarTodayIcon />,
    CAR_MODEL: <DirectionsCarIcon />,
    // CAR_FUEL_TYPE: <LocalGasStationOutlinedIcon />,
    CAR_VARIANT: <DirectionsCarIcon />,
    CAR_SPECIFICATION: <GradeOutlinedIcon />,
    USER_NAME: <PersonIcon />,
    USER_EMAIL: <EmailIcon />,
    USER_PHONE: <PhoneIcon />,
    PREVIOUS_POLICY_EXPIRY_DATE: <CalendarTodayIcon />,
    IS_OLD_POLICY_CLAIMED: <PolicyIcon />,
    IS_OWNERSHIP_TRANSFERRED: <TransferWithinAStationIcon />,
    CAR_REGISTRATION_DATE: <CalendarMonthOutlinedIcon />,
    FIRST_REGISTRATION_YEAR: <CalendarMonthOutlinedIcon />,
    USER_NATIONALITY: <FlagOutlinedIcon />,
    REGISTRATION_CITY: <ApartmentOutlinedIcon />,
    POLICY_CASE: <DirectionsCarIcon />,
    IS_CAR_USED: <DirectionsCarIcon />,
    UAE_DRIVING_EXP: <AdjustOutlinedIcon />,
    INTRL_DRIVING_EXP: <AdjustOutlinedIcon />,
    CAR_DAMAGE_DURATION: <MinorCrashOutlinedIcon />,
  };

  useEffect(() => {
    let step = getFormStep();
    setActiveStep(step);
  }, [activeStep, fs]);

  const handleBack = () => {
    router.push("/carInsurance");
    // setGlobalState((prev) => ({
    //   ...prev,
    //   key: "data",
    //   value: {},
    // }));
    dispatch(resetAll());
  };

  const handleNextPage = async () => {
    if (
      claimDetailSelected.isOldPolicyClaimed !== null &&
      claimDetailSelected.isOwnershipTransferred !== null
    ) {
      setOpenClainDetailModal(false);
      // console.log("data collected:", {
      //   ...formValues,
      //   ...claimDetailSelected,
      //   policyExpiryDate: ExpDateSelected,
      // })
      dispatch(setField({ field: "IS_OLD_POLICY_CLAIMED", value: claimDetailSelected.isOldPolicyClaimed }));
      dispatch(setField({ field: "IS_OWNERSHIP_TRANSFERRED", value: claimDetailSelected.isOwnershipTransferred }));
      dispatch(setField({ field: "PREVIOUS_POLICY_EXPIRY_DATE", value: ExpDateSelected }));
      // router.push("/car-insurance-list");

      let params = {
        "insurance_type": tempFormData?.FORM_TYPE == 'NEW' ? "new" : "used",
        "pj_master_car_vehicle_detail_id": tempFormData?.CAR_VARIANT?.id,
        // "pj_master_motor_rto_location_id": tempFormData?.RTO?.id,
        "is_claim_made_last_year": claimDetailSelected.isOldPolicyClaimed ? 1 : 0,
        "ownership_transferred": claimDetailSelected.isOwnershipTransferred ? 1 : 0,
        "is_policy_expired": claimDetailSelected.isOldPolicyExpired ? 1 : 0,
        "registration_year": tempFormData?.REGISTRATION_YEAR?.id,
        "policy_expire_type": claimDetailSelected?.isOldPolicyExpired ? claimDetailSelected?.policyExpiryWindow : null,
        "previous_policy_insurer_id": selectedInsurer,
        "request_type": tempFormData?.REGISTRATION_NUMBER == "Without Car Reg. No." ? "without_number" : "with_number",
      }
      if (tempFormData?.GAS_TYPE == 'CNG') {
        params.cng_kit_value = tempFormData?.GAS_COST
      }
      if (tempFormData?.REGISTRATION_NUMBER != "Without Car Reg. No.") {
        params.vehicle_registration_no = tempFormData?.REGISTRATION_NUMBER;
      }
      if (tempFormData?.REGISTRATION_NUMBER == "Without Car Reg. No.") {
        params.pj_master_motor_rto_location_id = tempFormData?.RTO?.id
      }
      if (tempFormData?.GAS_TYPE == 'LPG') {
        params.lpg_kit_value = tempFormData?.GAS_COST
      }

      console.log(params);
      // try {
      // const result = await dispatch(actionCreateEnquiry({ ...params })).unwrap();
      // console.log("result enquiry", result);
      // if (result?.status === 200) {
      router.push({
        pathname: "/carInsurance",
        query: { ...router.query, fs: "FALLBACK_VERIFICATION" },
      });
      // toast.success(result?.message)
      // } else {
      // toast.error(result?.message)
    }
    // } catch (error) {
    // console.log("Error creating enquiry:", error);
    // }
    // }
  };

  return (
    <>
      {/* <Grid container> */}
      <Grid container sx={{ height: { xs: "auto", md: "10%" } }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              p={4} // Smaller padding on mobile
              borderRadius={2}
              sx={{
                backgroundColor: "#fff",
                boxShadow: 10,
                mb: { xs: 4, md: 0 },
              }}
            >
              <FormSection
                activeStep={activeStep}
                setOpenExpDateModel={setOpenExpDateModel}
                setOpenClainDetailModal={setOpenClainDetailModal}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={2}
              sx={{
                display: { xs: "none", md: "block" }
              }}>

            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >

              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  p: 2,
                  boxShadow: 10,
                }}
              >
                <Box
                  display={"flex"}
                  width={"100%"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="h5" sx={{
                    fontWeight: "bold", textAlign: "center", mb: 2, width: "100%",
                  }}>
                    Your Selection
                  </Typography>
                </Box>
                {/* <ListItem
                  disableGutters
                  secondaryAction={
                    <IconButton aria-label="comment">
                      <EditOutlined
                        onClick={handleBack}
                        sx={{ height: "15px", width: "15px" }}
                      />
                    </IconButton>
                  }
                  sx={{ borderBottom: "1px solid grey", fontWeight: "bold" }}
                >
                  <TwentyTwoMpOutlinedIcon />
                  <Typography component="p" sx={{ fontSize: "14px", ml: 2 }}>
                    {tempFormData?.REGISTRATION_NUMBER ? tempFormData?.REGISTRATION_NUMBER : tempFormData?.FORM_TYPE || ""}
                  </Typography>

                </ListItem> */}

                {Object.entries(tempFormData).map(([key, value], index) => {
                  // Skip already shown fields and null/empty values
                  if (
                    key === "REGISTRATION_NUMBER" ||
                    key === "FORM_TYPE" ||
                    key === "USER_NAME" ||
                    key === "USER_EMAIL" ||
                    key === "USER_PHONE" ||
                    key === "PREVIOUS_POLICY_EXPIRY_DATE" ||
                    key === "IS_OLD_POLICY_CLAIMED" ||
                    key === "IS_OWNERSHIP_TRANSFERRED" ||
                    key === "REFERENCE_DETAILS" ||
                    key === "GAS_TYPE" ||
                    key === "GAS_COST" ||
                    value === null ||
                    value === ""
                  ) return null;

                  return (
                    <ListItem
                      key={index}
                      disableGutters
                      secondaryAction={
                        <IconButton aria-label="comment">
                          <EditOutlined
                            onClick={() => {
                              setActiveStep(index);
                              console.log(getFormFallback(index), index);
                              router.push({
                                pathname: "/carInsurance",
                                query: { ...query, fs: getFormFallback(index) },
                              }, undefined, { shallow: true });
                            }}
                            sx={{ height: "15px", width: "15px" }}
                          />
                        </IconButton>
                      }
                      sx={{ borderBottom: "1px solid grey" }}
                    >
                      {/* Icon here */}
                      {fieldIcons[key] || <HelpOutlineIcon />}
                      <ListItemText
                        // primary={value?.id == "PETROL+CNG/LPG" ? value?.name + " - (" + formatRuppee(tempFormData?.GAS_COST) + ")" : value?.name ? value?.name : "-"}
                        primary={
                          key == "POLICY_CASE" ? "New Car? " + value?.name :
                            key == "UAE_DRIVING_EXP" ? "UAE Driving Exp. : " + value?.name :
                              key == "INTRL_DRIVING_EXP" ? "Intrl. Driving Exp. : " + value?.name :
                                key == "FIRST_REGISTRATION_YEAR" ? "First registered in: " + value?.name :
                                  key == "IS_CAR_USED" ? "Car second hand? " + value?.name :
                                    key == "CAR_REGISTRATION_DATE" ? value?.name ? "Car Registration Date:  " + dayjs(value?.name).format("DD-MM-YYYY") : "Car Registration Date:  -" :
                                      value?.name ? value?.name :
                                        "-"}
                        sx={{ fontSize: "10px", ml: 2 }}
                      />
                    </ListItem>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>


      {openExpDateModal && (
        <CommonDialog
          open={openExpDateModal}
          onClose={() => setOpenExpDateModel(false)}
          modalWidth={350}
          hideClose
          content={() => (
            <>
              <CommonCalenderPicker
                ExpDateSelected={ExpDateSelected}
                setExpDateSelected={setExpDateSelected}
                setOpenClainDetailModal={setOpenClainDetailModal}
                setOpenExpDateModel={setOpenExpDateModel}
              />
            </>
          )}
          header={"Select the previous policy expiry date"}
        />
      )}

      {/* {ExpDateSelected && openClaimDetailModal && ( */}
      {openClaimDetailModal && (
        <CommonDialog
          open={openClaimDetailModal}
          onClose={() => setOpenClainDetailModal(false)}
          hideClose
          content={() => {
            return (
              <Box>

                <Box my={2}>
                  <Typography
                    sx={{ width: "100%", mb: 2, fontWeight: "bold" }}
                    variant="h6"
                  >
                    Has your previous policy expired?
                  </Typography>

                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={claimDetailSelected.isOldPolicyExpired}
                    onChange={() => {
                      setClaimDetailSelected({
                        ...claimDetailSelected,
                        isOldPolicyExpired: !claimDetailSelected.isOldPolicyExpired,
                      });
                    }}
                    row
                  >
                    <FormControlLabel
                      value="false"
                      defaultChecked
                      control={<Radio />}
                      label="Not Expired"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Expired"
                    />
                  </RadioGroup>
                </Box>

                {claimDetailSelected?.isOldPolicyExpired &&
                  <Box my={2}>
                    <Typography
                      sx={{ width: "100%", mb: 2, fontWeight: "bold" }}
                      variant="h6"
                    >
                      When does your current policy expire?
                    </Typography>

                    <RadioGroup
                      name="policy-expiry-window"
                      value={claimDetailSelected.policyExpiryWindow}
                      onChange={(e) => {
                        setClaimDetailSelected({
                          ...claimDetailSelected,
                          policyExpiryWindow: e.target.value,
                        });
                      }}
                      row
                    >
                      <FormControlLabel
                        value="before_90_days"
                        control={<Radio />}
                        label="Before 90 days"
                      />
                      <FormControlLabel
                        value="after_90_days"
                        control={<Radio />}
                        label="After 90 days"
                      />
                      <FormControlLabel
                        value="i_dont_know"
                        control={<Radio />}
                        label="I do not know"
                      />
                    </RadioGroup>
                  </Box>
                }


                {(!claimDetailSelected?.isOldPolicyExpired || claimDetailSelected?.policyExpiryWindow == "before_90_days") &&
                  <Box my={2}>
                    <Typography
                      sx={{ width: "100%", mb: 2, fontWeight: "bold" }}
                      variant="h6"
                    >
                      Did you make a claim in your existing policy?
                    </Typography>

                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue="false"
                      name="radio-buttons-group"
                      value={claimDetailSelected.isOldPolicyClaimed}
                      onChange={() => {
                        setClaimDetailSelected({
                          ...claimDetailSelected,
                          isOldPolicyClaimed: !claimDetailSelected.isOldPolicyClaimed,
                        });
                      }}
                      row
                    >
                      <FormControlLabel
                        value="false"
                        defaultChecked
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>
                  </Box>
                }




                <Box my={2}>
                  <Typography
                    sx={{ width: "100%", mb: 2, fontWeight: "bold" }}
                    variant="h6"
                  >
                    Was ownership transferred in the last 12 months?
                  </Typography>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="false"
                    name="radio-buttons-group"
                    value={claimDetailSelected.isOwnershipTransferred}
                    onChange={() => {
                      setClaimDetailSelected({
                        ...claimDetailSelected,
                        isOwnershipTransferred:
                          !claimDetailSelected.isOwnershipTransferred,
                      });
                    }}
                    row
                  >
                    <FormControlLabel
                      value="false"
                      defaultChecked
                      control={<Radio />}
                      label="No"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                  </RadioGroup>
                </Box>

                <Box my={2}>
                  <FormControl fullWidth required error={formSubmitted && !selectedInsurer}>
                    <InputLabel id="insurer-label">Select Insurance Provider</InputLabel>
                    <Select
                      labelId="insurer-label"
                      value={selectedInsurer}
                      label="Select Insurance Provider"
                      onChange={(e) => setSelectedInsurer(e.target.value)}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 200, // Limit dropdown height (in pixels)
                          },
                        },
                      }}
                    >
                      {fetchedInsurerOptions?.response.map((insurer) => (
                        <MenuItem key={insurer.value} value={insurer.value}>
                          {insurer.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formSubmitted && !selectedInsurer && (
                      <FormHelperText>Please select an insurance provider</FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </Box>

            );
          }}
          actionFooter={() => (
            <Box>
              <Button
                // fullWidth
                sx={{ mb: 2, mr: 4 }}
                variant="outlined"
                color="primary"
                onClick={() => { setOpenClainDetailModal(false) }}
              >
                Cancel
              </Button>

              <Button
                // fullWidth
                sx={{ mb: 2 }}
                variant="contained"
                color="primary"
                // disabled={!selectedInsurer}
                // onClick={handleNextPage}
                onClick={() => {
                  setFormSubmitted(true);
                  if (selectedInsurer) {
                    handleNextPage();
                  }
                }}
              >
                Done
              </Button>
            </Box>
          )}
          header={"Other Details"}
        />
      )}
    </>
  );
};

export default CarDetails;
